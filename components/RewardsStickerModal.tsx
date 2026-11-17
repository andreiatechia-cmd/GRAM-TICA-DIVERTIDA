'use client';

import React from 'react';
import { 
  STICKER_REWARDS, 
  StickerReward, 
  PlayerLevel, 
  getPlayerLevel,
  PLAYER_LEVELS 
} from '@/lib/grammar-data';
import { soundManager } from '@/lib/audio';
import { 
  X, 
  Award, 
  Star, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

interface RewardsStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPoints: number;
  totalStars: number;
  onOpenCertificate: () => void;
  highContrast?: boolean;
}

export function RewardsStickerModal({
  isOpen,
  onClose,
  totalPoints,
  totalStars,
  onOpenCertificate,
  highContrast = false
}: RewardsStickerModalProps) {
  if (!isOpen) return null;

  const currentLevel = getPlayerLevel(totalPoints);
  const nextLevel = PLAYER_LEVELS.find(l => l.level === currentLevel.level + 1);

  const pointsToNext = nextLevel ? nextLevel.minPoints - totalPoints : 0;
  const progressPercent = nextLevel
    ? Math.min(100, Math.max(0, ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100))
    : 100;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rewards-modal-title"
    >
      <div className={`max-w-2xl w-full rounded-3xl border-3 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-amber-300'
      }`}>
        {/* Header */}
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center text-xl shadow-xs">
              ⭐
            </div>
            <div>
              <h2 id="rewards-modal-title" className="font-black text-lg text-amber-950">
                Álbum de Figurinhas & Nível Mágico
              </h2>
              <p className="text-xs text-amber-800">
                Colete estrelas e desbloqueie todas as figurinhas holográficas!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPopSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
            aria-label="Fechar álbum de figurinhas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-6 flex-1">
          {/* Level Progress Banner */}
          <div className="p-4 rounded-2xl bg-linear-to-r from-amber-100 via-orange-100 to-amber-100 border border-amber-300 flex flex-col gap-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{currentLevel.emoji}</span>
                <div>
                  <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
                    Seu Nível Atual:
                  </div>
                  <div className="text-lg font-black text-amber-950">
                    Nível {currentLevel.level}: {currentLevel.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white font-black text-sm text-amber-900 border border-amber-300">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  {totalStars} Estrelas
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white font-black text-sm text-amber-900 border border-amber-300">
                  ✨ {totalPoints} XP
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-amber-200/80 rounded-full h-3.5 overflow-hidden p-0.5 border border-amber-300">
              <div 
                className="bg-linear-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-amber-800">
              <span>{totalPoints} XP</span>
              {nextLevel ? (
                <span>Faltam {pointsToNext} XP para {nextLevel.name}</span>
              ) : (
                <span>🎉 Nível Máximo Alcançado!</span>
              )}
            </div>
          </div>

          {/* Collectible Stickers Grid */}
          <div className="flex flex-col gap-3">
            <h3 className="font-black text-base text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Figurinhas Desbloqueadas ({STICKER_REWARDS.filter(s => totalPoints >= s.unlockedAtPoints).length} de {STICKER_REWARDS.length})</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STICKER_REWARDS.map((sticker) => {
                const isUnlocked = totalPoints >= sticker.unlockedAtPoints;

                return (
                  <div
                    key={sticker.id}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col items-center text-center gap-1.5 transition-all relative ${
                      isUnlocked
                        ? 'bg-linear-to-b from-white to-amber-50/50 border-amber-400 shadow-sm hover:scale-103'
                        : 'bg-gray-100 border-gray-300 text-gray-400 opacity-60'
                    }`}
                  >
                    <div className="text-4xl my-1 relative">
                      {isUnlocked ? (
                        sticker.emoji
                      ) : (
                        <div className="relative">
                          <span className="blur-xs grayscale">{sticker.emoji}</span>
                          <Lock className="w-4 h-4 text-gray-600 absolute inset-0 m-auto" />
                        </div>
                      )}
                    </div>

                    <div className="font-extrabold text-xs text-amber-950 line-clamp-1">
                      {sticker.title}
                    </div>

                    <p className="text-[10px] text-gray-600 leading-tight line-clamp-2">
                      {isUnlocked ? sticker.description : sticker.requirement}
                    </p>

                    {isUnlocked && (
                      <span className="mt-1 text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Conquistada
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificate CTA */}
          <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between gap-3 flex-wrap shadow-md">
            <div>
              <div className="font-black text-sm sm:text-base">
                📜 Diploma Oficial de Honra ao Mérito
              </div>
              <div className="text-xs text-emerald-100">
                Coloque o nome da criança e imprima o certificado com suas estrelas!
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playPopSound();
                onOpenCertificate();
              }}
              className="px-4 py-2 rounded-full bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer transition-all"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Ver Meu Diploma</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
