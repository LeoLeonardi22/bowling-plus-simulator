import { useState, useCallback } from 'react';
import type { GameState, MessageEntry } from './engine/types';
import { buildFrames, isGameOver, maxPinsSecondThrow } from './engine/scoring';
import { buildContext } from './engine/context';
import { detectEvent } from './engine/events';
import { selectMessage, resetPipeline } from './engine/pipeline';
import { getNextTip, resetTips } from './engine/tips';
import { generateCSharp } from './generators/csharp';
import { generateJSON } from './generators/json';
import Scorecard from './components/Scorecard';
import TipCard from './components/TipCard';
import ThrowInput from './components/ThrowInput';
import MessageDisplay from './components/MessageDisplay';
import MessageLog from './components/MessageLog';
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
      const entry: MessageEntry = { event, message, timestamp: Date.now() };

      const frameJustCompleted = nextFrame > prev.currentFrame;
      const pendingTip = frameJustCompleted && !gameOver ? getNextTip() : null;

      return {
        frames,
        allThrows: newThrows,
        currentFrame: nextFrame,
        throwInFrame: nextThrow,
        isGameOver: gameOver,
        finalScore: gameOver ? (frames[9].cumulative ?? null) : null,
        context: buildContext(frames, nextFrame, nextThrow, false, 0),
        messageLog: [...prev.messageLog, entry],
        lastEvent: event,
        lastMessage: message,
        pendingTip,
      };
    });
  }, []);

  const handleReset = useCallback(() => {
    resetPipeline();
    resetTips();
    setState(initialState());
  }, []);

  const handleContinue = useCallback(() => {
    setState(prev => ({ ...prev, pendingTip: null }));
  }, []);

  const handleAutoSimulate = useCallback(() => {
    resetPipeline();
    resetTips();

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
        messageLog: [...newState.messageLog, { event, message, timestamp: Date.now() }],
        lastEvent: event,
        lastMessage: message,
        pendingTip: null,
      };
      if (gameOver) break;
    }
    setState(newState);
  }, []);

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
        <section className="section-scorecard">
          <Scorecard frames={state.frames} />
        </section>

        {!state.isGameOver ? (
          <section className="section-input">
            {state.pendingTip ? (
              <TipCard
                tip={state.pendingTip}
                frameNumber={state.currentFrame - 1}
                onContinue={handleContinue}
              />
            ) : (
              <>
                <div className="turn-info">
                  Frame <strong>{state.currentFrame}</strong> · Tiro <strong>{state.throwInFrame}</strong>
                </div>
                <ThrowInput
                  maxPins={maxPins}
                  onThrow={processThrow}
                  disabled={state.isGameOver}
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

        <section className="section-message">
          <MessageDisplay message={state.lastMessage} />
        </section>

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

        <MessageLog log={state.messageLog} />
      </main>
    </div>
  );
}
