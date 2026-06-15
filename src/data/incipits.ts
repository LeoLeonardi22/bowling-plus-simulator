type IncipitFn = (frame: number) => string;

export const INCIPITS: Record<'strike' | 'spare' | 'open', IncipitFn[]> = {
  strike: [
    _f => `Strike al frame precedente! I tuoi prossimi due tiri si sommano lì.`,
    f => `Hai fatto strike — ogni birillo del frame ${f} vale anche per quello prima.`,
    f => `Strike! Frame ${f} — i prossimi due tiri aumentano il punteggio precedente.`,
  ],
  spare: [
    _f => `Spare! Il tuo prossimo tiro si aggiunge al frame precedente — vai.`,
    f => `Ottimo spare — il primo tiro del frame ${f} vale doppio.`,
    f => `Spare chiuso. Frame ${f}: il prossimo tiro conta anche per prima.`,
  ],
  open: [
    f => `Frame ${f} — nuova occasione, nuovo tiro.`,
    f => `Dai! Frame ${f}, prenditi il tempo e concentrati.`,
    f => `Si ricomincia. Frame ${f} — sei pronto?`,
  ],
};
