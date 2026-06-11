import type { Message } from '../engine/types';

interface Props { message: Message | null; }

const voiceLabel: Record<string, string> = {
  reactive: 'Reazione',
  encouraging: 'Incoraggiante',
  educational: 'Educativo',
};

export default function MessageDisplay({ message }: Props) {
  if (!message) {
    return <div className="msg-display empty">In attesa del primo tiro...</div>;
  }
  return (
    <div className={`msg-display voice-${message.voice}`}>
      <span className="msg-voice">{voiceLabel[message.voice]}</span>
      <p className="msg-text">{message.text}</p>
      <span className="msg-event">{message.eventType}</span>
    </div>
  );
}
