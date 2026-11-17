'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  VOCABULARY_32_PAIRS,
  VocabularyPair,
  GameCardItem
} from '@/lib/pairs-data';
import { soundManager } from '@/lib/audio';
import { GameCard } from '@/components/GameCard';
import { LeaderboardView } from '@/components/LeaderboardView';
import { VictoryModal } from '@/components/VictoryModal';
import { VocabularyDictionary } from '@/components/VocabularyDictionary';
import { QuizGameView } from '@/components/QuizGameView';
import { SalsichaCompanion } from '@/components/SalsichaCompanion';
import { SalsichaReaction, getRandomReaction } from '@/lib/salsicha-character';
import { AccessibilityBar } from '@/components/AccessibilityBar';
import { WordClassesGame } from '@/components/WordClassesGame';
import { PunctuationDetectiveGame } from '@/components/PunctuationDetectiveGame';
import { SyllablesRhymesGame } from '@/components/SyllablesRhymesGame';
import { PluralGenderGame } from '@/components/PluralGenderGame';
import { GrammarQuizView } from '@/components/GrammarQuizView';
import { DailyMissionsWidget } from '@/components/DailyMissionsWidget';
import { RewardsStickerModal } from '@/components/RewardsStickerModal';
import { CertificateModal } from '@/components/CertificateModal';
import { getPlayerLevel } from '@/lib/grammar-data';
import {
  Award,
  BookOpen,
  Sparkles,
  Flame,
  Lightbulb,
  Timer,
  Hash,
  HelpCircle,
  Brain,
  RotateCcw,
  Star,
  FileText,
  Trophy,
  Layers,
  Gamepad2,
  Package,
  Search,
  Music,
  Wand2
} from 'lucide-react';

type MainTab = 'classes' | 'pontuacao' | 'silabas' | 'plural' | 'grammar-quiz' | 'memory' | 'bilingual-quiz';
type GameMode = 32 | 16 | 8 | 'animals' | 'food' | 'nature' | 'objects';

function buildBoard(mode: GameMode): GameCardItem[] {
  let chosenPairs: VocabularyPair[] = [];

  if (typeof mode === 'number') {
    if (mode === 32) {
      chosenPairs = [...VOCABULARY_32_PAIRS];
    } else if (mode === 16) {
      const categories: Array<'animals' | 'food' | 'nature' | 'objects'> = ['animals', 'food', 'nature', 'objects'];
      chosenPairs = categories.flatMap((cat) => {
        const fromCat = VOCABULARY_32_PAIRS.filter(p => p.category === cat);
        return [...fromCat].sort(() => 0.5 - Math.random()).slice(0, 4);
      });
    } else if (mode === 8) {
      const categories: Array<'animals' | 'food' | 'nature' | 'objects'> = ['animals', 'food', 'nature', 'objects'];
      chosenPairs = categories.flatMap((cat) => {
        const fromCat = VOCABULARY_32_PAIRS.filter(p => p.category === cat);
        return [...fromCat].sort(() => 0.5 - Math.random()).slice(0, 2);
      });
    } else {
      const shuffled = [...VOCABULARY_32_PAIRS].sort(() => 0.5 - Math.random());
      chosenPairs = shuffled.slice(0, mode);
    }
  } else {
    chosenPairs = VOCABULARY_32_PAIRS.filter(p => p.category === mode);
  }

  const cardItems: GameCardItem[] = [];

  chosenPairs.forEach((pair) => {
    // English
    cardItems.push({
      instanceId: `card-${pair.id}-en-${Math.random().toString(36).slice(2, 6)}`,
      pairId: pair.id,
      word: pair.en,
      language: 'en',
      category: pair.category,
      categoryLabel: pair.categoryLabel,
      emoji: pair.emoji,
      phonetic: pair.enPhonetic,
      color: pair.color,
      bgLight: pair.bgLight,
      borderColor: pair.borderColor,
      isFlipped: false,
      isMatched: false
    });

    // Portuguese
    cardItems.push({
      instanceId: `card-${pair.id}-pt-${Math.random().toString(36).slice(2, 6)}`,
      pairId: pair.id,
      word: pair.pt,
      language: 'pt',
      category: pair.category,
      categoryLabel: pair.categoryLabel,
      emoji: pair.emoji,
      phonetic: pair.ptPhonetic,
      color: pair.color,
      bgLight: pair.bgLight,
      borderColor: pair.borderColor,
      isFlipped: false,
      isMatched: false
    });
  });

  return cardItems.sort(() => 0.5 - Math.random());
}

