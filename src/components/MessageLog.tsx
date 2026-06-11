import type { LogEntry } from '../engine/types';

interface Props { log: LogEntry[]; }

export default function MessageLog({ log }: Props) {
  if (log.length === 0) return null;
  return (
    <div className="msg-log">
      <h3>Log messaggi</h3>
      <div className="log-list">
        {[...log].reverse().map((entry, i) => {
          if (entry.kind === 'tip') {
            return (
              <div key={i} className="log-entry log-entry-tip">
                <span className="log-frame">F{entry.frameNumber}</span>
                <span className="log-event">CONSIGLIO</span>
                <span className="log-text">{entry.text}</span>
              </div>
            );
          }
          if (entry.kind === 'incipit') {
            return (
              <div key={i} className="log-entry log-entry-incipit">
                <span className="log-frame">F{entry.frameNumber}</span>
                <span className="log-event">INCIPIT</span>
                <span className="log-text">{entry.text}</span>
              </div>
            );
          }
          return (
            <div key={i} className={`log-entry voice-${entry.message.voice}`}>
              <span className="log-frame">F{entry.event.context.frameNumber}</span>
              <span className="log-event">{entry.event.type}</span>
              <span className="log-text">{entry.message.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
