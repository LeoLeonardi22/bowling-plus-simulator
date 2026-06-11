export type PinCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GamePhase = 'early' | 'mid' | 'late';

export type FrameResult = 'open' | 'spare' | 'strike';

export interface Frame {
  frameNumber: number;
  throws: number[];
  score: number | null;
  cumulative: number | null;
  isStrike: boolean;
  isSpare: boolean;
  isComplete: boolean;
}

export interface GameContext {
  frameNumber: number;
  throwInFrame: number;
  phase: GamePhase;
  streakStrike: number;
  streakSpare: number;
  hasHadStrike: boolean;
  hasHadSpare: boolean;
  lowSeriesCount: number;
  isPerfectGamePath: boolean;
  prevFrameResult: FrameResult | null;
  isSplit: boolean;
  pinsFirstThrow: number;
}

export type EventType =
  | 'GUTTER_FIRST'
  | 'GUTTER_REPEATED'
  | 'LOW_1_3'
  | 'MEDIUM_4_6'
  | 'HIGH_7_9'
  | 'SPLIT'
  | 'STRIKE_FIRST'
  | 'STRIKE_DOUBLE'
  | 'STRIKE_TURKEY'
  | 'STRIKE_MULTI'
  | 'STRIKE_COMEBACK'
  | 'STRIKE_PERFECT_PATH'
  | 'GUTTER_AFTER_GUTTER'
  | 'MISSED_SPARE'
  | 'OPEN_FRAME'
  | 'SPARE_FIRST'
  | 'SPARE_AFTER_GUTTER'
  | 'SPARE_NORMAL'
  | 'SPARE_CONSECUTIVE'
  | 'FRAME10_START'
  | 'FRAME10_STRIKE'
  | 'FRAME10_SPARE'
  | 'FRAME10_FINAL'
  | 'LOW_SERIES'
  | 'PERFECT_GAME_PATH';

export type MessageVoice = 'reactive' | 'encouraging' | 'educational';

export interface Message {
  id: string;
  eventType: EventType;
  variant: 1 | 2 | 3;
  text: string;
  voice: MessageVoice;
}

export interface GameEvent {
  type: EventType;
  context: GameContext;
  pins: number;
}

export interface MessageEntry {
  kind: 'message';
  event: GameEvent;
  message: Message;
  timestamp: number;
}

export interface TipEntry {
  kind: 'tip';
  text: string;
  frameNumber: number;
  timestamp: number;
}

export interface IncipitEntry {
  kind: 'incipit';
  text: string;
  frameNumber: number;
  timestamp: number;
}

export type LogEntry = MessageEntry | TipEntry | IncipitEntry;

export interface GameState {
  frames: Frame[];
  currentFrame: number;
  throwInFrame: number;
  allThrows: number[];
  isGameOver: boolean;
  finalScore: number | null;
  context: GameContext;
  messageLog: LogEntry[];
  lastEvent: GameEvent | null;
  lastMessage: Message | null;
  pendingTip: string | null;
  incipitMessage: string | null;
}
