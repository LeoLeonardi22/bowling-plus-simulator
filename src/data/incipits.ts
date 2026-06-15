type IncipitFn = (frame: number) => string;

export const INCIPITS: Record<'strike' | 'spare' | 'open', IncipitFn[]> = {
  strike: [
    _f => `Strike nel frame precedente! I tuoi prossimi due tiri si aggiungono come bonus a quel frame.`,
    f  => `Strike nel frame precedente — ogni pin che abbatti al frame ${f} si somma anche al punteggio di prima.`,
    _f => `Strike nel frame precedente! Quel frame vale 10 + i tuoi prossimi due tiri: 10 + ? + ?`,
  ],
  spare: [
    _f => `Spare nel frame precedente! Il tuo prossimo tiro si aggiunge come bonus al punteggio di quel frame.`,
    f  => `Spare nel frame precedente — il primo tiro che fai al frame ${f} si aggiunge anche al frame prima.`,
    _f => `Spare nel frame precedente! Quel frame vale 10 + il tuo primo tiro qui: 10 + ?`,
  ],
  open: [
    f => `Frame ${f} — la pista aspetta. Vai.`,
    f => `Dai, frame ${f}! Ogni tiro è una storia a sé.`,
    f => `Si riparte. Frame ${f} — concentrazione.`,
  ],
};
