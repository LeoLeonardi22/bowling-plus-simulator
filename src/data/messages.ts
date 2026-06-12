import type { Message } from '../engine/types';

export const MESSAGES: Message[] = [
  // GUTTER_FIRST
  { id: 'gf1', eventType: 'GUTTER_FIRST', variant: 1, voice: 'reactive',     text: 'Capita! La direzione si aggiusta al prossimo tiro.' },
  { id: 'gf2', eventType: 'GUTTER_FIRST', variant: 2, voice: 'encouraging',  text: 'Zero birilli, ma il secondo tiro è tutto tuo.' },
  { id: 'gf3', eventType: 'GUTTER_FIRST', variant: 3, voice: 'educational',  text: 'La pista è più insidiosa di quanto sembra. Prova a tenere la palla al centro.' },

  // GUTTER_REPEATED
  { id: 'gr1', eventType: 'GUTTER_REPEATED', variant: 1, voice: 'reactive',    text: 'Ancora nessun birillo, ma ogni tiro è una nuova chance.' },
  { id: 'gr2', eventType: 'GUTTER_REPEATED', variant: 2, voice: 'encouraging', text: 'Non mollare, la palla trova la strada.' },
  { id: 'gr3', eventType: 'GUTTER_REPEATED', variant: 3, voice: 'educational', text: 'Prova a tenere la palla più al centro della pista.' },

  // LOW_1_3
  { id: 'l1', eventType: 'LOW_1_3', variant: 1, voice: 'reactive',    text: 'Pochi pin al primo tiro — il secondo è tutto tuo.' },
  { id: 'l2', eventType: 'LOW_1_3', variant: 2, voice: 'encouraging', text: 'Ne sono rimasti tanti, prendi bene la mira.' },
  { id: 'l3', eventType: 'LOW_1_3', variant: 3, voice: 'educational', text: 'Ogni birillo conta — la somma dei due tiri è il tuo punteggio del frame.' },

  // MEDIUM_4_6
  { id: 'm1', eventType: 'MEDIUM_4_6', variant: 1, voice: 'reactive',    text: 'Buona base — punta a chiudere con lo spare.' },
  { id: 'm2', eventType: 'MEDIUM_4_6', variant: 2, voice: 'encouraging', text: 'Ora punta ai restanti, lo spare è possibile.' },
  { id: 'm3', eventType: 'MEDIUM_4_6', variant: 3, voice: 'educational', text: 'Se chiudi con uno spare, il frame vale 10 più il tiro successivo.' },

  // HIGH_7_9
  { id: 'h1', eventType: 'HIGH_7_9', variant: 1, voice: 'reactive',    text: 'Ottimo tiro! Sei vicinissimo allo spare.' },
  { id: 'h2', eventType: 'HIGH_7_9', variant: 2, voice: 'encouraging', text: 'Ne mancano pochissimi, concentrati sul secondo.' },
  { id: 'h3', eventType: 'HIGH_7_9', variant: 3, voice: 'educational', text: 'Con uno spare il frame vale 10 più il prossimo tiro.' },

  // SPLIT
  { id: 'sp1', eventType: 'SPLIT', variant: 1, voice: 'reactive',    text: 'Tiro difficile — i birilli rimasti non sono adiacenti.' },
  { id: 'sp2', eventType: 'SPLIT', variant: 2, voice: 'encouraging', text: 'Prova lo stesso, ogni tentativo vale.' },
  { id: 'sp3', eventType: 'SPLIT', variant: 3, voice: 'educational', text: 'Quando i birilli sono separati si chiama split: è la situazione più difficile del bowling.' },

  // STRIKE_FIRST
  { id: 'sf1', eventType: 'STRIKE_FIRST', variant: 1, voice: 'reactive',    text: 'STRIKE! Tutti e 10 al primo colpo!' },
  { id: 'sf2', eventType: 'STRIKE_FIRST', variant: 2, voice: 'encouraging', text: 'Tutto giù! Il punteggio cresce con i prossimi due tiri.' },
  { id: 'sf3', eventType: 'STRIKE_FIRST', variant: 3, voice: 'educational', text: 'Lo strike vale 10 più i prossimi 2 tiri — il frame resta aperto, il punteggio arriva dopo.' },

  // STRIKE_DOUBLE
  { id: 'sd1', eventType: 'STRIKE_DOUBLE', variant: 1, voice: 'reactive',    text: 'Due strike di fila! Stai costruendo qualcosa di grande.' },
  { id: 'sd2', eventType: 'STRIKE_DOUBLE', variant: 2, voice: 'encouraging', text: 'Ogni strike vale sempre di più, continua!' },
  { id: 'sd3', eventType: 'STRIKE_DOUBLE', variant: 3, voice: 'educational', text: 'Con due strike di fila il primo frame aspetta ancora un tiro prima di chiudersi.' },

  // STRIKE_TURKEY
  { id: 'st1', eventType: 'STRIKE_TURKEY', variant: 1, voice: 'reactive',    text: 'TURKEY! Tre strike di fila — stai dominando la pista.' },
  { id: 'st2', eventType: 'STRIKE_TURKEY', variant: 2, voice: 'encouraging', text: 'Tre perfetti, non fermarti adesso!' },
  { id: 'st3', eventType: 'STRIKE_TURKEY', variant: 3, voice: 'educational', text: 'Tre strike consecutivi: ogni frame può valere fino a 30 punti — il massimo possibile.' },

  // STRIKE_MULTI
  { id: 'sm1', eventType: 'STRIKE_MULTI', variant: 1, voice: 'reactive',    text: 'Striscia incredibile, sei inarrestabile!' },
  { id: 'sm2', eventType: 'STRIKE_MULTI', variant: 2, voice: 'encouraging', text: 'Ogni strike aggiunge valore a quello precedente.' },
  { id: 'sm3', eventType: 'STRIKE_MULTI', variant: 3, voice: 'educational', text: 'Il tuo punteggio sta crescendo in modo straordinario — ogni frame vale tantissimo.' },

  // STRIKE_COMEBACK
  { id: 'sc1', eventType: 'STRIKE_COMEBACK', variant: 1, voice: 'reactive',    text: 'Strike! Bentornato — adesso il gioco cambia.' },
  { id: 'sc2', eventType: 'STRIKE_COMEBACK', variant: 2, voice: 'encouraging', text: 'Rimonta in corso, ottimo momento!' },
  { id: 'sc3', eventType: 'STRIKE_COMEBACK', variant: 3, voice: 'educational', text: 'Uno strike dopo frame aperti recupera terreno velocemente nel punteggio cumulativo.' },

  // STRIKE_PERFECT_PATH
  { id: 'spp1', eventType: 'STRIKE_PERFECT_PATH', variant: 1, voice: 'reactive',    text: 'Stai andando verso qualcosa di molto raro!' },
  { id: 'spp2', eventType: 'STRIKE_PERFECT_PATH', variant: 2, voice: 'encouraging', text: 'Mantieni la concentrazione, ci sei quasi.' },
  { id: 'spp3', eventType: 'STRIKE_PERFECT_PATH', variant: 3, voice: 'educational', text: 'Se finisci con tutti strike puoi raggiungere un punteggio straordinario.' },

  // GUTTER_AFTER_GUTTER
  { id: 'gg1', eventType: 'GUTTER_AFTER_GUTTER', variant: 1, voice: 'reactive',    text: 'Due gutter di fila, ma il prossimo frame riparte pulito.' },
  { id: 'gg2', eventType: 'GUTTER_AFTER_GUTTER', variant: 2, voice: 'encouraging', text: 'Non ti scoraggiare, capita a tutti.' },
  { id: 'gg3', eventType: 'GUTTER_AFTER_GUTTER', variant: 3, voice: 'educational', text: 'Con 0+0 il frame vale zero — ogni nuovo frame è però una pagina bianca.' },

  // MISSED_SPARE
  { id: 'ms1', eventType: 'MISSED_SPARE', variant: 1, voice: 'reactive',    text: 'Peccato! Eri così vicino allo spare.' },
  { id: 'ms2', eventType: 'MISSED_SPARE', variant: 2, voice: 'encouraging', text: 'La prossima volta ce la fai, sei sulla strada giusta.' },
  { id: 'ms3', eventType: 'MISSED_SPARE', variant: 3, voice: 'educational', text: 'Senza spare il frame vale solo i birilli del primo tiro — nessun bonus.' },

  // OPEN_FRAME
  { id: 'of1', eventType: 'OPEN_FRAME', variant: 1, voice: 'reactive',    text: 'Frame chiuso. Al prossimo si riparte.' },
  { id: 'of2', eventType: 'OPEN_FRAME', variant: 2, voice: 'encouraging', text: 'Nessun bonus questa volta — riparte tutto dal prossimo frame.' },
  { id: 'of3', eventType: 'OPEN_FRAME', variant: 3, voice: 'educational', text: 'Senza spare il punteggio è la somma dei due tiri — nessun bonus, ma conta lo stesso.' },

  // SPARE_FIRST
  { id: 'spf1', eventType: 'SPARE_FIRST', variant: 1, voice: 'reactive',    text: 'SPARE! Primo spare della partita — ottimo!' },
  { id: 'spf2', eventType: 'SPARE_FIRST', variant: 2, voice: 'encouraging', text: 'Il prossimo tiro conta come bonus su questo frame.' },
  { id: 'spf3', eventType: 'SPARE_FIRST', variant: 3, voice: 'educational', text: 'Lo spare vale 10 più il tiro successivo: il frame si chiude solo dopo quel tiro.' },

  // SPARE_AFTER_GUTTER
  { id: 'sag1', eventType: 'SPARE_AFTER_GUTTER', variant: 1, voice: 'reactive',    text: 'Recupero perfetto! Spare dopo gutter — fantastico.' },
  { id: 'sag2', eventType: 'SPARE_AFTER_GUTTER', variant: 2, voice: 'encouraging', text: 'Da zero a spare in un tiro solo.' },
  { id: 'sag3', eventType: 'SPARE_AFTER_GUTTER', variant: 3, voice: 'educational', text: 'Anche dopo un gutter lo spare vale pieno: 10 più il prossimo tiro come bonus.' },

  // SPARE_NORMAL
  { id: 'sn1', eventType: 'SPARE_NORMAL', variant: 1, voice: 'reactive',    text: 'SPARE! Tutti i birilli in due tiri.' },
  { id: 'sn2', eventType: 'SPARE_NORMAL', variant: 2, voice: 'encouraging', text: 'Il tuo prossimo tiro vale come bonus su questo frame.' },
  { id: 'sn3', eventType: 'SPARE_NORMAL', variant: 3, voice: 'educational', text: 'Ogni spare garantisce almeno 11 punti — dipende da quanto abbatti al tiro dopo.' },

  // SPARE_CONSECUTIVE
  { id: 'sco1', eventType: 'SPARE_CONSECUTIVE', variant: 1, voice: 'reactive',    text: 'Due spare di fila! Sei molto costante.' },
  { id: 'sco2', eventType: 'SPARE_CONSECUTIVE', variant: 2, voice: 'encouraging', text: 'Mantieni questo ritmo, funziona.' },
  { id: 'sco3', eventType: 'SPARE_CONSECUTIVE', variant: 3, voice: 'educational', text: 'Due spare consecutivi: ogni frame aspetta il tiro successivo per chiudersi definitivamente.' },

  // FRAME10_START
  { id: 'f10s1', eventType: 'FRAME10_START', variant: 1, voice: 'reactive',    text: 'Ultimo frame! Dai tutto quello che hai.' },
  { id: 'f10s2', eventType: 'FRAME10_START', variant: 2, voice: 'encouraging', text: 'Strike = altri 2 tiri · Spare = 1 tiro in più.' },
  { id: 'f10s3', eventType: 'FRAME10_START', variant: 3, voice: 'educational', text: 'Al frame 10 non ci sono bonus: ogni tiro vale esattamente i birilli che abbatti.' },

  // FRAME10_STRIKE
  { id: 'f10x1', eventType: 'FRAME10_STRIKE', variant: 1, voice: 'reactive',    text: 'Strike nel frame 10 — guadagni altri due tiri.' },
  { id: 'f10x2', eventType: 'FRAME10_STRIKE', variant: 2, voice: 'encouraging', text: 'Perfetto, continua così.' },
  { id: 'f10x3', eventType: 'FRAME10_STRIKE', variant: 3, voice: 'educational', text: 'Nel frame 10 lo strike ti dà due tiri extra — senza bonus aggiuntivi sul punteggio.' },

  // FRAME10_SPARE
  { id: 'f10sp1', eventType: 'FRAME10_SPARE', variant: 1, voice: 'reactive',    text: 'Spare! Un ultimo tiro per chiudere in bellezza.' },
  { id: 'f10sp2', eventType: 'FRAME10_SPARE', variant: 2, voice: 'encouraging', text: 'Sfruttalo al massimo.' },
  { id: 'f10sp3', eventType: 'FRAME10_SPARE', variant: 3, voice: 'educational', text: 'Lo spare al frame 10 ti dà un tiro in più — vale solo i birilli che abbatti.' },

  // FRAME10_FINAL
  { id: 'f10f1', eventType: 'FRAME10_FINAL', variant: 1, voice: 'reactive',    text: 'Ultimo tiro: ogni birillo conta sul totale finale.' },
  { id: 'f10f2', eventType: 'FRAME10_FINAL', variant: 2, voice: 'encouraging', text: 'Dai tutto quello che hai.' },
  { id: 'f10f3', eventType: 'FRAME10_FINAL', variant: 3, voice: 'educational', text: 'Ogni birillo che abbatti adesso si aggiunge direttamente al tuo totale finale.' },

  // LOW_SERIES
  { id: 'ls1', eventType: 'LOW_SERIES', variant: 1, voice: 'reactive',    text: 'Non preoccuparti, ogni partita insegna qualcosa.' },
  { id: 'ls2', eventType: 'LOW_SERIES', variant: 2, voice: 'encouraging', text: 'Il bowling si impara tirando, continua così.' },
  { id: 'ls3', eventType: 'LOW_SERIES', variant: 3, voice: 'educational', text: 'Anche i giocatori esperti hanno partite difficili — l\'importante è divertirsi.' },

  // PERFECT_GAME_PATH
  { id: 'pgp1', eventType: 'PERFECT_GAME_PATH', variant: 1, voice: 'reactive',    text: 'Stai per fare qualcosa di straordinario!' },
  { id: 'pgp2', eventType: 'PERFECT_GAME_PATH', variant: 2, voice: 'encouraging', text: 'Concentrazione massima, ci sei quasi.' },
  { id: 'pgp3', eventType: 'PERFECT_GAME_PATH', variant: 3, voice: 'educational', text: 'Un perfect game è 300 punti: 12 strike consecutivi — uno degli obiettivi più rari del bowling.' },
];

export function getMessagesForEvent(eventType: string): Message[] {
  return MESSAGES.filter(m => m.eventType === eventType);
}
