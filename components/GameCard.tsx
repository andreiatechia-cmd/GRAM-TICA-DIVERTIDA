'use client';

import React from 'react';
import { GameCardItem } from '@/lib/pairs-data';
import { FunIllustration } from './FunIllustration';
import { soundManager } from '@/lib/audio';
import { Volume2, Check } from 'lucide-react';

interface GameCardProps {
  card: GameCardItem;
  onClick: () => void;
  disabled?: boolean;
}

export function GameCard({ card, onClick, disabled }: GameCardProps) {
  const handleSpeakerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.speak(card.word, card.language, true);
  };

  const isEn = card.language === 'en';

  return (
    <div
      id={`card-${card.instanceId}`}
      onClick={() => {
        if (!disabled && !card.isFlipped && !card.isMatched) {
          onClick();
        }
      }}
      className={`group relative select-none cursor-pointer aspect-[3/4] rounded-2xl perspective-1000 transition-transform duration-200 active:scale-95 ${
        card.isMatched ? 'cursor-default' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Carta ${card.isFlipped ? card.word : 'oculta'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled && !card.isFlipped && !card.isMatched) onClick();
        }
      }}
    >
      <div
        className={`w-full h-full duration-500 transform-style-3d transition-all rounded-2xl shadow-sm ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FACE DOWN (Card Back) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden flex flex-col items-center justify-between p-3 border-2 border-indigo-200 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 shadow-md group-hover:shadow-lg group-hover:border-white/60 transition-all`}
        >
          {/* Subtle top decoration */}
          <div className="flex justify-between w-full opacity-80 text-white text-[10px] font-bold tracking-widest uppercase">
            <span>EN</span>
            <span>⭐</span>
            <span>PT</span>
          </div>

          {/* Central emblem */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border-2 border-white/40 shadow-inner group-hover:scale-110 transition-transform">
              <span className="text-2xl sm:text-3xl text-yellow-300 font-extrabold filter drop-shadow">
                ?
              </span>
            </div>
            <span className="mt-2 text-[11px] font-bold text-indigo-100/90 tracking-wide uppercase">
              Bilingual
            </span>
          </div>

          {/* Subtle bottom badge */}
          <div className="w-full text-center">
            <span className="text-[10px] text-indigo-200/80 font-medium">
              16 Pares
            </span>
          </div>
        </div>

        {/* FACE UP (Card Front - Revealed) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden rotate-y-180 flex flex-col justify-between p-2.5 sm:p-3 border-2 transition-all ${
            card.isMatched
              ? 'border-emerald-400 bg-gradient-to-b from-emerald-50/90 to-teal-50 shadow-md ring-2 ring-emerald-300/60'
              : `bg-white ${card.borderColor} shadow-lg ring-1 ring-black/5`
          }`}
        >
          {/* Top Row: Language badge + Audio button */}
          <div className="flex items-center justify-between w-full gap-1">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wide uppercase ${
                isEn
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              <span>{isEn ? '🇺🇸 EN' : '🇧🇷 PT'}</span>
            </span>

            <button
              id={`speak-btn-${card.instanceId}`}
              type="button"
              onClick={handleSpeakerClick}
              title={`Ouvir pronúncia: ${card.word}`}
              className="p-1 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 active:scale-90 transition-all"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Fun Illustration / Emoji */}
          <div className="flex flex-col items-center justify-center my-auto py-1">
            <FunIllustration id={card.pairId} size="md" className="sm:scale-110" />
            
            {/* Matched stamp indicator */}
            {card.isMatched && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 mt-1 rounded-full bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold shadow-xs">
                <Check className="w-3 h-3" /> Par Feito!
              </span>
            )}
          </div>

          {/* Bottom: Word and Phonetic Helper */}
          <div className="w-full text-center">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight truncate px-0.5">
              {card.word}
            </h4>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide">
              {card.phonetic}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
