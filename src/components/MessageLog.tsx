import type { MessageEntry } from '../engine/types';

interface Props { log: MessageEntry[]; }

export default function MessageLog({ log }: Props) {
  if (log.length === 0) return null;
  return (
    <div className="msg-log">
      <h3>Log messaggi</h3>
      <div className="log-list">
        {[...log].reverse().map((entry, i) => (
          <div key={i} className={`log-entry voice-${entry.message.voice}`}>
            <span className="log-frame">F{entry.event.context.frameNumber}</span>
            <span className="log-event">{entry.event.type}</span>
            <span className="log-text">{entry.message.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
