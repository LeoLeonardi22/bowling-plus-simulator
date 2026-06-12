import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { GameState, MessageEntry, LogEntry, IncipitEntry } from './engine/types';
import { buildFrames, isGameOver, maxPinsSecondThrow } from './engine/scoring';
import { buildContext } from './engine/context';
import { detectEvent } from './engine/events';
import { selectMessage, resetPipeline } from './engine/pipeline';
import { getNextTip, resetTips } from './engine/tips';
import { getIncipit, resetIncipits } from './engine/incipits';
import { generateCSharp } from './generators/csharp';
import { generateJSON } from './generators/json';
import { supabase } from './lib/supabase';
import Scorecard from './components/Scorecard';
import ThrowInput from './components/ThrowInput';
import MessageDisplay from './components/MessageDisplay';
import MessageLog from './components/MessageLog';
import MessageRating from './components/MessageRating';
import type { FeedbackEntry } from './components/MessageRating';
import './index.css';

function initialState(): GameState {
  return {
    frames: buildFrames([]),
    currentFrame: 1,
    throwInFrame: 1,
    allThrows: [],
    isGameOver: false,
    finalScore: null,
    context: buildContext([], 1, 1, false, 0),
    messageLog: [],
    lastEvent: null,
    lastMessage: null,
    pendingTip: null,
    incipitMessage: null,
  };
}

function download(filename: string, content: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
  a.download = filename;
  a.click();
}

