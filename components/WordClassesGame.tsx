'use client';

import React, { useState } from 'react';
import { 
  WORD_CLASSES_ITEMS, 
  WordClassItem, 
  WordClassType 
} from '@/lib/grammar-data';
import { soundManager } from '@/lib/audio';
import { SalsichaReaction, getRandomReaction } from '@/lib/salsicha-character';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb, 
  Package, 
  Zap, 
  Heart,
  Star
} from 'lucide-react';

interface WordClassesGameProps {
  onScoreEarned: (points: number, stars: number) => void;
  onMissionProgress: (missionKey: 'classes', count: number) => void;
  onSalsichaReact: (reaction: SalsichaReaction, trigger: 'correct' | 'wrong') => void;
  highContrast?: boolean;
}

export function WordClassesGame({
  onScoreEarned,
  onMissionProgress,
  onSalsichaReact,
  highContrast = false
}: WordClassesGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState<WordClassType | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showTip, setShowTip] = useState(false);

  const currentItem: WordClassItem = WORD_CLASSES_ITEMS[currentIndex % WORD_CLASSES_ITEMS.length];

  const handleSpeakWord = () => {
    soundManager.speakPortugueseNarrator(`A palavra é: ${currentItem.word}. Exemplo: ${currentItem.exampleSentence}`);
  };

  const handleChooseClass = (chosenClass: WordClassType) => {
    if (isAnswered) return;

    setSelectedClass(chosenClass);
    setIsAnswered(true);

    const isCorrect = chosenClass === currentItem.classType;

    if (isCorrect) {
      soundManager.playStarSound();
      const points = 50 + streak * 10;
      onScoreEarned(points, 2);
      onMissionProgress('classes', 1);
      const newStreak = streak + 1;
      setStreak(newStreak);

      const correctReaction = getRandomReaction('correct');
      onSalsichaReact(correctReaction, 'correct');

      try {
        confetti({
          particleCount: 20,
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

  const handleNextWord = () => {
    soundManager.playPopSound();
    setSelectedClass(null);
    setIsAnswered(false);
    setShowTip(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playPopSound();
    setCurrentIndex(0);
    setSelectedClass(null);
    setIsAnswered(false);
    setShowTip(false);
    setStreak(0);
  };

  const isCorrectChoice = selectedClass === currentItem.classType;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header bar of the game */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 shadow-sm ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-amber-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl border border-amber-300 shadow-xs">
            📦
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-amber-950">
              Aventura das Caixas Mágicas
            </h2>
            <p className="text-xs sm:text-sm text-amber-700">
              Separe a palavra na caixinha certa: Substantivo, Verbo ou Adjetivo!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-sm border border-amber-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Sequência: {streak} 🔥</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            title="Reiniciar jogo"
            aria-label="Reiniciar aventura das caixas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main card with the word */}
      <div className={`p-6 sm:p-8 rounded-3xl border-3 text-center flex flex-col items-center gap-5 transition-all shadow-md relative overflow-hidden ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-linear-to-b from-amber-50/70 via-white to-orange-50/50 border-amber-300'
      }`}>
        {/* Progress indicator */}
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
          Palavra #{currentIndex + 1} de {WORD_CLASSES_ITEMS.length}
        </span>

        {/* Word Card */}
        <div className="flex flex-col items-center gap-3 my-2">
          <div className="text-6xl sm:text-7xl animate-bounce duration-1000 select-none">
            {currentItem.emoji}
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-4xl sm:text-5xl font-black text-amber-950 tracking-wide">
              {currentItem.word}
            </h1>
            <button
              onClick={handleSpeakWord}
              className="p-3 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-md active:scale-95 transition-transform cursor-pointer"
              title="Ouvir a palavra e a frase em voz alta"
              aria-label={`Ouvir a palavra ${currentItem.word}`}
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <p className="text-base sm:text-lg text-amber-800 italic max-w-lg">
            &ldquo;{currentItem.exampleSentence}&rdquo;
          </p>
        </div>

        {/* Tip button */}
        <button
          onClick={() => {
            soundManager.playPopSound();
            setShowTip(!showTip);
          }}
          className="text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          {showTip ? 'Ocultar dica' : 'Precisa de uma dica mágica?'}
        </button>

        {showTip && (
          <div className="p-3 rounded-xl bg-amber-100/90 text-amber-900 text-xs sm:text-sm border border-amber-300 max-w-md animate-fadeIn">
            💡 {currentItem.funFact}
          </div>
        )}

        {/* The 3 Interactive Boxes */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
          {/* Caixa 1: Substantivo */}
          <button
            onClick={() => handleChooseClass('substantivo')}
            disabled={isAnswered}
            className={`p-5 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer text-center group ${
              isAnswered && currentItem.classType === 'substantivo'
                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 ring-4 ring-emerald-300'
                : isAnswered && selectedClass === 'substantivo' && !isCorrectChoice
                ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                : highContrast
                ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                : 'bg-linear-to-b from-amber-100 to-amber-200/60 border-amber-400 hover:border-amber-500 hover:scale-102 active:scale-98 shadow-sm'
            }`}
            aria-label="Caixa do Substantivo: Dá nome às coisas, pessoas e animais"
          >
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
              📦
            </div>
            <div className="font-black text-lg sm:text-xl text-amber-950">
              SUBSTANTIVO
            </div>
            <p className="text-xs text-amber-800 font-medium">
              Dá NOME às coisas, pessoas, bichos e lugares!
            </p>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-300/60 px-2 py-0.5 rounded-full mt-1">
              &ldquo;O que é?&rdquo;
            </span>
          </button>

          {/* Caixa 2: Verbo */}
          <button
            onClick={() => handleChooseClass('verbo')}
            disabled={isAnswered}
            className={`p-5 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer text-center group ${
              isAnswered && currentItem.classType === 'verbo'
                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 ring-4 ring-emerald-300'
                : isAnswered && selectedClass === 'verbo' && !isCorrectChoice
                ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                : highContrast
                ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                : 'bg-linear-to-b from-emerald-100 to-teal-200/60 border-teal-400 hover:border-teal-500 hover:scale-102 active:scale-98 shadow-sm'
            }`}
            aria-label="Caixa do Verbo: É uma ação ou movimento"
          >
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <div className="font-black text-lg sm:text-xl text-teal-950">
              VERBO
            </div>
            <p className="text-xs text-teal-800 font-medium">
              É uma AÇÃO! O que o corpo faz, pula ou se mexe!
            </p>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-300/60 px-2 py-0.5 rounded-full mt-1">
              &ldquo;O que faz?&rdquo;
            </span>
          </button>

          {/* Caixa 3: Adjetivo */}
          <button
            onClick={() => handleChooseClass('adjetivo')}
            disabled={isAnswered}
            className={`p-5 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer text-center group ${
              isAnswered && currentItem.classType === 'adjetivo'
                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 ring-4 ring-emerald-300'
                : isAnswered && selectedClass === 'adjetivo' && !isCorrectChoice
                ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                : highContrast
                ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                : 'bg-linear-to-b from-pink-100 to-rose-200/60 border-pink-400 hover:border-pink-500 hover:scale-102 active:scale-98 shadow-sm'
            }`}
            aria-label="Caixa do Adjetivo: É uma qualidade ou característica"
          >
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
              ✨
            </div>
            <div className="font-black text-lg sm:text-xl text-pink-950">
              ADJETIVO
            </div>
            <p className="text-xs text-pink-800 font-medium">
              É uma QUALIDADE! Mostra como as coisas são!
            </p>
            <span className="text-[11px] font-bold text-pink-700 bg-pink-300/60 px-2 py-0.5 rounded-full mt-1">
              &ldquo;Como é?&rdquo;
            </span>
          </button>
        </div>

        {/* Feedback Section when answered */}
        {isAnswered && (
          <div className={`w-full mt-5 p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn ${
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
                  {isCorrectChoice ? '🎉 Maravilhoso! Resposta Certinha!' : 'Ops! Vamos aprender juntos:'}
                </h3>
                <p className="text-sm mt-0.5 font-medium">
                  {currentItem.definition}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextWord}
              className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 font-black text-amber-950 shadow-md active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
              aria-label="Ir para a próxima palavra mágica"
            >
              <span>Próxima Palavra</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
