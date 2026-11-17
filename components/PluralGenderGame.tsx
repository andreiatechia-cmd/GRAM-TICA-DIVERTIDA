'use client';

import React, { useState } from 'react';
import { 
  PLURAL_GENDER_ITEMS, 
  PluralGenderItem 
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
  Sparkles, 
  Flame,
  Star,
  Wand2
} from 'lucide-react';

interface PluralGenderGameProps {
  onScoreEarned: (points: number, stars: number) => void;
  onMissionProgress: (missionKey: 'plural', count: number) => void;
  onSalsichaReact: (reaction: SalsichaReaction, trigger: 'correct' | 'wrong') => void;
  highContrast?: boolean;
}

export function PluralGenderGame({
  onScoreEarned,
  onMissionProgress,
  onSalsichaReact,
  highContrast = false
}: PluralGenderGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentItem: PluralGenderItem = PLURAL_GENDER_ITEMS[currentIndex % PLURAL_GENDER_ITEMS.length];

  const handleSpeakChallenge = () => {
    const promptText = currentItem.type === 'plural' 
      ? `Transforme no caldeirão para o plural: ${currentItem.singularOrMasculine}. Como fica?`
      : `Qual é o par feminino de: ${currentItem.singularOrMasculine}?`;
    soundManager.speakPortugueseNarrator(promptText);
  };

  const handleChooseOption = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentItem.correctAnswer;

    if (isCorrect) {
      soundManager.playStarSound();
      const points = 70 + streak * 10;
      onScoreEarned(points, 2);
      onMissionProgress('plural', 1);
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

  const handleNextChallenge = () => {
    soundManager.playPopSound();
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playPopSound();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setStreak(0);
  };

  const isCorrectChoice = selectedOption === currentItem.correctAnswer;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 shadow-sm ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-fuchsia-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-fuchsia-100 flex items-center justify-center text-xl border border-fuchsia-300 shadow-xs">
            🧙‍♂️
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-fuchsia-950">
              Caldeirão Mágico do Plural & Gênero
            </h2>
            <p className="text-xs sm:text-sm text-fuchsia-700">
              Transforme um único elemento em muitos (plural) ou encontre o par feminino!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-900 font-bold text-sm border border-fuchsia-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Mágicas: {streak} ✨</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            title="Reiniciar caldeirão"
            aria-label="Reiniciar feitiços gramaticais"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cauldron Stage */}
      <div className={`p-6 sm:p-8 rounded-3xl border-3 text-center flex flex-col items-center gap-6 shadow-md relative overflow-hidden ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-linear-to-b from-fuchsia-50/70 via-white to-pink-50/50 border-fuchsia-300'
      }`}>
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-fuchsia-200 text-fuchsia-900 border border-fuchsia-300">
          Desafio #{currentIndex + 1} • {currentItem.type === 'plural' ? 'Transformação no Plural' : 'Par Feminino'}
        </span>

        {/* Visual Transformation */}
        <div className="flex flex-col items-center gap-4 my-2">
          <div className="flex items-center gap-4 text-5xl sm:text-6xl">
            <span className="animate-pulse">{currentItem.emoji}</span>
            <span className="text-2xl text-fuchsia-400">➔</span>
            <span className="text-4xl sm:text-5xl animate-bounce">
              {isAnswered ? currentItem.correctEmoji : '❓'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-xs font-bold text-fuchsia-700 uppercase tracking-widest">
              Palavra no Caldeirão:
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-fuchsia-950">
                &ldquo;{currentItem.singularOrMasculine}&rdquo;
              </h1>
              <button
                onClick={handleSpeakChallenge}
                className="p-3 rounded-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white shadow-md active:scale-95 transition-transform cursor-pointer"
                title="Ouvir desafio mágico"
                aria-label={`Ouvir o desafio da palavra ${currentItem.singularOrMasculine}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm font-semibold text-fuchsia-800">
              {currentItem.type === 'plural' 
                ? 'Como fica quando temos VÁRIOS (Plural)?' 
                : 'Qual é a forma FEMININA desta palavra?'}
            </p>
          </div>
        </div>

        {/* Options (Potion bottles) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
          {currentItem.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentItem.correctAnswer;

            return (
              <button
                key={opt}
                onClick={() => handleChooseOption(opt)}
                disabled={isAnswered}
                className={`p-5 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                  isAnswered && isCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-4 ring-emerald-300'
                    : isAnswered && isSelected && !isCorrect
                    ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                    : highContrast
                    ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                    : 'bg-white hover:bg-fuchsia-50 border-fuchsia-300 hover:border-fuchsia-500 hover:scale-102 active:scale-98 shadow-sm'
                }`}
                aria-label={`Opção mágica: ${opt}`}
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  🧪
                </div>
                <div className="font-extrabold text-lg sm:text-xl text-fuchsia-950 text-center">
                  {opt}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback & Rule Tip */}
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
                  {isCorrectChoice ? '✨ Poção Mágica Criada com Sucesso!' : 'Ops! Dica de Ouro da Gramática:'}
                </h3>
                <p className="text-sm mt-0.5 font-medium">
                  {currentItem.ruleTip}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextChallenge}
              className="px-6 py-3 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 font-black text-white shadow-md active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
              aria-label="Ir para a próxima mágica"
            >
              <span>Próxima Mágica</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
