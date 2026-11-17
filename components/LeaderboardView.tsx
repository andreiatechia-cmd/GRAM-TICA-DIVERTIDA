'use client';

import React, { useState } from 'react';
import {
  LeaderboardEntry,
  getLeaderboard,
  getCurrentWeekLabel,
  getCurrentWeekId,
  getStoredPlayerProfile
} from '@/lib/leaderboard';
import { Trophy, Medal, Calendar, Flame, Timer, Sparkles, User, RefreshCw, X } from 'lucide-react';

interface LeaderboardViewProps {
  isOpen: boolean;
  onClose: () => void;
  highlightEntryId?: string | null;
}

export function LeaderboardView({ isOpen, onClose, highlightEntryId }: LeaderboardViewProps) {
  const [tab, setTab] = useState<'weekly' | 'allTime'>('weekly');
  const [filterMode, setFilterMode] = useState<number | 'all'>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard());
  const currentWeek = getCurrentWeekId();
  const weekLabel = getCurrentWeekLabel();
  const playerProfile = getStoredPlayerProfile();

  if (!isOpen) return null;

  const refreshData = () => {
    setEntries(getLeaderboard());
  };

  const filteredEntries = entries.filter((item) => {
    if (tab === 'weekly' && item.weekId !== currentWeek) return false;
    if (filterMode !== 'all' && item.pairsCount !== filterMode) return false;
    return true;
  }).sort((a, b) => b.score - a.score);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 shadow-inner">
              <Trophy className="w-7 h-7 text-yellow-200" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                Ranking Global de Jogadores
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                {weekLabel}
              </p>
            </div>
          </div>
          <button
            id="close-leaderboard-btn"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Fechar ranking"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Player Profile Quick Ribbon */}
        <div className="bg-amber-50/80 border-b border-amber-200/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-800">
            <span className="text-xl">{playerProfile.avatar}</span>
            <div>
              <span className="font-bold text-slate-900">{playerProfile.name}</span>
              <span className="text-slate-500 ml-1.5">({playerProfile.country})</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>
              Jogos: <strong className="text-slate-900">{playerProfile.totalGames}</strong>
            </span>
            <span>
              Recorde Pessoal:{' '}
              <strong className="text-amber-700 font-extrabold">{playerProfile.bestScore} pts</strong>
            </span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          {/* Weekly vs All Time */}
          <div className="flex p-1 bg-slate-200/80 rounded-xl w-full sm:w-auto">
            <button
              id="tab-weekly-btn"
              onClick={() => setTab('weekly')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                tab === 'weekly'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Melhores da Semana
            </button>
            <button
              id="tab-alltime-btn"
              onClick={() => setTab('allTime')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                tab === 'allTime'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Geral Histórico
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterMode(32)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                filterMode === 32
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
              32 Pares (Mestre)
            </button>
            <button
              onClick={() => setFilterMode(16)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterMode === 16
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              16 Pares
            </button>
            <button
              onClick={() => setFilterMode(8)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterMode === 8
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              8 Pares
            </button>
          </div>
        </div>

        {/* Leaderboard Table List */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-2 flex-1">
          {filteredEntries.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Trophy className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-600">Nenhuma pontuação registrada nesta categoria.</p>
              <p className="text-xs text-slate-400 mt-1">Jogue uma partida agora para ser o primeiro colocado!</p>
            </div>
          ) : (
            filteredEntries.map((item, index) => {
              const rank = index + 1;
              const isHighlight = highlightEntryId === item.id || item.isCurrentUser;

              let rankBadge = (
                <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center">
                  #{rank}
                </span>
              );

              if (rank === 1) {
                rankBadge = (
                  <span className="w-8 h-8 rounded-full bg-amber-400 text-white font-black text-sm flex items-center justify-center shadow-md shadow-amber-300/50">
                    🥇
                  </span>
                );
              } else if (rank === 2) {
                rankBadge = (
                  <span className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shadow-md">
                    🥈
                  </span>
                );
              } else if (rank === 3) {
                rankBadge = (
                  <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-black text-sm flex items-center justify-center shadow-md">
                    🥉
                  </span>
                );
              }

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all ${
                    isHighlight
                      ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/50 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60'
                  }`}
                >
                  {/* Left: Rank + Avatar + Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center">{rankBadge}</div>
                    <span className="text-2xl">{item.avatar}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {item.playerName}
                        </span>
                        <span className="text-xs">{item.country}</span>
                        {item.isCurrentUser && (
                          <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase">
                            Você
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span className="inline-flex items-center gap-0.5">
                          <Timer className="w-3 h-3" />
                          {formatTime(item.timeSeconds)}
                        </span>
                        <span>•</span>
                        <span>{item.moves} jogadas</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">{item.accuracy}% precisão</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Mode & Score */}
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      {item.score.toLocaleString('pt-BR')} <span className="text-xs font-semibold text-slate-500">pts</span>
                    </div>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {item.pairsCount} Pares
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={refreshData}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Atualizar ranking
          </button>
          <span>Reinicia todo domingo à meia-noite</span>
        </div>
      </div>
    </div>
  );
}
