import type { LogEntry } from '../engine/types';
import type { FeedbackEntry } from './MessageRating';

interface Props { log: LogEntry[]; feedbackMap: Record<number, FeedbackEntry>; }

export default function MessageLog({ log, feedbackMap }: Props) {
  if (log.length === 0) return null;
  return (
    <div className="msg-log">
      <h3>Log messaggi</h3>
      <div className="log-list">
        {[...log].reverse().map((entry, i) => {
          const fb = feedbackMap[entry.timestamp];
          const fbBadge = fb ? <span className={`log-fb-badge ${fb.rating}`}>{fb.rating === 'up' ? '👍' : '👎'}</span> : null;

          if (entry.kind === 'tip') {
            return (
              <div key={i} className="log-entry log-entry-tip">
                <span className="log-frame">F{entry.frameNumber}</span>
                <span className="log-event">CONSIGLIO</span>
                <span className="log-text">{entry.text}</span>
                {fbBadge}
              </div>
            );
          }
          if (entry.kind === 'incipit') {
            return (
              <div key={i} className="log-entry log-entry-incipit">
                <span className="log-frame">F{entry.frameNumber}</span>
                <span className="log-event">INCIPIT</span>
                <span className="log-text">{entry.text}</span>
                {fbBadge}
              </div>
            );
          }
          return (
            <div key={i} className={`log-entry voice-${entry.message.voice}`}>
              <span className="log-frame">F{entry.event.context.frameNumber}</span>
              <span className="log-event">{entry.event.type}</span>
              <span className="log-text">{entry.message.text}</span>
              {fbBadge}
            </div>
          );
        })}
      </div>
    </div>
  );
}
