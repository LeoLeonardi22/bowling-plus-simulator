import { MESSAGES } from '../data/messages';

export function generateJSON(): string {
  const grouped: Record<string, object[]> = {};
  for (const m of MESSAGES) {
    if (!grouped[m.eventType]) grouped[m.eventType] = [];
    grouped[m.eventType].push({ variant: m.variant, voice: m.voice, text: m.text });
  }
  return JSON.stringify({ version: '1.0', events: grouped }, null, 2);
}
