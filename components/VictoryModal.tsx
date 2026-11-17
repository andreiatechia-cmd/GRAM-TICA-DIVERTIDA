'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '@/lib/audio';
import {
  saveLeaderboardEntry,
  getStoredPlayerProfile,
  calculateGameScore
} from '@/lib/leaderboard';
import { Trophy, Star, CheckCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  pairsCount: number;
  moves: number;
  timeSeconds: number;
  maxCombo: number;
  onPlayAgain: () => void;
  onOpenLeaderboard: (newEntryId?: string) => void;
}

const AVATARS = ['🦁', '🦊', '🐼', '🚀', '🦄', '🐯', '🦉', '🌟', '🐬', '👑', '🐶', '🐱'];
const COUNTRIES = [
  { code: '🇧🇷', name: 'Brasil' },
  { code: '🇵🇹', name: 'Portugal' },
  { code: '🇺🇸', name: 'EUA' },
  { code: '🇬🇧', name: 'Reino Unido' },
  { code: '🇨🇦', name: 'Canadá' }
];

export function VictoryModal({
  isOpen,
  pairsCount,
  moves,
  timeSeconds,
  maxCombo,
  onPlayAgain,
  onOpenLeaderboard
}: VictoryModalProps) {
  const profile = getStoredPlayerProfile();
  const [playerName, setPlayerName] = useState(profile.name || 'Jogador Campeão');
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || '🦁');
  const [selectedCountry, setSelectedCountry] = useState(profile.country || '🇧🇷');
  const [isSaved, setIsSaved] = useState(false);
  const [savedRank, setSavedRank] = useState<number | null>(null);

  const stats = calculateGameScore({ pairsCount, moves, timeSeconds, maxCombo });

  useEffect(() => {
    if (isOpen) {
      soundManager.playVictoryFanfare();

      // Launch cheerful confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    const result = saveLeaderboardEntry({
      playerName: playerName.trim(),
      avatar: selectedAvatar,
      country: selectedCountry,
      score: stats.score,
      pairsCount,
      timeSeconds,
      moves,
      accuracy: stats.accuracy
    });

    setIsSaved(true);
    setSavedRank(result.rank);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center text-center overflow-y-auto max-h-[95vh]">
        {/* Celebration Badge */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-300/50 mb-3 border-4 border-white animate-bounce">
          <Trophy className="w-10 h-10 text-amber-900" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Parabéns, Você Venceu!
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Você encontrou todos os <strong>{pairsCount} pares bilíngues</strong> com sucesso!
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1.5 my-4">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 ${
                star <= stats.stars
                  ? 'fill-amber-400 text-amber-400 filter drop-shadow'
                  : 'text-slate-200'
              } transition-transform transform scale-100 hover:scale-110`}
            />
          ))}
        </div>

        {/* Big Score Box */}
        <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 text-white shadow-md mb-5">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-100">
            Pontuação Global Obtida
          </span>
          <div className="text-3xl sm:text-4xl font-black mt-0.5 tracking-tight">
            {stats.score.toLocaleString('pt-BR')}{' '}
            <span className="text-lg font-bold text-amber-200">pontos</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/20 text-xs">
            <div>
              <span className="text-white/80">Tempo:</span>
              <p className="font-extrabold text-white text-sm">{formatTime(timeSeconds)}</p>
            </div>
            <div>
              <span className="text-white/80">Jogadas:</span>
              <p className="font-extrabold text-white text-sm">{moves}</p>
            </div>
            <div>
              <span className="text-white/80">Precisão:</span>
              <p className="font-extrabold text-white text-sm">{stats.accuracy}%</p>
            </div>
          </div>
        </div>

        {/* Submission / Profile Form */}
        {!isSaved ? (
          <form onSubmit={handleSaveScore} className="w-full text-left space-y-4 mb-5">
            <div>
              <label htmlFor="player-name-input" className="block text-xs font-bold text-slate-700 mb-1">
                Nome para o Ranking Semanal:
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="player-name-input"
                  type="text"
                  maxLength={24}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Seu nome ou apelido"
                  required
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-2 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                  title="País de origem"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <span className="block text-xs font-bold text-slate-700 mb-1.5">
                Escolha seu Avatar:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all ${
                      selectedAvatar === av
                        ? 'bg-amber-100 border-2 border-amber-500 scale-110 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 border border-transparent'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="submit-score-btn"
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              Publicar no Ranking Semanal
            </button>
          </form>
        ) : (
          <div className="w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 mb-5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-base font-black">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Pontuação Registrada!
            </div>
            <p className="text-xs mt-1 text-emerald-700">
              Você alcançou o <strong>#{savedRank}º lugar</strong> no ranking semanal desta modalidade!
            </p>
            <button
              id="view-rankings-after-submit-btn"
              onClick={() => onOpenLeaderboard()}
              className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1"
            >
              Ver Tabela de Classificação <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-2">
          <button
            id="play-again-btn"
            onClick={onPlayAgain}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Jogar Novamente
          </button>
          <button
            id="open-leaderboard-from-victory-btn"
            onClick={() => onOpenLeaderboard()}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            Ver Ranking Geral
          </button>
        </div>
      </div>
    </div>
  );
}
