import type { GameContext, GameEvent, Message, MessageContextMatch } from './types';
import { MESSAGES } from '../data/messages';

const variantCounters: Record<string, number> = {};

function matchesContext(match: MessageContextMatch, ctx: GameContext): boolean {
  if (match.prevFrameResult !== undefined && match.prevFrameResult !== ctx.prevFrameResult) return false;
  if (match.hasHadStrike !== undefined && match.hasHadStrike !== ctx.hasHadStrike) return false;
  if (match.hasHadSpare !== undefined && match.hasHadSpare !== ctx.hasHadSpare) return false;
  if (match.phase !== undefined && match.phase !== ctx.phase) return false;
  if (match.pinsFirstThrowMin !== undefined && ctx.pinsFirstThrow < match.pinsFirstThrowMin) return false;
  if (match.pinsFirstThrowMax !== undefined && ctx.pinsFirstThrow > match.pinsFirstThrowMax) return false;
  return true;
}

export function selectMessage(event: GameEvent): Message {
  const contextPool = MESSAGES.filter(m =>
    m.eventType === event.type &&
    m.contextMatch !== undefined &&
    matchesContext(m.contextMatch, event.context)
  );
  const defaultPool = MESSAGES.filter(m =>
    m.eventType === event.type && m.contextMatch === undefined
  );
  if (contextPool.length === 0 && defaultPool.length === 0) {
    return { id: 'fallback', eventType: event.type, variant: 1, voice: 'encouraging', text: 'Continua, stai andando bene!' };
  }
  const pool = contextPool.length > 0 ? contextPool : defaultPool;
  const counterKey = contextPool.length > 0 ? `${event.type}:ctx` : event.type;
  const count = variantCounters[counterKey] ?? 0;
  variantCounters[counterKey] = count + 1;
  return pool[count % pool.length];
}

export function resetPipeline(): void {
  for (const key of Object.keys(variantCounters)) {
    delete variantCounters[key];
  }
}
