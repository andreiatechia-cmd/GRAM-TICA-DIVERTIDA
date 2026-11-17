'use client';

import React, { useState } from 'react';
import { 
  PUNCTUATION_QUESTIONS, 
  PunctuationQuestion 
} from '@/lib/grammar-data';
import { soundManager } from '@/lib/audio';
import { SalsichaReaction, getRandomReaction } from '@/lib/salsicha-character';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Search, 
  HelpCircle,
  Star
} from 'lucide-react';

interface PunctuationDetectiveGameProps {
  onScoreEarned: (points: number, stars: number) => void;
  onMissionProgress: (missionKey: 'pontuacao', count: number) => void;
  onSalsichaReact: (reaction: SalsichaReaction, trigger: 'correct' | 'wrong') => void;
  highContrast?: boolean;
}

export function PunctuationDetectiveGame({
  onScoreEarned,
  onMissionProgress,
  onSalsichaReact,
  highContrast = false
}: PunctuationDetectiveGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMark, setSelectedMark] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQ: PunctuationQuestion = PUNCTUATION_QUESTIONS[currentIndex % PUNCTUATION_QUESTIONS.length];

  const handleSpeakSentence = () => {
    soundManager.speakPortugueseNarrator(currentQ.audioVoiceLine);
  };

  const handleChooseMark = (mark: '?' | '!' | '.' | ',') => {
    if (isAnswered) return;

    setSelectedMark(mark);
    setIsAnswered(true);

    const isCorrect = mark === currentQ.correctMark;

    if (isCorrect) {
      soundManager.playStarSound();
      const points = 60 + streak * 15;
      onScoreEarned(points, 2);
      onMissionProgress('pontuacao', 1);
      const newStreak = streak + 1;
      setStreak(newStreak);

      const correctReaction = getRandomReaction('correct');
      onSalsichaReact(correctReaction, 'correct');

      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
    } else {
      soundManager.playSadCartoonTrombone();
      setStreak(0);
      const wrongReaction = getRandomReaction('wrong');
      onSalsichaReact(wrongReaction, 'wrong');
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPopSound();
    setSelectedMark(null);
    setIsAnswered(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playPopSound();
    setCurrentIndex(0);
    setSelectedMark(null);
    setIsAnswered(false);
    setStreak(0);
  };

  const isCorrectChoice = selectedMark === currentQ.correctMark;

  const markExplanations: Record<string, { name: string; meaning: string; emoji: string }> = {
    '?': { name: 'Ponto de Interrogação', meaning: 'Faz uma PERGUNTA ou dúvida curiosa!', emoji: '❓' },
    '!': { name: 'Ponto de Exclamação', meaning: 'Mostra SUSTO, emoção, alegria ou surpresa!', emoji: '❗' },
    '.': { name: 'Ponto Final', meaning: 'Termina uma frase contando algo com calma.', emoji: '⚫' },
    ',': { name: 'Vírgula', meaning: 'Dá uma respirada e separa itens de uma lista.', emoji: '〰️' }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 shadow-sm ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-blue-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl border border-blue-300 shadow-xs">
            🔍
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-blue-950">
              Detetive da Pontuação
            </h2>
            <p className="text-xs sm:text-sm text-blue-700">
              Qual sinal completa a frase com a entonação perfeita?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 font-bold text-sm border border-blue-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Mistérios: {streak} 🔎</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            title="Reiniciar detetive"
            aria-label="Reiniciar mistérios de pontuação"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Investigation Board */}
      <div className={`p-6 sm:p-8 rounded-3xl border-3 text-center flex flex-col items-center gap-6 shadow-md relative ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-linear-to-b from-blue-50/70 via-white to-indigo-50/50 border-blue-300'
      }`}>
        {/* Progress & Title */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-200 text-blue-900 border border-blue-300">
            Caso #{currentIndex + 1} • {currentQ.title}
          </span>
        </div>

        {/* Big Detective Scenario */}
        <div className="flex flex-col items-center gap-4 my-2">
          <div className="text-6xl sm:text-7xl animate-pulse duration-1000 select-none">
            {currentQ.scenarioEmoji}
          </div>

          <div className="max-w-2xl px-4 py-6 rounded-2xl bg-white/90 border-2 border-blue-200 shadow-sm flex flex-col items-center gap-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 leading-relaxed">
              <span>&ldquo;{currentQ.sentenceBefore}</span>
              <span className={`inline-block mx-2 px-3 py-1 rounded-xl font-black text-3xl border-2 transition-all ${
                isAnswered
                  ? isCorrectChoice
                    ? 'bg-emerald-200 text-emerald-950 border-emerald-500 scale-110'
                    : 'bg-rose-200 text-rose-950 border-rose-500'
                  : 'bg-amber-200 text-amber-950 border-amber-400 animate-pulse'
              }`}>
                {isAnswered ? selectedMark : '___'}
              </span>
              {currentQ.sentenceAfter && <span>{currentQ.sentenceAfter}</span>}
              <span>&rdquo;</span>
            </div>

            <button
              onClick={handleSpeakSentence}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Ouvir a frase com entonação em voz alta"
              aria-label="Ouvir a frase do caso com a entonação correta"
            >
              <Volume2 className="w-5 h-5" />
              <span>Ouvir com Entonação</span>
            </button>
          </div>
        </div>

        {/* 4 Punctuation Signs to Choose */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-2">
          {(['?', '!', '.', ','] as const).map((mark) => {
            const info = markExplanations[mark];
            const isCorrect = mark === currentQ.correctMark;
            const isSelected = selectedMark === mark;

            return (
              <button
                key={mark}
                onClick={() => handleChooseMark(mark)}
                disabled={isAnswered}
                className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                  isAnswered && isCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-4 ring-emerald-300'
                    : isAnswered && isSelected && !isCorrect
                    ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                    : highContrast
                    ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                    : 'bg-white hover:bg-blue-50 border-blue-300 hover:border-blue-500 hover:scale-102 active:scale-98 shadow-sm'
                }`}
                aria-label={`Sinal: ${info.name}. ${info.meaning}`}
              >
                <div className="text-4xl sm:text-5xl font-black text-blue-900 group-hover:scale-110 transition-transform">
                  {mark}
                </div>
                <div className="font-extrabold text-sm sm:text-base text-blue-950">
                  {info.name}
                </div>
                <p className="text-[11px] text-blue-700 leading-tight">
                  {info.meaning}
                </p>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className={`w-full mt-4 p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn ${
            isCorrectChoice 
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
              : 'bg-rose-50 border-rose-400 text-rose-950'
          }`}>
            <div className="flex items-start gap-3 text-left">
              {isCorrectChoice ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-black text-lg">
                  {isCorrectChoice ? '🎉 Caso Solucionado com Sucesso!' : 'Ops! Dica do Detetive:'}
                </h3>
                <p className="text-sm mt-0.5 font-medium">
                  {currentQ.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 font-black text-white shadow-md active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
              aria-label="Ir para o próximo caso do detetive"
            >
              <span>Próximo Caso</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
