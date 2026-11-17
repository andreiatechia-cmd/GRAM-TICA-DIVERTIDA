'use client';

import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  Type, 
  Sparkles, 
  HelpCircle,
  Zap,
  Ear
} from 'lucide-react';
import { soundManager } from '@/lib/audio';

interface AccessibilityBarProps {
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onReadCurrentPageHelp: () => void;
}

export function AccessibilityBar({
  highContrast,
  onToggleHighContrast,
  fontSize,
  onChangeFontSize,
  reducedMotion,
  onToggleReducedMotion,
  soundEnabled,
  onToggleSound,
  voiceEnabled,
  onToggleVoice,
  onReadCurrentPageHelp
}: AccessibilityBarProps) {
  const cycleFontSize = () => {
    soundManager.playPopSound();
    if (fontSize === 'normal') onChangeFontSize('large');
    else if (fontSize === 'large') onChangeFontSize('xlarge');
    else onChangeFontSize('normal');
  };

  return (
    <aside 
      aria-label="Barra de acessibilidade e ajustes infantis"
      className={`w-full transition-all py-2 px-3 sm:px-6 border-b flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-medium ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-amber-50/90 text-amber-900 border-amber-200 backdrop-blur-sm'
      }`}
    >
      {/* Left indicator & Voice Narrator helper */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-950 border border-amber-300/80">
          <Ear className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
          Acessibilidade Infantil
        </span>
        <button
          onClick={onReadCurrentPageHelp}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold transition-all shadow-xs active:scale-95 cursor-pointer ${
            highContrast
              ? 'bg-yellow-300 text-black hover:bg-yellow-400'
              : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-300 shadow-xs'
          }`}
          title="Clique para ouvir as instruções desta página em voz alta"
          aria-label="Ouvir instrução da página com o narrador infantil"
        >
          <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Ouvir Instruções</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {/* Font size toggle */}
        <button
          onClick={cycleFontSize}
          className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 cursor-pointer transition-colors active:scale-95 ${
            highContrast
              ? 'border-yellow-400 bg-gray-900 text-yellow-300'
              : 'border-amber-300 bg-white text-amber-900 hover:bg-amber-100/50'
          }`}
          title="Mudar tamanho do texto (Padrão, Grande, Gigante)"
          aria-label={`Tamanho do texto atual: ${fontSize}. Clique para alternar.`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Fonte: {fontSize === 'normal' ? 'Normal' : fontSize === 'large' ? 'Grande' : 'Gigante'}</span>
        </button>

        {/* High contrast mode */}
        <button
          onClick={() => {
            soundManager.playPopSound();
            onToggleHighContrast();
          }}
          className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 cursor-pointer transition-colors active:scale-95 ${
            highContrast
              ? 'bg-yellow-300 text-black border-yellow-400 font-extrabold shadow-sm'
              : 'border-amber-300 bg-white text-amber-900 hover:bg-amber-100/50'
          }`}
          title="Ativar ou desativar cores com alto contraste para facilitar a leitura"
          aria-pressed={highContrast}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{highContrast ? 'Alto Contraste: Ligado' : 'Alto Contraste'}</span>
        </button>

        {/* Reduced motion toggle */}
        <button
          onClick={() => {
            soundManager.playPopSound();
            onToggleReducedMotion();
          }}
          className={`hidden md:flex px-2 py-1 rounded-lg border font-bold items-center gap-1 cursor-pointer transition-colors active:scale-95 ${
            reducedMotion
              ? 'bg-purple-100 text-purple-900 border-purple-400'
              : highContrast
              ? 'border-yellow-400 bg-gray-900 text-yellow-300'
              : 'border-amber-300 bg-white text-amber-900 hover:bg-amber-100/50'
          }`}
          title="Reduzir animações rápidas (Modo Calmo para crianças sensíveis)"
          aria-pressed={reducedMotion}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{reducedMotion ? 'Modo Calmo' : 'Animações'}</span>
        </button>

        {/* Sound FX toggle */}
        <button
          onClick={() => {
            soundManager.playPopSound();
            onToggleSound();
          }}
          className={`p-1.5 rounded-lg border cursor-pointer transition-colors active:scale-95 ${
            soundEnabled
              ? highContrast
                ? 'bg-yellow-300 text-black border-yellow-400'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-gray-100 text-gray-500 border-gray-300'
          }`}
          title={soundEnabled ? 'Efeitos sonoros ativados (clique para silenciar)' : 'Efeitos sonoros desativados'}
          aria-label={soundEnabled ? 'Silenciar efeitos sonoros' : 'Ativar efeitos sonoros'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Voice Speech toggle */}
        <button
          onClick={() => {
            soundManager.playPopSound();
            onToggleVoice();
          }}
          className={`px-2 py-1 rounded-lg border font-bold flex items-center gap-1 cursor-pointer transition-colors active:scale-95 ${
            voiceEnabled
              ? highContrast
                ? 'bg-yellow-300 text-black border-yellow-400'
                : 'bg-indigo-100 text-indigo-900 border-indigo-300'
              : 'bg-gray-100 text-gray-500 border-gray-300'
          }`}
          title="Voz do narrador e do Salsicha"
          aria-label={voiceEnabled ? 'Voz ativada' : 'Voz desativada'}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>{voiceEnabled ? 'Voz: On' : 'Voz: Off'}</span>
        </button>
      </div>
    </aside>
  );
}
