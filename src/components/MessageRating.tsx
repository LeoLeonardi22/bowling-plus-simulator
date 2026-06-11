import { useState, useEffect } from 'react';

export interface FeedbackEntry {
  rating: 'up' | 'down';
  note: string;
}

interface Props {
  entryId: number;
  existing?: FeedbackEntry;
  onRate: (id: number, rating: 'up' | 'down', note: string) => void;
}

export default function MessageRating({ entryId, existing, onRate }: Props) {
  const [mode, setMode] = useState<'idle' | 'noting' | 'done'>('idle');
  const [note, setNote] = useState('');

  useEffect(() => {
    setMode(existing ? 'done' : 'idle');
    setNote(existing?.note ?? '');
  }, [entryId, existing]);

  if (mode === 'done' && existing) {
    return (
      <div className="msg-rating">
        <span className={`rating-badge ${existing.rating === 'up' ? 'up' : 'down'}`}>
          {existing.rating === 'up' ? '👍' : '👎'}
          {existing.note && <span className="rating-note-preview"> {existing.note}</span>}
        </span>
        <button className="rating-edit" onClick={() => setMode('noting')}>modifica</button>
      </div>
    );
  }

  if (mode === 'noting') {
    return (
      <div className="msg-rating msg-rating--note">
        <textarea
          className="rating-textarea"
          placeholder="Cosa non va? Es: evento sbagliato per questo contesto..."
          value={note}
          onChange={e => setNote(e.target.value)}
          autoFocus
          rows={2}
        />
        <div className="rating-note-actions">
          <button className="btn-rate down" onClick={() => { onRate(entryId, 'down', note); setMode('done'); }}>
            👎 Salva
          </button>
          <button className="btn-rate cancel" onClick={() => setMode(existing ? 'done' : 'idle')}>
            Annulla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="msg-rating">
      <span className="rating-label">Messaggio utile?</span>
      <button className="btn-rate up" onClick={() => { onRate(entryId, 'up', ''); setMode('done'); }}>👍</button>
      <button className="btn-rate down" onClick={() => setMode('noting')}>👎</button>
    </div>
  );
}
