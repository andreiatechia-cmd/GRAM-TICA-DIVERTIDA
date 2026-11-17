'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, HeartCrack, Flame } from 'lucide-react';
import { soundManager } from '@/lib/audio';
import { SalsichaReaction, getRandomReaction } from '@/lib/salsicha-character';

interface SalsichaCompanionProps {
  reaction?: SalsichaReaction | null;
  triggerType?: 'correct' | 'wrong' | null;
  className?: string;
  compact?: boolean;
}

const DEFAULT_IDLE: SalsichaReaction = {
  text: 'E aí, bicho! Eu sou o Salsicha! Vamos nos divertir e aprender um montão de gramática da língua portuguesa?',
  emotion: 'idle',
  soundEmotion: 'happy',
  subtitle: '🥪 "E aí bicho! Bora aprender português e brincar?"'
};

export function SalsichaCompanion({
  reaction,
  className = '',
  compact = false
}: SalsichaCompanionProps) {
  const [internalReaction, setInternalReaction] = useState<SalsichaReaction | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    return typeof window !== 'undefined' ? soundManager.isSalsichaVoiceEnabled() : true;
  });

  const lastSpokenTextRef = useRef<string>('');
  const currentReaction = reaction || internalReaction || DEFAULT_IDLE;

  const triggerSpeech = useCallback((react: SalsichaReaction) => {
    if (!soundManager.isSalsichaVoiceEnabled()) return;
    setIsSpeaking(true);
    soundManager.speakSalsicha(react.text, react.soundEmotion);
    const duration = Math.max(2000, react.text.length * 75);
    setTimeout(() => {
      setIsSpeaking(false);
    }, duration);
  }, []);

  // Speak when reaction changes externally
  useEffect(() => {
    if (reaction && reaction.text !== lastSpokenTextRef.current) {
      lastSpokenTextRef.current = reaction.text;
      triggerSpeech(reaction);
    }
  }, [reaction, triggerSpeech]);

  const handleManualSpeak = () => {
    triggerSpeech(currentReaction);
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    soundManager.setSalsichaVoiceEnabled(nextState);
    if (!nextState) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  };

  const handleCharacterClick = () => {
    const idleReact = getRandomReaction('idle');
    setInternalReaction(idleReact);
    lastSpokenTextRef.current = idleReact.text;
    triggerSpeech(idleReact);
  };

  const isHappy = currentReaction.emotion === 'happy' || currentReaction.emotion === 'excited';
  const isSad = currentReaction.emotion === 'sad' || currentReaction.emotion === 'crying';

  return (
    <div 
      className={`relative rounded-3xl transition-all duration-300 border-2 overflow-hidden ${
        isHappy 
          ? 'bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 border-emerald-300/80 shadow-md shadow-emerald-500/10'
          : isSad 
            ? 'bg-gradient-to-r from-sky-50 via-rose-50 to-amber-50 border-rose-300/80 shadow-md shadow-rose-500/10'
            : 'bg-gradient-to-r from-amber-50/70 to-orange-50/70 border-amber-200/80 shadow-xs'
      } ${compact ? 'p-3 sm:p-4' : 'p-4 sm:p-5'} ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Salsicha Character Avatar */}
        <div 
          onClick={handleCharacterClick}
          className="relative group cursor-pointer shrink-0 select-none"
          title="Clique para falar com o Salsicha!"
        >
          {/* Animated Avatar Frame */}
          <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-white border-2 shadow-md transition-transform duration-300 ${
            isSpeaking ? 'scale-105 ring-4 ring-amber-400/50' : 'group-hover:scale-105'
          } ${
            isHappy 
              ? 'border-emerald-400' 
              : isSad 
                ? 'border-rose-400 animate-pulse' 
                : 'border-amber-400'
          }`}>
            {/* SVG Cartoon Salsicha */}
            <svg 
              viewBox="0 0 100 100" 
              className={`w-full h-full rounded-xl overflow-hidden ${
                isSpeaking ? 'animate-bounce' : ''
              }`}
            >
              {/* Background Glow */}
              <rect width="100" height="100" fill={isHappy ? '#dcfce7' : isSad ? '#e0f2fe' : '#fef3c7'} />

              {/* Shaggy Brown Hair (Back) */}
              <path 
                d="M15 48 C 10 25, 25 8, 50 8 C 75 8, 90 25, 85 48 C 88 56, 80 68, 75 60 C 82 45, 78 20, 50 16 C 22 20, 18 45, 25 60 C 20 68, 12 56, 15 48 Z" 
                fill="#966034" 
              />

              {/* Neck & Chin */}
              <path d="M42 62 L42 82 L58 82 L58 62 Z" fill="#fed7aa" />
              <path d="M49 74 Q 50 78 51 74" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Salsicha Olive Green V-Neck Shirt */}
              <path d="M22 82 L42 82 L50 94 L58 82 L78 82 L86 100 L14 100 Z" fill="#65a30d" />
              <path d="M42 82 L50 94 L58 82" stroke="#4d7c0f" strokeWidth="2" fill="none" />

              {/* Face Shape */}
              <path d="M30 35 C 30 24, 70 24, 70 35 C 70 52, 62 68, 50 68 C 38 68, 30 52, 30 35 Z" fill="#ffedd5" />

              {/* Hair Front Bangs (Messy Shaggy Look) */}
              <path 
                d="M26 32 C 34 20, 44 26, 50 20 C 56 26, 66 20, 74 32 C 68 24, 58 22, 50 24 C 42 22, 32 24, 26 32 Z" 
                fill="#b4743e" 
              />
              <path d="M32 24 L36 34 L40 26 L48 35 L52 25 L60 35 L68 26" stroke="#966034" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Salsicha's Scruffy Goatee Beard (3 little chin tufts) */}
              <circle cx="50" cy="65" r="1.5" fill="#78350f" />
              <circle cx="47" cy="66" r="1.2" fill="#78350f" />
              <circle cx="53" cy="66" r="1.2" fill="#78350f" />

              {/* Eyes & Eyebrows based on emotion */}
              {isHappy ? (
                /* Joyful / Celebrating Eyes */
                <g>
                  {/* Eyebrows High and Cheerful */}
                  <path d="M35 32 Q 41 27 47 32" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M53 32 Q 59 27 65 32" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Smiling Happy Curved Eyes */}
                  <path d="M36 39 Q 41 33 46 39" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M54 39 Q 59 33 64 39" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Big Open Cheerful Mouth */}
                  <path d="M42 50 Q 50 63 58 50 Z" fill="#dc2626" />
                  <path d="M44 51 Q 50 56 56 51" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M46 57 Q 50 60 54 57" fill="#f87171" />
                  {/* Rosy Cheeks */}
                  <circle cx="34" cy="46" r="3.5" fill="#fca5a5" opacity="0.6" />
                  <circle cx="66" cy="46" r="3.5" fill="#fca5a5" opacity="0.6" />
                </g>
              ) : isSad ? (
                /* Sad / Crying Eyes with Tears */
                <g>
                  {/* Eyebrows Slanted Downward in Grief */}
                  <path d="M36 30 Q 42 35 46 32" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M54 32 Q 58 35 64 30" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Teary Big Droopy Eyes */}
                  <ellipse cx="41" cy="40" rx="3.5" ry="4" fill="#38bdf8" />
                  <circle cx="41" cy="41" r="2" fill="#0f172a" />
                  <circle cx="42" cy="39" r="1.2" fill="#ffffff" />

                  <ellipse cx="59" cy="40" rx="3.5" ry="4" fill="#38bdf8" />
                  <circle cx="59" cy="41" r="2" fill="#0f172a" />
                  <circle cx="60" cy="39" r="1.2" fill="#ffffff" />

                  {/* Falling Tears (Animated stream) */}
                  <path d="M39 45 C 38 48, 36 53, 38 56 C 40 58, 42 56, 41 53 Z" fill="#0ea5e9" className="animate-bounce" />
                  <path d="M61 45 C 60 48, 58 53, 60 56 C 62 58, 64 56, 63 53 Z" fill="#0ea5e9" className="animate-bounce" />

                  {/* Quivering Trembling Sad Down-turned Mouth */}
                  <path d="M43 54 Q 50 48 57 54" stroke="#7f1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                /* Idle Friendly Salsicha */
                <g>
                  <path d="M36 32 Q 41 30 46 32" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M54 32 Q 59 30 64 32" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
                  {/* Expressive Eyes */}
                  <circle cx="41" cy="39" r="2.5" fill="#1e293b" />
                  <circle cx="59" cy="39" r="2.5" fill="#1e293b" />
                  {/* Subtle Smile */}
                  <path d="M44 50 Q 50 56 56 50" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* Classic Salsicha Big Round Nose */}
              <ellipse cx="50" cy="44" rx="3.2" ry="2.2" fill="#f97316" />
            </svg>

            {/* Speaking animated badge */}
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 items-center justify-center text-[9px] text-white font-bold">
                  🔊
                </span>
              </span>
            )}

            {/* Sandwich Badge on Salsicha */}
            <div className="absolute -bottom-1.5 -left-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg px-1 text-[10px] shadow-xs flex items-center gap-0.5 font-black">
              <span>🥪 Salsicha</span>
            </div>
          </div>
        </div>

        {/* Character Dialogue & Controls */}
        <div className="flex-1 w-full space-y-2">
          {/* Top Bar: Title & Voice Toggle */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 ${
                isHappy 
                  ? 'bg-emerald-100 text-emerald-900' 
                  : isSad 
                    ? 'bg-rose-100 text-rose-900' 
                    : 'bg-amber-100 text-amber-900'
              }`}>
                {isHappy ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Salsicha Comemorando!
                  </>
                ) : isSad ? (
                  <>
                    <HeartCrack className="w-3.5 h-3.5 text-rose-600" />
                    Salsicha Triste com o Erro...
                  </>
                ) : (
                  <>
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    Seu Amigo Salsicha
                  </>
                )}
              </span>

              {isSpeaking && (
                <span className="text-[11px] font-bold text-amber-700 animate-pulse flex items-center gap-1">
                  Falando agora...
                </span>
              )}
            </div>

            {/* Voice toggle button */}
            <button
              onClick={handleToggleVoice}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                voiceEnabled 
                  ? 'bg-amber-100/80 hover:bg-amber-200 text-amber-900' 
                  : 'bg-slate-200/80 hover:bg-slate-300 text-slate-600'
              }`}
              title={voiceEnabled ? 'Desativar voz do Salsicha' : 'Ativar voz do Salsicha'}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Voz Ativada</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Voz Desativada</span>
                </>
              )}
            </button>
          </div>

          {/* Speech Bubble */}
          <div className="relative p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
            <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug tracking-tight">
              &quot;{currentReaction.text}&quot;
            </p>

            {/* Repeat Audio Button */}
            <button
              onClick={handleManualSpeak}
              disabled={isSpeaking}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
              title="Ouvir a voz do Salsicha novamente"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden md:inline">Ouvir Salsicha</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
