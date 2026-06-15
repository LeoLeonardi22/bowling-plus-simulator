type IncipitFn = (frame: number) => string;

export const INCIPITS: Record<'strike' | 'spare' | 'open', IncipitFn[]> = {
  strike: [
    _f => `Strike nel frame precedente! I tuoi prossimi due tiri si aggiungono come bonus a quel frame.`,
    f  => `Strike nel frame precedente — ogni pin che abbatti al frame ${f} si somma anche al punteggio di prima.`,
    _f => `Strike nel frame precedente! Vuol dire che i tuoi prossimi due colpi contano anche lì.`,
  ],
  spare: [
    _f => `Spare nel frame precedente! Il tuo prossimo tiro si aggiunge come bonus al punteggio di quel frame.`,
    f  => `Spare nel frame precedente — il primo tiro che fai al frame ${f} si aggiunge anche al frame prima.`,
    _f => `Spare nel frame precedente! Il prossimo tiro conta due volte: per questo frame e come bonus per quello prima.`,
  ],
  open: [
    f => `Frame ${f} — la pista aspetta. Vai.`,
    f => `Dai, frame ${f}! Ogni tiro è una storia a sé.`,
    f => `Si riparte. Frame ${f} — concentrazione.`,
  ],
};
