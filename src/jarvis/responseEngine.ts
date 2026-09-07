// Motore di risposte locale, rule-based: nessuna chiamata a un LLM esterno,
// quindi nessuna API key da esporre nel client. La firma di respond() è
// pensata per essere sostituita in futuro con una vera chiamata (es. Claude API
// via un endpoint serverless) senza toccare il resto del componente.

interface Rule {
  test: RegExp;
  answers: string[];
}

const rules: Rule[] = [
  {
    test: /\b(ciao|hey|salve|buongiorno|buonasera)\b/i,
    answers: [
      'Ciao! Sono Jarvis, il tuo assistente. Come posso aiutarti?',
      'Salve. Dimmi pure di cosa hai bisogno.',
    ],
  },
  {
    test: /chi sei|come ti chiami|tuo nome/i,
    answers: [
      'Sono Jarvis, un assistente conversazionale prototipale: per ora rispondo con logica locale, senza connessione a un modello esterno.',
    ],
  },
  {
    test: /che ore sono|che ora è/i,
    answers: [
      () => `Sono le ${new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}.`,
    ] as unknown as string[],
  },
  {
    test: /che giorno è|data di oggi/i,
    answers: [
      () => `Oggi è ${new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.`,
    ] as unknown as string[],
  },
  {
    test: /bowling|strike|spare|frame/i,
    answers: [
      'Il bowling non è il mio campo oggi — questo Jarvis è un prototipo separato dal simulatore. Ma se vuoi, torna alla schermata del bowling dal link in alto.',
    ],
  },
  {
    test: /cosa (sai|puoi) fare|aiuto|help/i,
    answers: [
      'Per ora sono un prototipo di UX: rispondo a saluti, domande semplici e faccio da banco di prova per input vocale e testuale. Puoi parlarmi o scrivermi.',
    ],
  },
  {
    test: /grazie/i,
    answers: ['Di nulla, sono qui per questo.', 'Figurati!'],
  },
  {
    test: /(arrivederci|a dopo|ci vediamo|addio)/i,
    answers: ['A presto!', 'Ci sentiamo. A presto.'],
  },
  {
    test: /come stai/i,
    answers: ['Tutto sotto controllo, grazie di aver chiesto. E tu?'],
  },
];

const fallbacks = [
  'Interessante. Puoi dirmi qualcosa in più?',
  'Non sono ancora collegato a un vero modello linguistico, quindi la mia comprensione è limitata — ma continua pure.',
  'Ricevuto. Ancora non ho una risposta pronta per questo, sto imparando.',
];

let fallbackIndex = 0;

export function respond(input: string): string {
  const trimmed = input.trim();
  for (const rule of rules) {
    if (rule.test.test(trimmed)) {
      const pick = rule.answers[Math.floor(Math.random() * rule.answers.length)];
      return typeof pick === 'function' ? (pick as () => string)() : pick;
    }
  }
  const answer = fallbacks[fallbackIndex % fallbacks.length];
  fallbackIndex += 1;
  return answer;
}
