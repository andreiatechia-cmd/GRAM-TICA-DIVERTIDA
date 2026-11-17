'use client';

import React, { useState, useMemo } from 'react';
import { 
  GRAMMAR_QUIZ_ITEMS, 
  GrammarQuizItem 
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
  Lightbulb, 
  Star,
  Brain,
  Filter
} from 'lucide-react';

interface GrammarQuizViewProps {
  onScoreEarned: (points: number, stars: number) => void;
  onMissionProgress: (missionKey: 'quiz', count: number) => void;
  onSalsichaReact: (reaction: SalsichaReaction, trigger: 'correct' | 'wrong') => void;
  highContrast?: boolean;
}

export function GrammarQuizView({
  onScoreEarned,
  onMissionProgress,
  onSalsichaReact,
  highContrast = false
}: GrammarQuizViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return GRAMMAR_QUIZ_ITEMS;
    return GRAMMAR_QUIZ_ITEMS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQ: GrammarQuizItem = filteredQuestions[currentIndex % filteredQuestions.length];

  const handleSpeakQuestion = () => {
    soundManager.speakPortugueseNarrator(currentQ.question);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const chosenOption = currentQ.options.find(o => o.id === optionId);
    const isCorrect = chosenOption?.isCorrect ?? false;

    if (isCorrect) {
      soundManager.playStarSound();
      const points = 100 + streak * 20;
      onScoreEarned(points, 3);
      onMissionProgress('quiz', 1);
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
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playPopSound();
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
    setStreak(0);
  };

  const chosenOption = currentQ.options.find(o => o.id === selectedOptionId);
  const isCorrectChoice = chosenOption?.isCorrect ?? false;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header bar */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 shadow-sm ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-emerald-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl border border-emerald-300 shadow-xs">
            🧠
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-emerald-950">
              Super Quiz do Português
            </h2>
            <p className="text-xs sm:text-sm text-emerald-700">
              Perguntas com explicações carinhosas para cada resposta!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-sm border border-emerald-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Acertos: {streak} 🔥</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            title="Reiniciar quiz"
            aria-label="Reiniciar o quiz de português"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border-3 flex flex-col items-center gap-6 shadow-md relative ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-linear-to-b from-emerald-50/70 via-white to-teal-50/50 border-emerald-300'
      }`}>
        {/* Category tag */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
            Pergunta #{currentIndex + 1} • {currentQ.categoryLabel}
          </span>
        </div>

        {/* Question Statement */}
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl">
          <div className="text-5xl sm:text-6xl animate-bounce select-none">
            {currentQ.emoji}
          </div>

          <div className="flex items-center justify-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-emerald-950">
              {currentQ.question}
            </h1>
            <button
              onClick={handleSpeakQuestion}
              className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95 transition-transform cursor-pointer shrink-0"
              title="Ouvir a pergunta em voz alta"
              aria-label={`Ouvir a pergunta: ${currentQ.question}`}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Hint button */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setShowHint(!showHint);
            }}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 underline underline-offset-4 cursor-pointer mt-1"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            {showHint ? 'Ocultar dica' : 'Pedir uma dica amiga'}
          </button>

          {showHint && (
            <div className="p-3 rounded-xl bg-amber-100 text-amber-900 text-xs sm:text-sm border border-amber-300 max-w-md animate-fadeIn">
              💡 {currentQ.hint}
            </div>
          )}
        </div>

        {/* Options grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered}
                className={`p-4 sm:p-5 rounded-2xl border-3 flex items-center gap-3 transition-all cursor-pointer text-left group ${
                  isAnswered && opt.isCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 ring-4 ring-emerald-300'
                    : isAnswered && isSelected && !opt.isCorrect
                    ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                    : highContrast
                    ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                    : 'bg-white hover:bg-emerald-50 border-emerald-300 hover:border-emerald-500 hover:scale-102 active:scale-98 shadow-sm'
                }`}
                aria-label={`Opção: ${opt.text}`}
              >
                {opt.emoji && (
                  <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </span>
                )}
                <div className="font-extrabold text-base sm:text-lg text-emerald-950">
                  {opt.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanations & Next Button */}
        {isAnswered && chosenOption && (
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
                  {isCorrectChoice ? '🎉 Acertou em Cheio!' : 'Ops! Vamos entender por que:'}
                </h3>
                <p className="text-sm mt-0.5 font-medium">
                  {chosenOption.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 font-black text-white shadow-md active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
              aria-label="Ir para a próxima pergunta"
            >
              <span>Próxima Pergunta</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
