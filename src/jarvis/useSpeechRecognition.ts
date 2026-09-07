import { useCallback, useEffect, useRef, useState } from 'react';

interface SpeechRecognitionResultLike {
  transcript: string;
  isFinal: boolean;
}

interface UseSpeechRecognition {
  isSupported: boolean;
  isListening: boolean;
  interimText: string;
  start: () => void;
  stop: () => void;
}

export function useSpeechRecognition(onFinalResult: (text: string) => void): UseSpeechRecognition {
  const RecognitionCtor = (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
    .SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
  const isSupported = !!RecognitionCtor;

  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const onFinalResultRef = useRef(onFinalResult);
  onFinalResultRef.current = onFinalResult;

  useEffect(() => {
    if (!isSupported) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (RecognitionCtor as any)();
    recognition.lang = 'it-IT';
    recognition.continuous = false;
    recognition.interimResults = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result: SpeechRecognitionResultLike = event.results[i];
        if (result.isFinal) {
          onFinalResultRef.current(result.transcript.trim());
          interim = '';
        } else {
          interim += result.transcript;
        }
      }
      setInterimText(interim);
    };
    recognition.onend = () => {
      setIsListening(false);
      setInterimText('');
    };
    recognition.onerror = () => {
      setIsListening(false);
      setInterimText('');
    };

    recognitionRef.current = recognition;
    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [isSupported, RecognitionCtor]);

  const start = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    setIsListening(true);
    recognitionRef.current.start();
  }, [isListening]);

  const stop = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  }, []);

  return { isSupported, isListening, interimText, start, stop };
}
