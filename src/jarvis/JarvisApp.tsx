import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatMessage, OrbState } from './types';
import { respond } from './responseEngine';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import './jarvis.css';

let nextId = 1;

export default function JarvisApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: nextId++,
    role: 'jarvis',
    text: 'Ciao, sono Jarvis. Scrivimi o premi il microfono per parlare.',
    timestamp: Date.now(),
  }]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  const tts = useSpeechSynthesis();

  const pushMessage = useCallback((role: ChatMessage['role'], text: string) => {
    setMessages(prev => [...prev, { id: nextId++, role, text, timestamp: Date.now() }]);
  }, []);

  const handleUserText = useCallback((text: string) => {
    if (!text.trim()) return;
    pushMessage('user', text);
    setIsThinking(true);
    const delay = 400 + Math.random() * 500;
    window.setTimeout(() => {
      const reply = respond(text);
      setIsThinking(false);
      pushMessage('jarvis', reply);
      if (ttsEnabled) tts.speak(reply);
    }, delay);
  }, [pushMessage, tts, ttsEnabled]);

  const stt = useSpeechRecognition(handleUserText);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleUserText(input);
    setInput('');
  }, [handleUserText, input]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, stt.interimText]);

  const orbState: OrbState = stt.isListening ? 'listening' : isThinking ? 'thinking' : tts.isSpeaking ? 'speaking' : 'idle';

  return (
    <div className="jarvis-app">
      <header className="jarvis-header">
        <a href="#/" className="jarvis-back">← Bowling Plus</a>
        <h1>Jarvis</h1>
        <span className="jarvis-sub">Prototipo conversazionale — testo + voce</span>
      </header>

      <main className="jarvis-main">
        <div className={`jarvis-orb jarvis-orb--${orbState}`} aria-hidden="true">
          <div className="jarvis-orb-core" />
        </div>
        <div className="jarvis-status">
          {orbState === 'listening' && 'In ascolto…'}
          {orbState === 'thinking' && 'Sto elaborando…'}
          {orbState === 'speaking' && 'Sto parlando…'}
          {orbState === 'idle' && 'Pronto'}
        </div>

        <div className="jarvis-log">
          {messages.map(m => (
            <div key={m.id} className={`jarvis-bubble jarvis-bubble--${m.role}`}>
              <span className="jarvis-bubble-label">{m.role === 'jarvis' ? 'Jarvis' : 'Tu'}</span>
              <p>{m.text}</p>
            </div>
          ))}
          {stt.interimText && (
            <div className="jarvis-bubble jarvis-bubble--user jarvis-bubble--interim">
              <span className="jarvis-bubble-label">Tu</span>
              <p>{stt.interimText}</p>
            </div>
          )}
          <div ref={logEndRef} />
        </div>

        <form className="jarvis-input-row" onSubmit={handleSubmit}>
          <button
            type="button"
            className={`jarvis-mic ${stt.isListening ? 'jarvis-mic--active' : ''}`}
            onClick={() => (stt.isListening ? stt.stop() : stt.start())}
            disabled={!stt.isSupported}
            title={stt.isSupported ? 'Parla con Jarvis' : 'Riconoscimento vocale non supportato da questo browser'}
          >
            🎙
          </button>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Scrivi un messaggio a Jarvis…"
            className="jarvis-text-input"
          />
          <button type="submit" className="jarvis-send" disabled={!input.trim()}>Invia</button>
          <button
            type="button"
            className={`jarvis-tts-toggle ${ttsEnabled ? 'jarvis-tts-toggle--on' : ''}`}
            onClick={() => { setTtsEnabled(v => !v); if (ttsEnabled) tts.cancel(); }}
            title="Attiva/disattiva risposta vocale"
          >
            {ttsEnabled ? '🔊' : '🔇'}
          </button>
        </form>

        {!stt.isSupported && (
          <p className="jarvis-warning">Il riconoscimento vocale non è supportato in questo browser: usa il testo.</p>
        )}
      </main>
    </div>
  );
}
