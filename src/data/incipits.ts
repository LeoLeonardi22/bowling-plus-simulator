type IncipitFn = (frame: number) => string;

export const INCIPITS: Record<'strike' | 'spare' | 'open', IncipitFn[]> = {
  strike: [
    _f => `Strike nel frame precedente! I prossimi due tiri si sommano a quel punteggio.`,
    f  => `Strike nel frame precedente — ogni birillo del frame ${f} vale anche lì.`,
    _f => `Strike nel frame precedente! Il punteggio cresce con i tuoi prossimi due tiri.`,
  ],
  spare: [
    _f => `Spare nel frame precedente! Il tuo prossimo tiro si aggiunge a quel punteggio.`,
    f  => `Spare nel frame precedente — il primo tiro del frame ${f} vale doppio.`,
    _f => `Spare nel frame precedente! Il prossimo tiro conta anche per il frame prima.`,
  ],
  open: [
    f => `Frame ${f} — nuova occasione, nuovo tiro.`,
    f => `Dai! Frame ${f}, prenditi il tempo e concentrati.`,
    f => `Si ricomincia. Frame ${f} — sei pronto?`,
  ],
};
