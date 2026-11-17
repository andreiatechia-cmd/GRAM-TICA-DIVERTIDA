'use client';

import React, { useState, useMemo } from 'react';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Award, 
  BookOpen, 
  Flame, 
  AlertTriangle,
  Lightbulb,
  Check,
  ChevronRight,
  Filter
} from 'lucide-react';
import { soundManager } from '@/lib/audio';
import { QUIZ_QUESTIONS, QuizQuestion } from '@/lib/quiz-data';
import { SalsichaCompanion } from '@/components/SalsichaCompanion';
import { SalsichaReaction, getRandomReaction } from '@/lib/salsicha-character';
import confetti from 'canvas-confetti';

interface QuizGameViewProps {
  onBackToMemory?: () => void;
}

export function QuizGameView({ onBackToMemory }: QuizGameViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [salsichaReaction, setSalsichaReaction] = useState<SalsichaReaction | null>(null);
  const [salsichaTrigger, setSalsichaTrigger] = useState<'correct' | 'wrong' | null>(null);

  // Filter questions based on category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentIdx];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || !currentQ) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQ.correctOptionId;

    if (isCorrect) {
      soundManager.playMatchSound();
      setScore(prev => prev + 100 + streak * 20);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setCorrectCount(prev => prev + 1);

      // Salsicha Character Celebrates enthusiastically!
      const correctReaction = getRandomReaction('correct');
      setSalsichaReaction(correctReaction);
      setSalsichaTrigger('correct');

      if (newStreak % 3 === 0) {
        soundManager.playComboSound(Math.min(5, Math.floor(newStreak / 3)));
      }

      // Small confetti burst for streak
      if (newStreak >= 3) {
        try {
          confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    } else {
      // Play cartoon sad trombone sound
      soundManager.playSadCartoonTrombone();
      setStreak(0);
      setWrongCount(prev => prev + 1);

      // Salsicha Character Cries / Expresses Sorrow with sad voice and tears!
      const wrongReaction = getRandomReaction('wrong');
      setSalsichaReaction(wrongReaction);
      setSalsichaTrigger('wrong');
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setSalsichaReaction(getRandomReaction('idle'));
      setSalsichaTrigger(null);
    } else {
      // Completed all questions in the set!
      setIsFinished(true);
      soundManager.playVictoryFanfare();
      const victoryReaction: SalsichaReaction = {
        text: 'Caramba, bicho! Você completou tudo com chave de ouro! Agora sim merecemos um banquete com o Scooby!',
        emotion: 'excited',
        soundEmotion: 'excited',
        subtitle: '🏆 "Caramba, bicho! Merecemos um banquete agora!"'
      };
      setSalsichaReaction(victoryReaction);
      setSalsichaTrigger('correct');
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFinished(false);
    setSalsichaReaction(getRandomReaction('idle'));
    setSalsichaTrigger(null);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFinished(false);
    setSalsichaReaction(getRandomReaction('idle'));
    setSalsichaTrigger(null);
  };

  const playSpeech = (text: string, lang: 'en' | 'pt') => {
    soundManager.speak(text, lang, true);
  };

  const isCurrentCorrect = isAnswered && selectedOptionId === currentQ?.correctOptionId;

  // Categories list
  const categories = [
    { id: 'all', label: 'Todas as Perguntas', count: QUIZ_QUESTIONS.length, emoji: '✨' },
    { id: 'false_friends', label: 'Falsos Cognatos', count: QUIZ_QUESTIONS.filter(q => q.category === 'false_friends').length, emoji: '⚠️' },
    { id: 'grammar', label: 'Gramática Básica', count: QUIZ_QUESTIONS.filter(q => q.category === 'grammar').length, emoji: '🧩' },
    { id: 'daily', label: 'Cumprimentos & Dia a Dia', count: QUIZ_QUESTIONS.filter(q => q.category === 'daily').length, emoji: '👋' },
    { id: 'vocabulary', label: 'Vocabulário', count: QUIZ_QUESTIONS.filter(q => q.category === 'vocabulary').length, emoji: '🍎' },
    { id: 'phrases', label: 'Perguntas e Frases', count: QUIZ_QUESTIONS.filter(q => q.category === 'phrases').length, emoji: '💬' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider">
                Inglês & Português
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Nível Iniciante
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Quiz com Explicação de Erros & Falsos Amigos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Cada pergunta traz dicas práticas, exemplos reais e a explicação detalhada de por que cada alternativa está certa ou errada!
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl px-3.5 py-2 text-center shadow-xs">
              <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Combo
              </div>
              <div className="text-lg font-black text-amber-900 leading-tight">
                {streak}x
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl px-4 py-2 text-center shadow-xs">
              <div className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                Pontos
              </div>
              <div className="text-lg font-black text-indigo-950 leading-tight">
                {score}
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Categorias:
          </span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                selectedCategory === cat.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        {!isFinished && filteredQuestions.length > 0 && (
          <div className="mt-2 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>
                Pergunta <strong className="text-slate-900">{currentIdx + 1}</strong> de {filteredQuestions.length}
              </span>
              <span className="text-emerald-700 font-extrabold flex items-center gap-2">
                <span>Acertos: {correctCount}</span>
                <span className="text-rose-600 font-normal">| Erros: {wrongCount}</span>
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quiz Screen or Finished Screen */}
      {!isFinished && currentQ ? (
        <div className="space-y-6">
          {/* Cartoon Character Salsicha (Voice & Reactions) */}
          <SalsichaCompanion
            reaction={salsichaReaction}
            triggerType={salsichaTrigger}
          />

          {/* Main Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 relative overflow-hidden">
            {/* Top Category Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
                <span>{currentQ.categoryEmoji}</span>
                <span>{currentQ.categoryLabel}</span>
              </span>

              {/* Pronunciation voice button for prompt if available */}
              {currentQ.promptAudioText && (
                <button
                  onClick={() => playSpeech(currentQ.promptAudioText!, currentQ.promptAudioLang || 'en')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
                  title="Ouvir pronúncia da pergunta"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ouvir em Inglês</span>
                </button>
              )}
            </div>

            {/* Question Text */}
            <div className="flex items-start gap-4 mb-6">
              {currentQ.contextEmoji && (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-xs">
                  {currentQ.contextEmoji}
                </div>
              )}
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {currentQ.promptText}
                </h3>
                {currentQ.promptSubtext && (
                  <p className="text-sm font-semibold text-slate-500 mt-1 italic">
                    {currentQ.promptSubtext}
                  </p>
                )}
              </div>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQ.options.map((opt, optIndex) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQ.correctOptionId;

                // State colors after answering
                let btnStyle = 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800';
                let indicatorStyle = 'bg-white border-slate-300 text-slate-600';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-400/40 shadow-xs';
                    indicatorStyle = 'bg-emerald-500 border-emerald-500 text-white';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/30';
                    indicatorStyle = 'bg-rose-500 border-rose-500 text-white';
                  } else {
                    btnStyle = 'bg-slate-50/60 border-slate-200/60 text-slate-400 opacity-60';
                    indicatorStyle = 'bg-slate-100 border-slate-200 text-slate-400';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-50 border-indigo-400 text-indigo-950 ring-2 ring-indigo-400/30';
                  indicatorStyle = 'bg-indigo-600 border-indigo-600 text-white';
                }

                return (
                  <button
                    key={opt.id}
                    id={`quiz-opt-${opt.id}`}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`group text-left p-4 rounded-2xl border-2 transition-all relative flex items-center justify-between gap-3 ${btnStyle} ${
                      !isAnswered ? 'cursor-pointer active:scale-98 hover:shadow-xs' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-black text-sm shrink-0 transition-colors ${indicatorStyle}`}>
                        {isAnswered && isCorrect ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : isAnswered && isSelected ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + optIndex)
                        )}
                      </div>
                      <span className="font-bold text-sm sm:text-base leading-snug">
                        {opt.text}
                      </span>
                    </div>

                    {/* Audio pronunciation for option if present */}
                    {opt.audioText && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          playSpeech(opt.audioText!, opt.audioLang || 'en');
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors"
                        title="Ouvir pronúncia"
                      >
                        <Volume2 className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Error & Answer Explanation Box (Appears immediately upon answering) */}
          {isAnswered && (
            <div className={`rounded-3xl p-6 sm:p-7 border-2 shadow-sm transition-all animate-fadeIn ${
              isCurrentCorrect 
                ? 'bg-gradient-to-br from-emerald-50/90 to-teal-50/70 border-emerald-300' 
                : 'bg-gradient-to-br from-rose-50/90 to-amber-50/70 border-rose-300'
            }`}>
              {/* Header result */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                    isCurrentCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}>
                    {isCurrentCorrect ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      <XCircle className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs font-black uppercase tracking-wider ${
                      isCurrentCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {isCurrentCorrect ? '🎉 Resposta Correta!' : '💡 Opa, quase! Veja por que você errou:'}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                      {currentQ.explanation.correctTitle}
                    </h4>
                  </div>
                </div>

                {/* Continue button right in the explanation */}
                <button
                  id="quiz-next-btn"
                  onClick={handleNextQuestion}
                  className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2 shrink-0"
                >
                  <span>{currentIdx + 1 < filteredQuestions.length ? 'Próxima Pergunta' : 'Ver Resultado Final'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Correct Reason breakdown */}
              <div className="mt-4 p-4 rounded-2xl bg-white/80 border border-slate-200/80 text-sm font-medium text-slate-800 leading-relaxed">
                <strong className="text-emerald-800 block mb-1 font-bold">
                  Por que esta é a resposta correta:
                </strong>
                {currentQ.explanation.correctReason}
              </div>

              {/* Explaining the user's specific mistake if they clicked a wrong option */}
              {!isCurrentCorrect && selectedOptionId && currentQ.explanation.wrongExplanations[selectedOptionId] && (
                <div className="mt-3 p-4 rounded-2xl bg-rose-100/70 border border-rose-200 text-sm font-medium text-rose-950 leading-relaxed">
                  <div className="flex items-center gap-2 font-bold text-rose-900 mb-1">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Explicação do seu erro:</span>
                  </div>
                  {currentQ.explanation.wrongExplanations[selectedOptionId]}
                </div>
              )}

              {/* Breakdown of other wrong alternatives to learn more */}
              <div className="mt-4 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Entenda as outras alternativas (para não errar nunca mais):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(currentQ.explanation.wrongExplanations).map(([optId, explanationText]) => {
                    const optObj = currentQ.options.find(o => o.id === optId);
                    if (!optObj) return null;
                    return (
                      <div key={optId} className="p-3 rounded-xl bg-white/70 border border-slate-200/70 text-slate-700">
                        <strong className="text-slate-900 block font-bold mb-0.5">
                          ❌ &quot;{optObj.text}&quot;:
                        </strong>
                        <span className="text-slate-600 leading-relaxed">{explanationText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grammar tip & Example sentence */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/60">
                {currentQ.explanation.grammarTip && (
                  <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-900">
                    <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black block uppercase text-[10px] text-indigo-700">Dica Prática de Ouro</span>
                      <span className="font-semibold">{currentQ.explanation.grammarTip}</span>
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-start justify-between gap-2.5 text-xs text-emerald-950">
                  <div>
                    <span className="font-black block uppercase text-[10px] text-emerald-700">Exemplo na Prática</span>
                    <span className="font-bold block">&quot;{currentQ.explanation.exampleSentenceEn}&quot;</span>
                    <span className="text-emerald-800/80 italic mt-0.5 block">{currentQ.explanation.exampleSentencePt}</span>
                  </div>
                  <button
                    onClick={() => playSpeech(currentQ.explanation.exampleSentenceEn, 'en')}
                    className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors shrink-0"
                    title="Ouvir exemplo"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : isFinished ? (
        /* Finished Screen with Full Summary */
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 text-center space-y-6 animate-scaleUp">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 mx-auto flex items-center justify-center text-white text-4xl shadow-lg shadow-orange-500/20">
            🏆
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Parabéns! Você concluiu a rodada de perguntas!
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Você praticou inglês real para iniciantes e aprendeu a identificar as pegadinhas e os falsos amigos!
            </p>
          </div>

          {/* Salsicha Victory Companion */}
          <SalsichaCompanion
            reaction={salsichaReaction}
            triggerType={salsichaTrigger}
          />

          {/* Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
              <span className="text-xs font-bold text-indigo-700 block">Pontos Totais</span>
              <span className="text-2xl font-black text-indigo-950">{score}</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-xs font-bold text-emerald-700 block">Acertos</span>
              <span className="text-2xl font-black text-emerald-950">{correctCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
              <span className="text-xs font-bold text-rose-700 block">Erros Analisados</span>
              <span className="text-2xl font-black text-rose-950">{wrongCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-xs font-bold text-amber-700 block">Maior Combo</span>
              <span className="text-2xl font-black text-amber-950">{bestStreak}x</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </button>

            {onBackToMemory && (
              <button
                onClick={onBackToMemory}
                className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Voltar ao Jogo da Memória</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
