import type { EventType, GameEvent, Message } from './types';
import { MESSAGES } from '../data/messages';

const variantCounters: Partial<Record<EventType, number>> = {};

export function selectMessage(event: GameEvent): Message {
  const pool = MESSAGES.filter(m => m.eventType === event.type);
  if (pool.length === 0) {
    return { id: 'fallback', eventType: event.type, variant: 1, voice: 'encouraging', text: 'Continua, stai andando bene!' };
  }
  const count = variantCounters[event.type] ?? 0;
  const message = pool[count % pool.length];
  variantCounters[event.type] = count + 1;
  return message;
}

export function resetPipeline(): void {
  for (const key of Object.keys(variantCounters) as EventType[]) {
    delete variantCounters[key];
  }
}
