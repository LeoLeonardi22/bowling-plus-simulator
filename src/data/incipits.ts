type IncipitFn = (frame: number) => string;

export const INCIPITS: Record<'strike' | 'spare' | 'open', IncipitFn[]> = {
  strike: [
    f => `Strike! Il tiro del frame ${f} vale doppio — concentrazione.`,
    f => `Che strike! Adesso il frame ${f}, tieni il ritmo.`,
    f => `Bello! Frame ${f} — il momento è tuo.`,
  ],
  spare: [
    f => `Spare completato! Frame ${f} — riparti da zero.`,
    f => `Ben fatto! Adesso il frame ${f}, tutto da costruire.`,
    f => `Spare! Ogni frame è una nuova partita. Tocca a te, frame ${f}.`,
  ],
  open: [
    f => `Frame ${f} — nuova occasione, nuovo tiro.`,
    f => `Dai! Frame ${f}, prenditi il tempo e concentrati.`,
    f => `Si ricomincia. Frame ${f} — sei pronto?`,
  ],
};
