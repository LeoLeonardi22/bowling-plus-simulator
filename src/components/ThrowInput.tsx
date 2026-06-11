interface Props {
  maxPins: number;
  onThrow: (pins: number, isSplit?: boolean) => void;
  disabled: boolean;
  isSplitPossible: boolean;
}

export default function ThrowInput({ maxPins, onThrow, disabled, isSplitPossible }: Props) {
  const pins = Array.from({ length: maxPins + 1 }, (_, i) => i);

  return (
    <div className="throw-input">
      <div className="pin-buttons">
        {pins.map(p => (
          <button
            key={p}
            className={`pin-btn ${p === maxPins && maxPins === 10 ? 'strike' : ''}`}
            onClick={() => onThrow(p)}
            disabled={disabled}
          >
            {p === 10 ? 'X' : p === 0 ? '–' : p}
          </button>
        ))}
      </div>
      {isSplitPossible && (
        <div className="split-row">
          <span className="split-label">Birilli separati (split)?</span>
          {Array.from({ length: maxPins - 1 }, (_, i) => i + 1).filter(p => p <= 9 && p >= 7).map(p => (
            <button key={p} className="pin-btn split" onClick={() => onThrow(p, true)} disabled={disabled}>
              {p} split
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