export default function App() {
  const [state, setState] = useState<GameState>(initialState);
  const [showTip, setShowTip] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<number, FeedbackEntry>>({});
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const messageLogRef = useRef(state.messageLog);
  useEffect(() => { messageLogRef.current = state.messageLog; }, [state.messageLog]);

  const handleFeedback = useCallback((id: number, rating: 'up' | 'down', note: string) => {
    setFeedbackMap(prev => ({ ...prev, [id]: { rating, note } }));
    const entry = messageLogRef.current.find(e => e.timestamp === id);
    if (!supabase) { console.warn('[Supabase] client null — env vars mancanti'); return; }
    if (!entry) return;
    const row: Record<string, unknown> = {
      session_id: sessionId,
      kind: entry.kind,
      rating,
      note,
    };
    if (entry.kind === 'message') {
      row.event_type   = entry.event.type;
      row.variant      = entry.message.variant;
      row.text         = entry.message.text;
      row.voice        = entry.message.voice;
      row.frame_number = entry.event.context.frameNumber;
      row.throw_in_frame = entry.event.context.throwInFrame;
      row.pins         = entry.event.pins;
      row.context      = entry.event.context;
    } else {
      row.frame_number = (entry as { frameNumber: number }).frameNumber;
      row.text         = (entry as { text: string }).text;
    }
    supabase.from('feedback').insert(row).then(({ error }) => {
      if (error) console.error('[Supabase feedback]', error.message, error.details);
      else console.log('[Supabase feedback] saved', row.event_type ?? row.kind);
    });
  }, [sessionId]);

  const currentEntryId = useMemo(() => {
    const log = state.messageLog;
    if (!log.length) return null;
    if (showTip || state.incipitMessage) {
      for (let i = log.length - 1; i >= 0; i--) {
        if (log[i].kind === 'tip' || log[i].kind === 'incipit') return log[i].timestamp;
      }
    }
    for (let i = log.length - 1; i >= 0; i--) {
      if (log[i].kind === 'message') return log[i].timestamp;
    }
    return null;
  }, [state.messageLog, showTip, state.incipitMessage]);

  useEffect(() => {
    setShowTip(false);
  }, [state.pendingTip]);

  const handleShowTip = useCallback(() => {
    setShowTip(true);
  }, []);

  const processThrow = useCallback((pins: number, isSplit = false) => {
    setState(prev => {
      if (prev.isGameOver) return prev;

      const newThrows = [...prev.allThrows, pins];
      const frames = buildFrames(newThrows);

      let nextFrame = prev.currentFrame;
      let nextThrow = prev.throwInFrame;
      for (let f = 0; f < 10; f++) {
        if (!frames[f].isComplete) {
          nextFrame = f + 1;
          nextThrow = frames[f].throws.length + 1;
          break;
        }
        if (f === 9 && frames[f].isComplete) {
          nextFrame = 10;
          nextThrow = frames[f].throws.length;
        }
      }

      const pinsFirst = prev.throwInFrame === 1 ? pins : prev.context.pinsFirstThrow;
      const context = buildContext(frames, prev.currentFrame, prev.throwInFrame, isSplit, pinsFirst);
      const event = detectEvent(pins, context);
      const message = selectMessage(event);
      const gameOver = isGameOver(newThrows);
      const entry: MessageEntry = { kind: 'message', event, message, timestamp: Date.now() };

      const frameJustCompleted = nextFrame > prev.currentFrame;
      const tipText = frameJustCompleted && !gameOver ? getNextTip() : null;
      const tipEntry: LogEntry[] = tipText
        ? [{ kind: 'tip', text: tipText, frameNumber: prev.currentFrame, timestamp: Date.now() + 1 }]
        : [];

      return {
        frames,
        allThrows: newThrows,
        currentFrame: nextFrame,
        throwInFrame: nextThrow,
        isGameOver: gameOver,
        finalScore: gameOver ? (frames[9].cumulative ?? null) : null,
        context: buildContext(frames, nextFrame, nextThrow, false, nextFrame === prev.currentFrame ? pins : 0),
        messageLog: [...prev.messageLog, entry, ...tipEntry],
        lastEvent: event,
        lastMessage: message,
        pendingTip: tipText,
        incipitMessage: null,
      };
    });
  }, []);

  const handleReset = useCallback(() => {
    resetPipeline();
    resetTips();
    resetIncipits();
    setState(initialState());
    setFeedbackMap({});
  }, []);


  const handleContinue = useCallback(() => {
    setShowTip(false);
    setState(prev => {
      const completedFrame = prev.frames[prev.currentFrame - 2];
      const prevResult = completedFrame?.isStrike ? 'strike'
        : completedFrame?.isSpare ? 'spare'
        : 'open';
      const incipitText = getIncipit(prevResult, prev.currentFrame);
      const incipitEntry: IncipitEntry = {
        kind: 'incipit',
        text: incipitText,
        frameNumber: prev.currentFrame,
        timestamp: Date.now(),
      };
      return {
        ...prev,
        pendingTip: null,
        incipitMessage: incipitText,
        messageLog: [...prev.messageLog, incipitEntry],
      };
    });
  }, []);

  const handleAutoSimulate = useCallback(() => {
    resetPipeline();
    resetTips();
    resetIncipits();

    // Simple sequential simulation
    let throws: number[] = [];
    for (let t = 0; t < 25 && !isGameOver(throws); t++) {
      const frames = buildFrames(throws);
      let isFirst = true;
      let pinsFirst = 0;
      let frameNum = 1;
      for (let f = 0; f < 10; f++) {
        if (!frames[f].isComplete) {
          isFirst = frames[f].throws.length === 0;
          pinsFirst = frames[f].throws[0] ?? 0;
          frameNum = f + 1;
          break;
        }
      }
      const max = isFirst ? 10 : frameNum < 10 ? maxPinsSecondThrow(pinsFirst) : 10;
      throws.push(Math.floor(Math.random() * (max + 1)));
    }

    resetPipeline();
    let newState = initialState();
    for (const pins of throws) {
      const frames = buildFrames([...newState.allThrows, pins]);
      const pinsFirst = newState.throwInFrame === 1 ? pins : newState.context.pinsFirstThrow;
      const context = buildContext(frames, newState.currentFrame, newState.throwInFrame, false, pinsFirst);
      const event = detectEvent(pins, context);
      const message = selectMessage(event);
      const newThrows = [...newState.allThrows, pins];
      const gameOver = isGameOver(newThrows);

      let nextFrame = newState.currentFrame;
      let nextThrow = newState.throwInFrame;
      for (let f = 0; f < 10; f++) {
        if (!frames[f].isComplete) { nextFrame = f + 1; nextThrow = frames[f].throws.length + 1; break; }
      }

      newState = {
        frames,
        allThrows: newThrows,
        currentFrame: nextFrame,
        throwInFrame: nextThrow,
        isGameOver: gameOver,
        finalScore: gameOver ? (frames[9].cumulative ?? null) : null,
        context: buildContext(frames, nextFrame, nextThrow, false, 0),
        messageLog: [...newState.messageLog, { kind: 'message' as const, event, message, timestamp: Date.now() }],
        lastEvent: event,
        lastMessage: message,
        pendingTip: null,
        incipitMessage: null,
      };
      if (gameOver) break;
    }
    setState(newState);
  }, []);

  const displayKey = showTip
    ? `tip-${state.currentFrame}`
    : state.incipitMessage
      ? `incipit-${state.currentFrame}`
      : `msg-${state.lastMessage?.id ?? 'empty'}`;

  const currentFrameData = state.frames[state.currentFrame - 1];
  const isFirstThrow = state.throwInFrame === 1;
  const maxPins = isFirstThrow
    ? 10
    : state.currentFrame < 10
      ? maxPinsSecondThrow(currentFrameData?.throws[0] ?? 0)
      : 10;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bowling Plus</h1>
        <span className="app-sub">Message Pipeline Simulator</span>
      </header>

      <main className="app-main">
        <section className="section-message">
          <div className="msg-stage">
            {showTip && state.pendingTip ? (
              <div key={displayKey} className="msg-display voice-tip msg-slide">
                <div className="msg-content">
                  <span className="msg-voice">Consiglio</span>
                  <p className="msg-text">{state.pendingTip}</p>
                </div>
                {currentEntryId !== null && (
                  <MessageRating entryId={currentEntryId} existing={feedbackMap[currentEntryId]} onRate={handleFeedback} />
                )}
              </div>
            ) : state.incipitMessage ? (
              <div key={displayKey} className="msg-display voice-incipit msg-slide">
                <div className="msg-content">
                  <span className="msg-voice">Prossimo frame</span>
                  <p className="msg-text">{state.incipitMessage}</p>
                </div>
                {currentEntryId !== null && (
                  <MessageRating entryId={currentEntryId} existing={feedbackMap[currentEntryId]} onRate={handleFeedback} />
                )}
              </div>
            ) : (
              <div key={displayKey} className="msg-slide">
                <div className="msg-display-inner">
                  <MessageDisplay message={state.lastMessage} />
                  {currentEntryId !== null && state.lastMessage && (
                    <MessageRating entryId={currentEntryId} existing={feedbackMap[currentEntryId]} onRate={handleFeedback} />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section-scorecard">
          <Scorecard frames={state.frames} currentFrame={state.currentFrame} />
        </section>

        {!state.isGameOver ? (
          <section className="section-input">
            {showTip ? (
              <div className="controls">
                <button className="btn btn-continue" onClick={handleContinue}>Prossimo frame →</button>
                <button className="btn btn-reset" onClick={handleReset}>Reset</button>
              </div>
            ) : state.pendingTip ? (
              <div className="controls">
                <button className="btn btn-continue" onClick={handleShowTip}>Prossimo messaggio →</button>
                <button className="btn btn-reset" onClick={handleReset}>Reset</button>
              </div>
            ) : (
              <>
                <div className="turn-info">
                  Frame <strong>{state.currentFrame}</strong> · Tiro <strong>{state.throwInFrame}</strong>
                </div>
                <ThrowInput
                  maxPins={maxPins}
                  onThrow={processThrow}
                  disabled={state.isGameOver || !!state.pendingTip}
                  isSplitPossible={!isFirstThrow && state.currentFrame < 10}
                />
                <div className="controls">
                  <button className="btn btn-simulate" onClick={handleAutoSimulate}>Auto-simula</button>
                  <button className="btn btn-reset" onClick={handleReset}>Reset</button>
                </div>
              </>
            )}
          </section>
        ) : (
          <section className="section-gameover">
            <h2>Partita conclusa</h2>
            <div className="final-score">{state.finalScore}</div>
            <div className="controls">
              <button className="btn btn-simulate" onClick={handleAutoSimulate}>Nuova simulazione</button>
              <button className="btn btn-reset" onClick={handleReset}>Reset</button>
            </div>
          </section>
        )}

        <section className="section-export">
          <h3>Esporta per Unity</h3>
          <div className="export-btns">
            <button className="btn btn-export" onClick={() => download('BowlingMessageDatabase.cs', generateCSharp())}>
              Scarica C# per Unity
            </button>
            <button className="btn btn-export" onClick={() => download('bowling-messages.json', generateJSON())}>
              Scarica JSON config
            </button>
            <button className="btn btn-export" onClick={() => navigator.clipboard.writeText(generateCSharp())}>
              Copia C# negli appunti
            </button>
          </div>
        </section>

        <MessageLog log={state.messageLog} feedbackMap={feedbackMap} />
      </main>
    </div>
  );
}
