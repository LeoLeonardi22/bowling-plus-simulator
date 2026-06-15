import type { Message } from '../engine/types';

export const MESSAGES: Message[] = [
  // GUTTER_FIRST
  { id: 'gf1', eventType: 'GUTTER_FIRST', variant: 1, voice: 'reactive',    text: 'Nel canale! La pista ha le sue insidie — il secondo tiro è lì che ti aspetta, prenditi il tempo.' },
  { id: 'gf2', eventType: 'GUTTER_FIRST', variant: 2, voice: 'encouraging',  text: 'Zero birilli, ma non è ancora finita. Riprendi la mira e riprova.' },
  { id: 'gf3', eventType: 'GUTTER_FIRST', variant: 3, voice: 'educational',  text: 'La palla scivola verso i bordi quando la direzione è imprecisa. Punta alle frecce sul pavimento, non ai birilli.' },

  // GUTTER_REPEATED
  { id: 'gr1', eventType: 'GUTTER_REPEATED', variant: 1, voice: 'reactive',    text: 'Nel canale di nuovo — la pista non sta facendo sconti. Aggiusta la direzione al prossimo tiro.' },
  { id: 'gr2', eventType: 'GUTTER_REPEATED', variant: 2, voice: 'encouraging', text: 'La palla ha trovato il canale — è la pista che parla. Ascoltala e correggi la direzione.' },
  { id: 'gr3', eventType: 'GUTTER_REPEATED', variant: 3, voice: 'educational', text: 'Quando la palla finisce nel canale, il problema è spesso la direzione di partenza. Punta le frecce sul pavimento.' },

  // LOW_1_3
  { id: 'l1', eventType: 'LOW_1_3', variant: 1, voice: 'reactive',    text: 'Pochi birilli al primo — ma il frame non è finito. Con il secondo puoi ancora chiudere lo spare!' },
  { id: 'l2', eventType: 'LOW_1_3', variant: 2, voice: 'encouraging', text: 'Ne sono rimasti tanti — prenditi il tempo, mira con cura e dagli dentro.' },
  { id: 'l3', eventType: 'LOW_1_3', variant: 3, voice: 'educational', text: 'Anche con pochi pin al primo, se chiudi lo spare il frame vale 10 più il prossimo tiro. Vale la pena provarci.' },

  // MEDIUM_4_6
  { id: 'm1', eventType: 'MEDIUM_4_6', variant: 1, voice: 'reactive',    text: 'Metà pista abbattuta — adesso la vera sfida è lo spare. Punta al birillo davanti tra quelli rimasti.' },
  { id: 'm2', eventType: 'MEDIUM_4_6', variant: 2, voice: 'encouraging', text: 'Buona base! Lo spare è lì, a portata di tiro — non mollare.' },
  { id: 'm3', eventType: 'MEDIUM_4_6', variant: 3, voice: 'educational', text: 'Se chiudi lo spare, questo frame vale 10 più il tiro successivo. Una bella iniezione di punteggio.' },

  // HIGH_7_9
  { id: 'h1', eventType: 'HIGH_7_9', variant: 1, voice: 'reactive',    text: 'Quasi tutto giù! Ne mancano pochissimi — concentrati e chiudi.' },
  { id: 'h2', eventType: 'HIGH_7_9', variant: 2, voice: 'encouraging', text: 'Che tiro! Uno o due birilli rimasti — lo spare è alla tua portata.' },
  { id: 'h3', eventType: 'HIGH_7_9', variant: 3, voice: 'educational', text: 'Con lo spare questo frame vale 10 più il prossimo tiro — siete a un passo.' },

  // SPLIT
  { id: 'sp1', eventType: 'SPLIT', variant: 1, voice: 'reactive',    text: 'Split! I birilli rimasti non sono adiacenti — la situazione si complica.' },
  { id: 'sp2', eventType: 'SPLIT', variant: 2, voice: 'encouraging', text: 'Lo split è difficile, ma non impossibile. Prova ad angolare il tiro.' },
  { id: 'sp3', eventType: 'SPLIT', variant: 3, voice: 'educational', text: 'Il split è la combinazione più ostica del bowling: i birilli distanti non si abbattono con un tiro diretto.' },

  // STRIKE_FIRST
  { id: 'sf1', eventType: 'STRIKE_FIRST', variant: 1, voice: 'reactive',    text: 'STRIKE! Tutti e dieci giù al primo colpo — la pista oggi parla la tua lingua.' },
  { id: 'sf2', eventType: 'STRIKE_FIRST', variant: 2, voice: 'encouraging', text: 'Che tiro! Lo strike vale 10 più i prossimi due colpi — il punteggio arriverà dopo.' },
  { id: 'sf3', eventType: 'STRIKE_FIRST', variant: 3, voice: 'educational', text: 'Lo strike chiude il frame al primo tiro e vale 10 più i prossimi due colpi. Il frame resta aperto finché non li esegui.' },

  // STRIKE_DOUBLE
  { id: 'sd1', eventType: 'STRIKE_DOUBLE', variant: 1, voice: 'reactive',    text: 'Due strike di fila! La pista non ti ferma — tieni questa traiettoria.' },
  { id: 'sd2', eventType: 'STRIKE_DOUBLE', variant: 2, voice: 'encouraging', text: 'Doppio! Ogni strike si porta dietro i prossimi tiri — il punteggio sta crescendo in modo importante.' },
  { id: 'sd3', eventType: 'STRIKE_DOUBLE', variant: 3, voice: 'educational', text: 'Con due strike consecutivi il primo frame aspetta ancora un tiro prima di chiudersi definitivamente.' },

  // STRIKE_TURKEY
  { id: 'st1', eventType: 'STRIKE_TURKEY', variant: 1, voice: 'reactive',    text: 'TURKEY! Tre strike di fila — rarissimo, goditi il momento!' },
  { id: 'st2', eventType: 'STRIKE_TURKEY', variant: 2, voice: 'encouraging', text: 'Tre di fila! Non cambiare niente — la macchina funziona, lasciala girare.' },
  { id: 'st3', eventType: 'STRIKE_TURKEY', variant: 3, voice: 'educational', text: 'Tre strike consecutivi: ogni frame può valere fino a 30 punti. È il massimo che il bowling può dare.' },

  // STRIKE_MULTI
  { id: 'sm1', eventType: 'STRIKE_MULTI', variant: 1, voice: 'reactive',    text: 'Striscia di strike! La pista è tua stasera — non fermarti adesso.' },
  { id: 'sm2', eventType: 'STRIKE_MULTI', variant: 2, voice: 'encouraging', text: 'Ogni strike che aggiungi moltiplica il valore dei precedenti. Vai avanti così.' },
  { id: 'sm3', eventType: 'STRIKE_MULTI', variant: 3, voice: 'educational', text: 'Con questa serie il punteggio cresce in modo straordinario — ogni frame adesso vale oro.' },

  // STRIKE_COMEBACK
  { id: 'sc1', eventType: 'STRIKE_COMEBACK', variant: 1, voice: 'reactive',    text: 'Eccolo lo strike! Bentornato — adesso il punteggio torna a parlare.' },
  { id: 'sc2', eventType: 'STRIKE_COMEBACK', variant: 2, voice: 'encouraging', text: 'La rimonta inizia così: uno strike e il terreno si recupera in fretta.' },
  { id: 'sc3', eventType: 'STRIKE_COMEBACK', variant: 3, voice: 'educational', text: 'Uno strike dopo frame aperti vale doppio emotivamente — e cambia il ritmo del punteggio cumulativo.' },

  // STRIKE_PERFECT_PATH
  { id: 'spp1', eventType: 'STRIKE_PERFECT_PATH', variant: 1, voice: 'reactive',    text: 'Stai percorrendo una strada rarissima — ogni strike è un passo verso qualcosa di storico.' },
  { id: 'spp2', eventType: 'STRIKE_PERFECT_PATH', variant: 2, voice: 'encouraging', text: 'Concentrazione totale. Non pensare al risultato — pensa solo al prossimo tiro.' },
  { id: 'spp3', eventType: 'STRIKE_PERFECT_PATH', variant: 3, voice: 'educational', text: 'Se mantieni questo ritmo puoi toccare il perfect game: 300 punti, 12 strike di fila — uno dei traguardi più rari dello sport.' },

  // GUTTER_AFTER_GUTTER
  { id: 'gg1', eventType: 'GUTTER_AFTER_GUTTER', variant: 1, voice: 'reactive',    text: 'Due canali nello stesso frame — succede, e si impara. Al prossimo frame si riparte.' },
  { id: 'gg2', eventType: 'GUTTER_AFTER_GUTTER', variant: 2, voice: 'encouraging', text: 'Non ti scoraggiare: capita a tutti, anche ai professionisti. La pista ti aspetta al prossimo frame.' },
  { id: 'gg3', eventType: 'GUTTER_AFTER_GUTTER', variant: 3, voice: 'educational', text: 'Con 0+0 il frame vale zero — ma ogni nuovo frame è una pagina bianca. Il punteggio può ancora crescere.' },

  // MISSED_SPARE
  { id: 'ms1', eventType: 'MISSED_SPARE', variant: 1, voice: 'reactive',    text: 'Peccato! Lo spare era lì — ma ci sono ancora frame davanti. La prossima volta.' },
  { id: 'ms2', eventType: 'MISSED_SPARE', variant: 2, voice: 'encouraging', text: 'Lo spare mancato brucia, ma la partita non è finita. Riprendi la concentrazione.' },
  { id: 'ms3', eventType: 'MISSED_SPARE', variant: 3, voice: 'educational', text: 'Senza spare il frame vale solo i birilli del primo tiro — nessun bonus. Ma ogni frame è una nuova opportunità.' },

  // OPEN_FRAME
  { id: 'of1', eventType: 'OPEN_FRAME', variant: 1, voice: 'reactive',    text: 'Frame chiuso senza bonus: {pinsFirstThrow} + {pins} = {sum}. Si riparte.' },
  { id: 'of2', eventType: 'OPEN_FRAME', variant: 2, voice: 'encouraging', text: 'Nessuno strike né spare — il punteggio è la somma dei due tiri. Si riparte con l\'energia giusta.' },
  { id: 'of3', eventType: 'OPEN_FRAME', variant: 3, voice: 'educational', text: 'Senza spare il frame vale solo la somma dei due tiri — il totale si costruisce frame dopo frame.' },

  // SPARE_FIRST
  { id: 'spf1', eventType: 'SPARE_FIRST', variant: 1, voice: 'reactive',    text: 'SPARE! Il primo della partita — e non sarà l\'ultimo, vedrai.' },
  { id: 'spf2', eventType: 'SPARE_FIRST', variant: 2, voice: 'encouraging', text: 'Spare! Il tuo prossimo tiro si aggiunge come bonus a questo frame — è un bel vantaggio.' },
  { id: 'spf3', eventType: 'SPARE_FIRST', variant: 3, voice: 'educational', text: 'Lo spare vale 10 più il tiro successivo. Il frame non si chiude ancora: aspetta il prossimo colpo per calcolare il punteggio definitivo.' },

  // SPARE_AFTER_GUTTER
  { id: 'sag1', eventType: 'SPARE_AFTER_GUTTER', variant: 1, voice: 'reactive',    text: 'Da zero a spare in un tiro solo — questo si chiama recupero!' },
  { id: 'sag2', eventType: 'SPARE_AFTER_GUTTER', variant: 2, voice: 'encouraging', text: 'Gutter e poi spare: la reazione migliore che potevi dare alla pista.' },
  { id: 'sag3', eventType: 'SPARE_AFTER_GUTTER', variant: 3, voice: 'educational', text: 'Anche dopo un gutter al primo tiro lo spare vale pieno: 10 più il prossimo tiro come bonus.' },

  // SPARE_NORMAL
  { id: 'sn1', eventType: 'SPARE_NORMAL', variant: 1, voice: 'reactive',    text: 'SPARE! Tutti i birilli giù in due tiri — questo è fare le cose per bene.' },
  { id: 'sn2', eventType: 'SPARE_NORMAL', variant: 2, voice: 'encouraging', text: 'Che spare! Il prossimo tiro si aggiunge come bonus a questo frame — fallo valere.' },
  { id: 'sn3', eventType: 'SPARE_NORMAL', variant: 3, voice: 'educational', text: 'Con lo spare questo frame vale almeno 11 punti — dipende da quanti birilli abbatti al prossimo tiro.' },

  // SPARE_CONSECUTIVE
  { id: 'sco1', eventType: 'SPARE_CONSECUTIVE', variant: 1, voice: 'reactive',    text: 'Due spare di fila! La costanza è una qualità rara — stai giocando benissimo.' },
  { id: 'sco2', eventType: 'SPARE_CONSECUTIVE', variant: 2, voice: 'encouraging', text: 'Secondo spare consecutivo! Non cambiare niente — il ritmo è quello giusto.' },
  { id: 'sco3', eventType: 'SPARE_CONSECUTIVE', variant: 3, voice: 'educational', text: 'Spare consecutivi: ogni frame aspetta il tiro successivo prima di chiudersi. Il punteggio sta crescendo bene.' },

  // FRAME10_START
  { id: 'f10s1', eventType: 'FRAME10_START', variant: 1, voice: 'reactive',    text: 'Eccoci all\'ultimo frame! La partita si decide qui — dai tutto.' },
  { id: 'f10s2', eventType: 'FRAME10_START', variant: 2, voice: 'encouraging', text: 'Siamo all\'ultimo frame — ogni birillo adesso va dritto sul totale finale.' },
  { id: 'f10s3', eventType: 'FRAME10_START', variant: 3, voice: 'educational', text: 'Al frame 10 non ci sono bonus: ogni birillo abbattuto vale esattamente quello che è.' },

  // FRAME10_STRIKE
  { id: 'f10x1', eventType: 'FRAME10_STRIKE', variant: 1, voice: 'reactive',    text: 'Strike al frame 10! Hai guadagnato altri due tiri — non sprecarli.' },
  { id: 'f10x2', eventType: 'FRAME10_STRIKE', variant: 2, voice: 'encouraging', text: 'Perfetto! Hai ancora due tiri per chiudere in grande.' },
  { id: 'f10x3', eventType: 'FRAME10_STRIKE', variant: 3, voice: 'educational', text: 'Nel frame 10 lo strike ti dà due tiri in più — il punteggio è diretto, senza bonus aggiuntivi.' },

  // FRAME10_SPARE
  { id: 'f10sp1', eventType: 'FRAME10_SPARE', variant: 1, voice: 'reactive',    text: 'Spare all\'ultimo frame! Un tiro ancora — chiudi come hai giocato.' },
  { id: 'f10sp2', eventType: 'FRAME10_SPARE', variant: 2, voice: 'encouraging', text: 'Benissimo! Un ultimo colpo per concludere questa partita nel modo migliore.' },
  { id: 'f10sp3', eventType: 'FRAME10_SPARE', variant: 3, voice: 'educational', text: 'Lo spare al frame 10 ti dà un tiro bonus — vale esattamente i birilli che abbatti.' },

  // FRAME10_FINAL
  { id: 'f10f1', eventType: 'FRAME10_FINAL', variant: 1, voice: 'reactive',    text: 'Ultimo tiro della partita — ogni birillo adesso pesa sul totale finale.' },
  { id: 'f10f2', eventType: 'FRAME10_FINAL', variant: 2, voice: 'encouraging', text: 'È il momento. Dai tutto quello che hai — la pista ti aspetta.' },
  { id: 'f10f3', eventType: 'FRAME10_FINAL', variant: 3, voice: 'educational', text: 'Quest\'ultimo tiro si aggiunge direttamente al totale. Nessun bonus, nessun calcolo: quello che abbatti è quello che ottieni.' },

  // LOW_SERIES
  { id: 'ls1', eventType: 'LOW_SERIES', variant: 1, voice: 'reactive',    text: 'Non è la partita che speravi — ma il bowling si impara così, tiro dopo tiro.' },
  { id: 'ls2', eventType: 'LOW_SERIES', variant: 2, voice: 'encouraging', text: 'Le partite difficili insegnano più di quelle facili. Continua — il momento arriverà.' },
  { id: 'ls3', eventType: 'LOW_SERIES', variant: 3, voice: 'educational', text: 'Anche i giocatori esperti hanno giornate no. L\'importante è capire cosa non ha funzionato e riprovare.' },

  // PERFECT_GAME_PATH
  { id: 'pgp1', eventType: 'PERFECT_GAME_PATH', variant: 1, voice: 'reactive',    text: 'Stai percorrendo qualcosa di rarissimo — la pista è tua, non fermarti ora.' },
  { id: 'pgp2', eventType: 'PERFECT_GAME_PATH', variant: 2, voice: 'encouraging', text: 'Massima concentrazione. Non pensare alla serie — pensa solo al prossimo tiro, uno alla volta.' },
  { id: 'pgp3', eventType: 'PERFECT_GAME_PATH', variant: 3, voice: 'educational', text: 'Un perfect game è 300 punti: 12 strike consecutivi — uno dei traguardi più rari in qualsiasi sport.' },

  // Messaggi contestuali
  { id: 'l1_ctx_strike', eventType: 'LOW_1_3', variant: 1, voice: 'reactive',
    contextMatch: { prevFrameResult: 'strike' },
    text: 'Dopo lo strike, pochi pin al primo — non perdere la concentrazione. Lo spare è ancora possibile.' },

  { id: 'of1_ctx_spare', eventType: 'OPEN_FRAME', variant: 1, voice: 'reactive',
    contextMatch: { prevFrameResult: 'spare' },
    text: 'Peccato! Avevi preso il ritmo con lo spare — questa volta è andata diversamente. Si riprova subito.' },

  { id: 'ms1_ctx_low', eventType: 'MISSED_SPARE', variant: 1, voice: 'reactive',
    contextMatch: { pinsFirstThrowMax: 5 },
    text: 'Hai totalizzato {sum} punti — pochi, ma ogni pin costruisce il totale. Avanti!' },

  { id: 'ls1_ctx_improving', eventType: 'LOW_SERIES', variant: 1, voice: 'encouraging',
    contextMatch: { pinsFirstThrowMin: 6 },
    text: 'Il primo tiro sta migliorando — questo è il segnale giusto. Continua su questa strada.' },

  { id: 'sf1_ctx_first', eventType: 'STRIKE_FIRST', variant: 1, voice: 'reactive',
    contextMatch: { hasHadStrike: false },
    text: 'Il tuo PRIMO STRIKE! Tutti e dieci giù in un colpo solo — questo è un momento da ricordare.' },

  { id: 'm1_ctx_strike', eventType: 'MEDIUM_4_6', variant: 1, voice: 'educational',
    contextMatch: { prevFrameResult: 'strike' },
    text: 'Dopo lo strike, questi pin si sommano anche al frame precedente — chiudi lo spare e il punteggio decolla.' },

  { id: 'of3_ctx_warm', eventType: 'OPEN_FRAME', variant: 3, voice: 'encouraging',
    contextMatch: { pinsFirstThrowMin: 7 },
    text: 'Hai abbattuto parecchi pin — niente spare questa volta, ma stai costruendo il punteggio frame dopo frame.' },

  { id: 'h1_ctx_split', eventType: 'HIGH_7_9', variant: 1, voice: 'reactive',
    contextMatch: { isSplit: true },
    text: 'Tanti pin abbattuti ma è uno split — i birilli rimasti non sono adiacenti. Situazione difficile: prova lo stesso.' },

  { id: 'sn1_ctx_strike', eventType: 'SPARE_NORMAL', variant: 1, voice: 'educational',
    contextMatch: { prevFrameResult: 'strike' },
    text: 'SPARE! E hai fatto strike prima — quel frame si chiude adesso: vale 10 più questo tiro che hai appena fatto.' },

  { id: 'sn3_ctx_early', eventType: 'SPARE_NORMAL', variant: 3, voice: 'educational',
    contextMatch: { phase: 'early' },
    text: 'Spare! Tutti i birilli in due tiri — il tuo prossimo tiro si aggiunge come bonus: 10 + ?.' },

  { id: 'sf3_ctx_early', eventType: 'STRIKE_FIRST', variant: 3, voice: 'educational',
    contextMatch: { phase: 'early' },
    text: 'Strike! Tutti i birilli al primo tiro — il frame vale 10 + i prossimi due tiri: 10 + ? + ?. Il punteggio lo scopri dopo.' },

  { id: 'l1_ctx_spare', eventType: 'LOW_1_3', variant: 1, voice: 'educational',
    contextMatch: { prevFrameResult: 'spare' },
    text: 'Il frame spare precedente si chiude: 10 + {pins} = {spareBonus}. Ora punta allo spare!' },

  { id: 'm1_ctx_spare', eventType: 'MEDIUM_4_6', variant: 1, voice: 'educational',
    contextMatch: { prevFrameResult: 'spare' },
    text: 'Questo tiro chiude il bonus spare di prima: 10 + {pins} = {spareBonus}. E hai ancora il secondo tiro!' },

  { id: 'h1_ctx_spare', eventType: 'HIGH_7_9', variant: 1, voice: 'educational',
    contextMatch: { prevFrameResult: 'spare' },
    text: 'Ottimo! E chiude anche il bonus spare precedente: 10 + {pins} = {spareBonus}. Quasi spare!' },

  { id: 'l1_ctx_dbl_strike', eventType: 'LOW_1_3', variant: 1, voice: 'educational',
    contextMatch: { streakStrike: 2 },
    text: 'Dopo due strike, questo tiro ({pins}) si aggiunge a entrambi i frame precedenti. Il secondo tiro chiuderà uno dei due.' },

  { id: 'm1_ctx_dbl_strike', eventType: 'MEDIUM_4_6', variant: 1, voice: 'educational',
    contextMatch: { streakStrike: 2 },
    text: 'Hai due strike — questo tiro ({pins}) si somma a entrambi. Il frame finale si chiude dopo il prossimo.' },
];

export function getMessagesForEvent(eventType: string): Message[] {
  return MESSAGES.filter(m => m.eventType === eventType);
}
