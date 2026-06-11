interface Props {
  tip: string;
  frameNumber: number;
  onContinue: () => void;
}

export default function TipCard({ tip, frameNumber, onContinue }: Props) {
  return (
    <div className="tip-card">
      <div className="tip-label">Consiglio del frame {frameNumber}</div>
      <p className="tip-text">{tip}</p>
      <button className="btn btn-continue" onClick={onContinue}>
        Prossimo frame →
      </button>
    </div>
  );
}
