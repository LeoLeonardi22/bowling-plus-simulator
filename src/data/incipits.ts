type IncipitFn = (frame: number) => string;

export const INCIPITS: Record<'strike' | 'spare' | 'open', IncipitFn[]> = {
  strike: [
    _f => `Hai fatto strike — i tuoi prossimi due tiri si sommano al frame precedente.`,
    f  => `Strike nel frame precedente! Ogni birillo del frame ${f} vale anche lì.`,
    _f => `Hai fatto strike — il punteggio del frame prima cresce con i prossimi due tiri.`,
  ],
  spare: [
    _f => `Hai fatto spare — il tuo prossimo tiro si aggiunge al frame precedente.`,
    f  => `Spare nel frame precedente! Il primo tiro del frame ${f} vale doppio.`,
    _f => `Hai fatto spare — il prossimo tiro conta anche per il frame prima.`,
  ],
  open: [
    f => `Frame ${f} — nuova occasione, nuovo tiro.`,
    f => `Dai! Frame ${f}, prenditi il tempo e concentrati.`,
    f => `Si ricomincia. Frame ${f} — sei pronto?`,
  ],
};