export default function PortugueseGrammarPortalPage() {
  // Navigation
  const [activeTab, setActiveTab] = useState<MainTab>('classes');

  // Gamification & Rewards
  const [totalPoints, setTotalPoints] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pt_grammar_points');
      return saved ? parseInt(saved, 10) : 120;
    }
    return 120;
  });

  const [totalStars, setTotalStars] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pt_grammar_stars');
      return saved ? parseInt(saved, 10) : 12;
    }
    return 12;
  });

  const [dailyProgress, setDailyProgress] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pt_grammar_daily_progress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return { classes: 0, pontuacao: 0, silabas: 0, plural: 0, quiz: 0 };
  });

  const [claimedDailyReward, setClaimedDailyReward] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pt_grammar_daily_claimed') === 'true';
    }
    return false;
  });

  // Accessibility State
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pt_grammar_high_contrast') === 'true';
    }
    return false;
  });

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pt_grammar_font_size');
      if (saved === 'large' || saved === 'xlarge') return saved;
    }
    return 'normal';
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pt_grammar_reduced_motion') === 'true';
    }
    return false;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => soundManager.isSoundEffectsEnabled());
  const [voiceEnabled, setVoiceEnabled] = useState(() => soundManager.isVoiceEnabled());

  // Mascot Reactions
  const [salsichaReaction, setSalsichaReaction] = useState<SalsichaReaction | null>(null);
  const [salsichaTrigger, setSalsichaTrigger] = useState<'correct' | 'wrong' | null>(null);

  // Modals
  const [isStickersOpen, setIsStickersOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [highlightLeaderboardId, setHighlightLeaderboardId] = useState<string | null>(null);

  // Memory Game State
  const [selectedMode, setSelectedMode] = useState<GameMode>(16);
  const [cards, setCards] = useState<GameCardItem[]>(() => buildBoard(16));
  const [flippedCards, setFlippedCards] = useState<GameCardItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [hintAvailable, setHintAvailable] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Persist points & stars
  const handleScoreEarned = useCallback((points: number, stars: number) => {
    setTotalPoints((prev) => {
      const next = prev + points;
      if (typeof window !== 'undefined') localStorage.setItem('pt_grammar_points', String(next));
      return next;
    });

    setTotalStars((prev) => {
      const next = prev + stars;
      if (typeof window !== 'undefined') localStorage.setItem('pt_grammar_stars', String(next));
      return next;
    });
  }, []);

  const handleMissionProgress = useCallback((key: string, count: number) => {
    setDailyProgress((prev) => {
      const next = { ...prev, [key]: (prev[key] || 0) + count };
      if (typeof window !== 'undefined') {
        localStorage.setItem('pt_grammar_daily_progress', JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const handleClaimDailyReward = (stars: number) => {
    setClaimedDailyReward(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pt_grammar_daily_claimed', 'true');
    }
    handleScoreEarned(100, stars);
  };

  // Accessibility Toggles
  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (typeof window !== 'undefined') localStorage.setItem('pt_grammar_high_contrast', String(next));
  };

  const handleChangeFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    if (typeof window !== 'undefined') localStorage.setItem('pt_grammar_font_size', size);
  };

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    if (typeof window !== 'undefined') localStorage.setItem('pt_grammar_reduced_motion', String(next));
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setSoundEffectsEnabled(next);
  };

  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    soundManager.setVoiceEnabled(next);
  };

  // Read Help for current page
  const handleReadCurrentPageHelp = () => {
    const helpMessages: Record<MainTab, string> = {
      'classes': 'Bem-vindo à Aventura das Caixas Mágicas! Ouça a palavra e clique na caixa certa: Substantivo para nomes de coisas e animais, Verbo para ações e movimentos, ou Adjetivo para qualidades e cores!',
      'pontuacao': 'Bem-vindo ao Detetive da Pontuação! Leia a frase e descubra qual sinal completa o sentido: interrogação para perguntas, exclamação para emoção forte, ponto final para afirmar ou vírgula para separar!',
      'silabas': 'Bem-vindo ao Caça-Sílabas e Rimas! Bata palmas para contar os pedacinhos da palavra ou encontre o som musical que rima no final do verso!',
      'plural': 'Bem-vindo ao Caldeirão Mágico! Transforme uma palavra simples no plural com vários elementos ou descubra o seu par feminino!',
      'grammar-quiz': 'Bem-vindo ao Super Quiz do Português! Responda às perguntas ilustradas e aprenda com explicações carinhosas para cada resposta!',
      'memory': 'Bem-vindo ao Jogo da Memória! Vire as cartas e encontre o par em inglês e português para praticar o vocabulário!',
      'bilingual-quiz': 'Bem-vindo ao Quiz Bilíngue de Inglês e Português!'
    };
    soundManager.speakPortugueseNarrator(helpMessages[activeTab] || helpMessages['classes']);
  };

  // Salsicha helper
  const handleSalsichaReact = useCallback((reaction: SalsichaReaction, trigger: 'correct' | 'wrong') => {
    setSalsichaReaction(reaction);
    setSalsichaTrigger(trigger);
  }, []);

  // Memory game initialiser
  const initializeGame = useCallback((mode: GameMode = selectedMode) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCards(buildBoard(mode));
    setFlippedCards([]);
    setIsProcessing(false);
    setMoves(0);
    setMatches(0);
    setCombo(0);
    setMaxCombo(0);
    setScore(0);
    setTimeSeconds(0);
    setIsGameActive(false);
    setIsVictory(false);
    setHintAvailable(true);
    setSalsichaReaction(getRandomReaction('idle'));
    setSalsichaTrigger(null);
  }, [selectedMode]);

  // Timer for memory game
  useEffect(() => {
    if (isGameActive && !isVictory) {
      timerRef.current = setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameActive, isVictory]);

  const activePairsCount = typeof selectedMode === 'number' ? selectedMode : 8;

  const handleCardClick = (clickedCard: GameCardItem) => {
    if (isProcessing) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    if (!isGameActive) setIsGameActive(true);

    soundManager.playCardFlip();
    soundManager.speak(clickedCard.word, clickedCard.language);

    const updatedCards = cards.map((c) =>
      c.instanceId === clickedCard.instanceId ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves((prev) => prev + 1);

      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        const nextCombo = combo + 1;
        setCombo(nextCombo);
        setMaxCombo((prev) => Math.max(prev, nextCombo));

        const comboPoints = nextCombo > 1 ? nextCombo * 50 : 0;
        const pairPoints = 100 + comboPoints;
        setScore((prev) => prev + pairPoints);
        handleScoreEarned(pairPoints, 1);

        if (nextCombo > 1) {
          soundManager.playComboSound(nextCombo);
        } else {
          soundManager.playMatchSound();
        }

        const correctReact = getRandomReaction('correct');
        handleSalsichaReact(correctReact, 'correct');

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);

          const newMatches = matches + 1;
          setMatches(newMatches);

          if (newMatches === activePairsCount) {
            setIsGameActive(false);
            const victoryReaction: SalsichaReaction = {
              text: 'Caramba, bicho! Você encontrou todos os pares! Merecemos um super banquete de comemoração!',
              emotion: 'excited',
              soundEmotion: 'excited',
              subtitle: '🏆 "Caramba, bicho! Merecemos um banquete agora!"'
            };
            handleSalsichaReact(victoryReaction, 'correct');
            setTimeout(() => {
              setIsVictory(true);
            }, 600);
          }
        }, 500);
      } else {
        soundManager.playSadCartoonTrombone();
        setCombo(0);
        const wrongReact = getRandomReaction('wrong');
        handleSalsichaReact(wrongReact, 'wrong');

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.instanceId === first.instanceId || c.instanceId === second.instanceId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 950);
      }
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentLevel = getPlayerLevel(totalPoints);

  const fontClass = 
    fontSize === 'xlarge' ? 'text-lg sm:text-xl' :
    fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base';

  return (
    <div className={`min-h-screen flex flex-col transition-colors selection:bg-amber-300 ${
      highContrast 
        ? 'bg-black text-yellow-300 font-bold' 
        : 'bg-linear-to-b from-amber-50/60 via-orange-50/40 to-yellow-50/60 text-slate-800'
    } ${fontClass}`}>
      {/* 1. Accessible Bar on Top */}
      <AccessibilityBar
        highContrast={highContrast}
        onToggleHighContrast={toggleHighContrast}
        fontSize={fontSize}
        onChangeFontSize={handleChangeFontSize}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        voiceEnabled={voiceEnabled}
        onToggleVoice={toggleVoice}
        onReadCurrentPageHelp={handleReadCurrentPageHelp}
      />

      {/* 2. Header & Mascot Hero Section */}
      <header className={`border-b transition-colors ${
        highContrast 
          ? 'bg-black border-yellow-400' 
          : 'bg-white/95 border-amber-200/80 shadow-xs backdrop-blur-md sticky top-0 z-30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo & Portal Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-white font-black text-2xl shadow-md border-2 border-white select-none">
              🇧🇷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`font-black text-lg sm:text-2xl tracking-tight leading-none ${
                  highContrast ? 'text-yellow-300' : 'text-amber-950'
                }`}>
                  Mundo da Gramática Divertida
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Educação Infantil & Anos Iniciais
                </span>
              </div>
              <p className={`text-xs mt-0.5 line-clamp-1 ${
                highContrast ? 'text-yellow-200' : 'text-amber-800'
              }`}>
                Jogos interativos, desafios, pontuação, narração falada e figurinhas mágicas!
              </p>
            </div>
          </div>

          {/* Gamification Badges & Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Stars count */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs sm:text-sm border ${
              highContrast ? 'bg-gray-900 border-yellow-400 text-yellow-300' : 'bg-amber-100/90 border-amber-300 text-amber-950'
            }`}>
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{totalStars} ⭐</span>
            </div>

            {/* Level Badge */}
            <button
              onClick={() => {
                soundManager.playPopSound();
                setIsStickersOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs sm:text-sm border cursor-pointer transition-transform active:scale-95 ${
                highContrast ? 'bg-yellow-300 text-black border-yellow-400' : currentLevel.badgeColor
              }`}
              title="Ver álbum de figurinhas e progresso de nível"
              aria-label={`Nível atual: ${currentLevel.name}. Clique para abrir álbum.`}
            >
              <span>{currentLevel.emoji}</span>
              <span className="hidden sm:inline">Nível {currentLevel.level}:</span>
              <span>{currentLevel.name}</span>
            </button>

            {/* Certificate Button */}
            <button
              onClick={() => {
                soundManager.playPopSound();
                setIsCertificateOpen(true);
              }}
              className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
              title="Abrir e imprimir Diploma de Honra ao Mérito"
              aria-label="Ver meu diploma oficial da Língua Portuguesa"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Diploma 📜</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-5">
        {/* Salsicha Mascot Companion with spoken voice and cartoon emotional reactions */}
        <SalsichaCompanion
          reaction={salsichaReaction}
          triggerType={salsichaTrigger}
          compact={false}
          className="shadow-sm"
        />

        {/* Daily Quests Widget (Desafios do Dia) */}
        <DailyMissionsWidget
          progress={dailyProgress}
          onClaimDailyReward={handleClaimDailyReward}
          claimedReward={claimedDailyReward}
          highContrast={highContrast}
        />

        {/* 3. Colorful Interactive Game Navigation Tabs */}
        <nav 
          aria-label="Escolher jogo da língua portuguesa"
          className={`p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-xs ${
            highContrast ? 'bg-black border-yellow-400' : 'bg-white border-amber-200'
          }`}
        >
          {/* Tab 1: Caixas das Classes */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setActiveTab('classes');
            }}
            className={`px-3.5 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'classes'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-102 font-black ring-2 ring-amber-300'
                : 'text-amber-900 hover:bg-amber-100/60'
            }`}
          >
            <span className="text-lg">📦</span>
            <span>1. Caixas das Classes</span>
          </button>

          {/* Tab 2: Detetive da Pontuação */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setActiveTab('pontuacao');
            }}
            className={`px-3.5 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'pontuacao'
                ? 'bg-blue-500 text-white shadow-md scale-102 font-black ring-2 ring-blue-300'
                : 'text-blue-900 hover:bg-blue-100/60'
            }`}
          >
            <span className="text-lg">🔍</span>
            <span>2. Detetive da Pontuação</span>
          </button>

          {/* Tab 3: Sílabas e Rimas */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setActiveTab('silabas');
            }}
            className={`px-3.5 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'silabas'
                ? 'bg-purple-600 text-white shadow-md scale-102 font-black ring-2 ring-purple-300'
                : 'text-purple-900 hover:bg-purple-100/60'
            }`}
          >
            <span className="text-lg">👏</span>
            <span>3. Sílabas & Rimas</span>
          </button>

          {/* Tab 4: Plural Maluco & Gênero */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setActiveTab('plural');
            }}
            className={`px-3.5 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'plural'
                ? 'bg-fuchsia-600 text-white shadow-md scale-102 font-black ring-2 ring-fuchsia-300'
                : 'text-fuchsia-900 hover:bg-fuchsia-100/60'
            }`}
          >
            <span className="text-lg">🧙‍♂️</span>
            <span>4. Plural & Gênero</span>
          </button>

          {/* Tab 5: Super Quiz com Explicação */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setActiveTab('grammar-quiz');
            }}
            className={`px-3.5 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'grammar-quiz'
                ? 'bg-emerald-600 text-white shadow-md scale-102 font-black ring-2 ring-emerald-300'
                : 'text-emerald-900 hover:bg-emerald-100/60'
            }`}
          >
            <span className="text-lg">🧠</span>
            <span>5. Super Quiz do Português</span>
          </button>

          {/* Tab 6: Memória Bilíngue */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setActiveTab('memory');
            }}
            className={`px-3.5 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'memory'
                ? 'bg-indigo-600 text-white shadow-md scale-102 font-black ring-2 ring-indigo-300'
                : 'text-indigo-900 hover:bg-indigo-100/60'
            }`}
          >
            <span className="text-lg">🃏</span>
            <span>6. Jogo da Memória</span>
          </button>

          {/* Tab 7: Quiz Bilíngue */}
          <button
            onClick={() => {
              soundManager.playPopSound();
              setActiveTab('bilingual-quiz');
            }}
            className={`px-3 py-2 rounded-xl sm:rounded-2xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'bilingual-quiz'
                ? 'bg-slate-800 text-white font-black'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🇬🇧</span>
            <span>Quiz Bilíngue</span>
          </button>
        </nav>

        {/* 4. Active Game Stage */}
        <section aria-live="polite" className="w-full flex flex-col gap-4">
          {/* Game 1: Word Classes */}
          {activeTab === 'classes' && (
            <WordClassesGame
              onScoreEarned={handleScoreEarned}
              onMissionProgress={handleMissionProgress}
              onSalsichaReact={handleSalsichaReact}
              highContrast={highContrast}
            />
          )}

          {/* Game 2: Punctuation Detective */}
          {activeTab === 'pontuacao' && (
            <PunctuationDetectiveGame
              onScoreEarned={handleScoreEarned}
              onMissionProgress={handleMissionProgress}
              onSalsichaReact={handleSalsichaReact}
              highContrast={highContrast}
            />
          )}

          {/* Game 3: Syllables & Rhymes */}
          {activeTab === 'silabas' && (
            <SyllablesRhymesGame
              onScoreEarned={handleScoreEarned}
              onMissionProgress={handleMissionProgress}
              onSalsichaReact={handleSalsichaReact}
              highContrast={highContrast}
            />
          )}

          {/* Game 4: Plural and Gender */}
          {activeTab === 'plural' && (
            <PluralGenderGame
              onScoreEarned={handleScoreEarned}
              onMissionProgress={handleMissionProgress}
              onSalsichaReact={handleSalsichaReact}
              highContrast={highContrast}
            />
          )}

          {/* Game 5: Portuguese Grammar Quiz with Explanations */}
          {activeTab === 'grammar-quiz' && (
            <GrammarQuizView
              onScoreEarned={handleScoreEarned}
              onMissionProgress={handleMissionProgress}
              onSalsichaReact={handleSalsichaReact}
              highContrast={highContrast}
            />
          )}

          {/* Game 6: Bilingual Memory Game */}
          {activeTab === 'memory' && (
            <div className="w-full flex flex-col gap-4 max-w-6xl mx-auto">
              {/* Controls bar */}
              <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-800">Tamanho:</span>
                  <button
                    onClick={() => {
                      setSelectedMode(16);
                      initializeGame(16);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      selectedMode === 16 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    16 Pares (Padrão)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMode(8);
                      initializeGame(8);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      selectedMode === 8 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    8 Pares (Rápido)
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDictionaryOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Dicionário Visual
                  </button>
                  <button
                    onClick={() => setIsLeaderboardOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    Ranking
                  </button>
                  <button
                    onClick={() => initializeGame(selectedMode)}
                    className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100"
                    title="Embaralhar cartas"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-500" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Pontos</span>
                    <p className="text-lg font-black">{score}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Pares</span>
                    <p className="text-lg font-black">{matches} / {activePairsCount}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center gap-3">
                  <Timer className="w-6 h-6 text-blue-500" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Tempo</span>
                    <p className="text-lg font-black font-mono">{formatTimer(timeSeconds)}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center gap-3">
                  <Hash className="w-6 h-6 text-purple-500" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Jogadas</span>
                    <p className="text-lg font-black">{moves}</p>
                  </div>
                </div>
              </div>

              {/* Memory Cards Grid */}
              <div
                className={`grid gap-2 sm:gap-3 my-2 ${
                  activePairsCount === 16
                    ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8'
                    : 'grid-cols-4'
                }`}
              >
                {cards.map((card) => (
                  <GameCard
                    key={card.instanceId}
                    card={card}
                    onClick={() => handleCardClick(card)}
                    disabled={isProcessing}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Game 7: Bilingual Quiz View */}
          {activeTab === 'bilingual-quiz' && (
            <QuizGameView onBackToMemory={() => setActiveTab('classes')} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t py-4 px-4 text-center text-xs mt-auto ${
        highContrast ? 'bg-black border-yellow-400 text-yellow-300' : 'bg-white border-amber-200 text-slate-500'
      }`}>
        <p className="font-bold text-amber-950">
          Mundo da Gramática Divertida da Língua Portuguesa • Educação Infantil & Anos Iniciais
        </p>
        <p className="text-slate-400 mt-0.5">
          Desenvolvido com carinho, acessibilidade de voz, desafios, pontuação, recompensas e o companheiro Salsicha!
        </p>
      </footer>

      {/* Collectible Stickers & XP Level Modal */}
      <RewardsStickerModal
        isOpen={isStickersOpen}
        onClose={() => setIsStickersOpen(false)}
        totalPoints={totalPoints}
        totalStars={totalStars}
        onOpenCertificate={() => {
          setIsStickersOpen(false);
          setIsCertificateOpen(true);
        }}
        highContrast={highContrast}
      />

      {/* Printable Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        totalPoints={totalPoints}
        totalStars={totalStars}
        levelName={currentLevel.name}
      />

      {/* Memory Game Modals */}
      <LeaderboardView
        isOpen={isLeaderboardOpen}
        onClose={() => {
          setIsLeaderboardOpen(false);
          setHighlightLeaderboardId(null);
        }}
        highlightEntryId={highlightLeaderboardId}
      />

      <VocabularyDictionary
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />

      <VictoryModal
        isOpen={isVictory}
        pairsCount={activePairsCount}
        moves={moves}
        timeSeconds={timeSeconds}
        maxCombo={maxCombo}
        onPlayAgain={() => initializeGame(selectedMode)}
        onOpenLeaderboard={(entryId) => {
          setIsVictory(false);
          if (entryId) setHighlightLeaderboardId(entryId);
          setIsLeaderboardOpen(true);
        }}
      />
    </div>
  );
}
