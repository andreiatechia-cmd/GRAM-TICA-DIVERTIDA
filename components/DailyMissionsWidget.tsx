'use client';

import React, { useState } from 'react';
import { DAILY_MISSIONS, DailyMission } from '@/lib/grammar-data';
import { soundManager } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { 
  Target, 
  CheckCircle2, 
  Gift, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Star 
} from 'lucide-react';

interface DailyMissionsWidgetProps {
  progress: Record<string, number>;
  onClaimDailyReward: (stars: number) => void;
  claimedReward: boolean;
  highContrast?: boolean;
}

export function DailyMissionsWidget({
  progress,
  onClaimDailyReward,
  claimedReward,
  highContrast = false
}: DailyMissionsWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = DAILY_MISSIONS.filter(
    m => (progress[m.gameKey] || 0) >= m.targetCount
  ).length;

  const allCompleted = completedCount === DAILY_MISSIONS.length;

  const handleClaim = () => {
    if (claimedReward || !allCompleted) return;
    soundManager.playVictoryFanfare();
    onClaimDailyReward(100);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  return (
    <div className={`rounded-2xl border-2 transition-all shadow-sm ${
      highContrast 
        ? 'bg-black text-yellow-300 border-yellow-400' 
        : 'bg-linear-to-r from-amber-50 to-orange-50 border-amber-300'
    }`}>
      {/* Clickable Header */}
      <button
        onClick={() => {
          soundManager.playPopSound();
          setIsOpen(!isOpen);
        }}
        className="w-full p-3.5 flex items-center justify-between gap-3 text-left cursor-pointer"
        aria-expanded={isOpen}
        aria-label="Missões e Desafios do Dia"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-xs">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-amber-950">
                Desafios Mágicos do Dia
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                {completedCount}/{DAILY_MISSIONS.length} Concluídos
              </span>
            </div>
            <p className="text-xs text-amber-800">
              Complete todos para abrir o Baú do Tesouro!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {allCompleted && !claimedReward && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full animate-bounce">
              <Gift className="w-3.5 h-3.5" /> Abrir Baú!
            </span>
          )}
          {isOpen ? <ChevronUp className="w-5 h-5 text-amber-800" /> : <ChevronDown className="w-5 h-5 text-amber-800" />}
        </div>
      </button>

      {/* Expanded list */}
      {isOpen && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-3 border-t border-amber-200/70 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DAILY_MISSIONS.map((mis) => {
              const current = Math.min(mis.targetCount, progress[mis.gameKey] || 0);
              const isDone = current >= mis.targetCount;

              return (
                <div
                  key={mis.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                    isDone 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                      : 'bg-white border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Target className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-xs sm:text-sm">
                        {mis.title}
                      </div>
                      <div className="text-[11px] text-gray-600">
                        Progresso: {current}/{mis.targetCount}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                    +{mis.rewardStars} ⭐
                  </span>
                </div>
              );
            })}
          </div>

          {/* Treasure Claim Box */}
          <div className="mt-2 p-3 rounded-xl bg-linear-to-r from-amber-200 via-yellow-100 to-amber-200 border-2 border-amber-400 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div>
                <div className="font-black text-sm text-amber-950">
                  Grande Baú do Tesouro Diário
                </div>
                <div className="text-xs text-amber-800">
                  Recompensa: +100 Estrelas de Mestre da Língua Portuguesa!
                </div>
              </div>
            </div>

            {claimedReward ? (
              <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Recompensa Coletada!
              </span>
            ) : (
              <button
                onClick={handleClaim}
                disabled={!allCompleted}
                className={`px-4 py-2 rounded-full font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  allCompleted
                    ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-md active:scale-95 animate-pulse'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Abrir baú do tesouro diário"
              >
                <Sparkles className="w-4 h-4" />
                <span>{allCompleted ? 'Abrir Baú (+100 ⭐)' : 'Complete as missões'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
