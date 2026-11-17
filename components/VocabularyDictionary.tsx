'use client';

import React, { useState } from 'react';
import { VOCABULARY_32_PAIRS, VocabularyPair } from '@/lib/pairs-data';
import { FunIllustration } from './FunIllustration';
import { soundManager } from '@/lib/audio';
import { BookOpen, Volume2, Search, X, Sparkles } from 'lucide-react';

interface VocabularyDictionaryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VocabularyDictionary({ isOpen, onClose }: VocabularyDictionaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filteredPairs = VOCABULARY_32_PAIRS.filter((pair) => {
    const matchesSearch =
      pair.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.pt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pair.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 shadow-inner">
              <BookOpen className="w-7 h-7 text-indigo-100" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                Dicionário Ilustrado de Vocabulário Bilíngue
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 mt-0.5">
                Aprenda a pronúncia e o significado de todas as palavras em inglês e português!
              </p>
            </div>
          </div>
          <button
            id="close-dictionary-btn"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Fechar dicionário"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/70">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar palavra (ex: Dog, Gato)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Todos (32)' },
              { id: 'animals', label: 'Animais (8)' },
              { id: 'food', label: 'Comidas (8)' },
              { id: 'nature', label: 'Natureza (8)' },
              { id: 'objects', label: 'Objetos (8)' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vocabulary Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredPairs.map((pair) => (
            <div
              key={pair.id}
              className="bg-white rounded-2xl p-3.5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-extrabold text-[10px] uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {pair.categoryLabel}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">#{pair.id}</span>
                </div>

                {/* Illustration */}
                <div className="flex justify-center my-2 group-hover:scale-105 transition-transform">
                  <FunIllustration id={pair.id} size="md" />
                </div>

                {/* Words & Audio */}
                <div className="space-y-2 mt-3 pt-2 border-t border-slate-100">
                  {/* English Word */}
                  <div className="flex items-center justify-between bg-blue-50/70 p-2 rounded-xl border border-blue-100">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">🇺🇸</span>
                        <span className="font-extrabold text-blue-900 text-sm">{pair.en}</span>
                      </div>
                      <span className="text-[10px] text-blue-600/80 font-medium">
                        {pair.enPhonetic}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => soundManager.speak(pair.en, 'en', true)}
                      title="Ouvir em inglês"
                      className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-200/60 active:scale-90 transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Portuguese Word */}
                  <div className="flex items-center justify-between bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">🇧🇷</span>
                        <span className="font-extrabold text-emerald-900 text-sm">{pair.pt}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600/80 font-medium">
                        {pair.ptPhonetic}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => soundManager.speak(pair.pt, 'pt', true)}
                      title="Ouvir em português"
                      className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-200/60 active:scale-90 transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fun Fact / Curiosidade */}
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-tight">
                <span className="font-bold text-amber-700 flex items-center gap-1 mb-0.5">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Curiosidade:
                </span>
                {pair.funFact}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Total de 32 pares educativos ilustrados</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors"
          >
            Voltar ao Jogo
          </button>
        </div>
      </div>
    </div>
  );
}
