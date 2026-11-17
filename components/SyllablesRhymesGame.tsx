'use client';

import React, { useState } from 'react';
import { 
  SYLLABLE_ITEMS, 
  SyllableItem, 
  RHYME_CHALLENGES, 
  RhymeChallenge 
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
  Music, 
  HandMetal,
  Star,
  Sparkles
} from 'lucide-react';

interface SyllablesRhymesGameProps {
  onScoreEarned: (points: number, stars: number) => void;
  onMissionProgress: (missionKey: 'silabas', count: number) => void;
  onSalsichaReact: (reaction: SalsichaReaction, trigger: 'correct' | 'wrong') => void;
  highContrast?: boolean;
}

export function SyllablesRhymesGame({
  onScoreEarned,
  onMissionProgress,
  onSalsichaReact,
  highContrast = false
}: SyllablesRhymesGameProps) {
  const [gameMode, setGameMode] = useState<'syllables' | 'rhymes'>('syllables');
  const [syllableIdx, setSyllableIdx] = useState(0);
  const [rhymeIdx, setRhymeIdx] = useState(0);

  // Syllable state
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [isSyllableAnswered, setIsSyllableAnswered] = useState(false);
  const [clapsGiven, setClapsGiven] = useState<number>(0);

  // Rhyme state
  const [selectedRhymeOption, setSelectedRhymeOption] = useState<string | null>(null);
  const [isRhymeAnswered, setIsRhymeAnswered] = useState(false);

  const currentSyllable: SyllableItem = SYLLABLE_ITEMS[syllableIdx % SYLLABLE_ITEMS.length];
  const currentRhyme: RhymeChallenge = RHYME_CHALLENGES[rhymeIdx % RHYME_CHALLENGES.length];

  // Syllable actions
  const handleClap = () => {
    soundManager.playClapSound();
    setClapsGiven(prev => prev + 1);
  };

  const handleSpeakSyllableWord = () => {
    const brokenText = currentSyllable.syllablesBroken.join('... ');
    soundManager.speakPortugueseNarrator(`A palavra é: ${currentSyllable.word}. Soletrando em pedacinhos: ${brokenText}`);
  };

  const handleSelectSyllableCount = (count: number) => {
    if (isSyllableAnswered) return;

    setSelectedCount(count);
    setIsSyllableAnswered(true);

    const isCorrect = count === currentSyllable.syllableCount;

    if (isCorrect) {
      soundManager.playStarSound();
      onScoreEarned(50, 2);
      onMissionProgress('silabas', 1);
      const correctReact = getRandomReaction('correct');
      onSalsichaReact(correctReact, 'correct');

      try {
        confetti({
          particleCount: 20,
          spread: 50,
          origin: { y: 0.7 }
        });
      } catch {}
    } else {
      soundManager.playSadCartoonTrombone();
      const wrongReact = getRandomReaction('wrong');
      onSalsichaReact(wrongReact, 'wrong');
    }
  };

  const handleNextSyllable = () => {
    soundManager.playPopSound();
    setSelectedCount(null);
    setIsSyllableAnswered(false);
    setClapsGiven(0);
    setSyllableIdx(prev => prev + 1);
  };

  // Rhyme actions
  const handleSpeakRhyme = () => {
    soundManager.speakPortugueseNarrator(`${currentRhyme.verse}. Qual palavra rima com ${currentRhyme.targetWord}?`);
  };

  const handleSelectRhymeOption = (word: string, isCorrect: boolean) => {
    if (isRhymeAnswered) return;

    setSelectedRhymeOption(word);
    setIsRhymeAnswered(true);

    if (isCorrect) {
      soundManager.playStarSound();
      onScoreEarned(60, 2);
      onMissionProgress('silabas', 1);
      const correctReact = getRandomReaction('correct');
      onSalsichaReact(correctReact, 'correct');

      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
    } else {
      soundManager.playSadCartoonTrombone();
      const wrongReact = getRandomReaction('wrong');
      onSalsichaReact(wrongReact, 'wrong');
    }
  };

  const handleNextRhyme = () => {
    soundManager.playPopSound();
    setSelectedRhymeOption(null);
    setIsRhymeAnswered(false);
    setRhymeIdx(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Mode Switcher */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 shadow-sm ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-purple-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl border border-purple-300 shadow-xs">
            {gameMode === 'syllables' ? '👏' : '🎵'}
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-purple-950">
              {gameMode === 'syllables' ? 'Bate-Palmas das Sílabas' : 'Roda das Rimas Encantadas'}
            </h2>
            <p className="text-xs sm:text-sm text-purple-700">
              {gameMode === 'syllables' 
                ? 'Conte quantas vezes abrimos a boquinha para falar a palavra!' 
                : 'Encontre a palavra com o mesmo sonzinho final!'}
            </p>
          </div>
        </div>

        {/* Toggle Mode Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playPopSound();
              setGameMode('syllables');
            }}
            className={`px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              gameMode === 'syllables'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
            }`}
          >
            👏 Bate-Palmas
          </button>
          <button
            onClick={() => {
              soundManager.playPopSound();
              setGameMode('rhymes');
            }}
            className={`px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              gameMode === 'rhymes'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
            }`}
          >
            🎵 Rimas
          </button>
        </div>
      </div>

      {/* Mode 1: Syllables Board */}
      {gameMode === 'syllables' ? (
        <div className={`p-6 sm:p-8 rounded-3xl border-3 text-center flex flex-col items-center gap-6 shadow-md relative ${
          highContrast 
            ? 'bg-black text-yellow-300 border-yellow-400' 
            : 'bg-linear-to-b from-purple-50/70 via-white to-pink-50/50 border-purple-300'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-200 text-purple-900 border border-purple-300">
            Palavra #{syllableIdx + 1} de {SYLLABLE_ITEMS.length}
          </span>

          <div className="flex flex-col items-center gap-3 my-2">
            <div className="text-6xl sm:text-7xl animate-bounce duration-1000 select-none">
              {currentSyllable.emoji}
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-4xl sm:text-5xl font-black text-purple-950 tracking-wide">
                {currentSyllable.word}
              </h1>
              <button
                onClick={handleSpeakSyllableWord}
                className="p-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-md active:scale-95 transition-transform cursor-pointer"
                title="Ouvir em pedacinhos"
                aria-label={`Ouvir pedacinhos da palavra ${currentSyllable.word}`}
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Interactive Clapping Simulator Button */}
            <div className="mt-2 flex flex-col items-center gap-2">
              <button
                onClick={handleClap}
                className="px-5 py-2.5 rounded-full bg-linear-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-amber-950 font-black text-sm shadow-md active:scale-95 flex items-center gap-2 cursor-pointer transition-transform"
                title="Bater palminhas para contar"
                aria-label="Bater palma para contar o ritmo da palavra"
              >
                <span className="text-xl">👏</span>
                <span>Bater Palma! ({clapsGiven} batidas)</span>
              </button>
              <p className="text-xs text-purple-800">
                Dica: Bata uma palma para cada pedacinho do som!
              </p>
            </div>
          </div>

          {/* Reveal Broken syllables if answered */}
          {isSyllableAnswered && (
            <div className="flex items-center justify-center gap-2 flex-wrap animate-fadeIn my-2">
              {currentSyllable.syllablesBroken.map((syl, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-2xl bg-purple-600 text-white font-black text-2xl shadow-md animate-scaleUp"
                >
                  {syl}
                </span>
              ))}
            </div>
          )}

          {/* Choose 1, 2, 3 or 4 syllables */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-2">
            {[1, 2, 3, 4].map((count) => {
              const isCorrect = count === currentSyllable.syllableCount;
              const isSelected = selectedCount === count;
              const labels = ['1 Sílaba (Monossílaba)', '2 Sílabas (Dissílaba)', '3 Sílabas (Trissílaba)', '4+ Sílabas (Polissílaba)'];

              return (
                <button
                  key={count}
                  onClick={() => handleSelectSyllableCount(count)}
                  disabled={isSyllableAnswered}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                    isSyllableAnswered && isCorrect
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-4 ring-emerald-300'
                      : isSyllableAnswered && isSelected && !isCorrect
                      ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                      : highContrast
                      ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                      : 'bg-white hover:bg-purple-50 border-purple-300 hover:border-purple-500 hover:scale-102 active:scale-98 shadow-sm'
                  }`}
                  aria-label={`Opção de ${count} palmas ou sílabas`}
                >
                  <div className="text-3xl font-black text-purple-900 group-hover:scale-110 transition-transform">
                    {count} {count === 1 ? 'Palma' : 'Palmas'}
                  </div>
                  <div className="flex gap-1 text-xl">
                    {Array.from({ length: count }).map((_, idx) => (
                      <span key={idx}>👏</span>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-purple-700">
                    {labels[count - 1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isSyllableAnswered && (
            <div className={`w-full mt-4 p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn ${
              selectedCount === currentSyllable.syllableCount
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                : 'bg-rose-50 border-rose-400 text-rose-950'
            }`}>
              <div className="flex items-start gap-3 text-left">
                {selectedCount === currentSyllable.syllableCount ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-black text-lg">
                    {selectedCount === currentSyllable.syllableCount ? '👏 Ritmo Perfeito!' : 'Ops! Vamos bater palmas juntos:'}
                  </h3>
                  <p className="text-sm mt-0.5 font-medium">
                    {currentSyllable.explanation}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextSyllable}
                className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 font-black text-white shadow-md active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
                aria-label="Próxima palavra para contar sílabas"
              >
                <span>Próxima Palavra</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Rhymes Board */
        <div className={`p-6 sm:p-8 rounded-3xl border-3 text-center flex flex-col items-center gap-6 shadow-md relative ${
          highContrast 
            ? 'bg-black text-yellow-300 border-yellow-400' 
            : 'bg-linear-to-b from-purple-50/70 via-white to-amber-50/50 border-purple-300'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-200 text-purple-900 border border-purple-300">
            Rima #{rhymeIdx + 1} de {RHYME_CHALLENGES.length}
          </span>

          {/* Verse with highlighted target */}
          <div className="flex flex-col items-center gap-3 my-2 max-w-xl">
            <div className="text-6xl sm:text-7xl animate-pulse duration-1000 select-none">
              {currentRhyme.targetEmoji}
            </div>

            <div className="p-4 rounded-2xl bg-white/95 border-2 border-purple-200 shadow-sm flex flex-col items-center gap-2">
              <p className="text-xl sm:text-2xl font-bold text-purple-950 italic">
                &ldquo;{currentRhyme.verse}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Palavra que rima com: <strong className="underline">{currentRhyme.targetWord}</strong> ({currentRhyme.rhymeSound})
                </span>
                <button
                  onClick={handleSpeakRhyme}
                  className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-xs cursor-pointer active:scale-95"
                  title="Ouvir verso e rima"
                  aria-label="Ouvir verso rimado em voz alta"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Rhyme Options */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
            {currentRhyme.options.map((opt) => {
              const isSelected = selectedRhymeOption === opt.word;

              return (
                <button
                  key={opt.word}
                  onClick={() => handleSelectRhymeOption(opt.word, opt.isCorrect)}
                  disabled={isRhymeAnswered}
                  className={`p-5 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                    isRhymeAnswered && opt.isCorrect
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-4 ring-emerald-300'
                      : isRhymeAnswered && isSelected && !opt.isCorrect
                      ? 'bg-rose-100 border-rose-500 text-rose-950 opacity-80'
                      : highContrast
                      ? 'bg-gray-900 border-yellow-400 hover:bg-yellow-400 hover:text-black'
                      : 'bg-white hover:bg-purple-50 border-purple-300 hover:border-purple-500 hover:scale-102 active:scale-98 shadow-sm'
                  }`}
                  aria-label={`Opção de rima: ${opt.word}`}
                >
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </div>
                  <div className="font-black text-xl text-purple-950">
                    {opt.word}
                  </div>
                  {opt.isCorrect && isRhymeAnswered && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      ✨ Rima perfeita com {currentRhyme.rhymeSound}!
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isRhymeAnswered && (
            <div className={`w-full mt-4 p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn ${
              selectedRhymeOption === currentRhyme.correctRhyme
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                : 'bg-rose-50 border-rose-400 text-rose-950'
            }`}>
              <div className="flex items-start gap-3 text-left">
                {selectedRhymeOption === currentRhyme.correctRhyme ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-black text-lg">
                    {selectedRhymeOption === currentRhyme.correctRhyme 
                      ? '🎶 Poesia Musical! Você rimou certinho!' 
                      : 'Ops! O som não combinou:'}
                  </h3>
                  <p className="text-sm mt-0.5 font-medium">
                    {currentRhyme.targetWord} rima com <strong>{currentRhyme.correctRhyme}</strong> porque ambas terminam com o mesmo sonzinho musical <strong>{currentRhyme.rhymeSound}</strong>!
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextRhyme}
                className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 font-black text-white shadow-md active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
                aria-label="Ir para a próxima rima mágica"
              >
                <span>Próxima Rima</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
