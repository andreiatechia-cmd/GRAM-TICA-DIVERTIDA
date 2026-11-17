'use client';

import React, { useState } from 'react';
import { soundManager } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { 
  X, 
  Printer, 
  Award, 
  Sparkles, 
  Star, 
  Calendar, 
  CheckCircle,
  Heart
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPoints: number;
  totalStars: number;
  levelName: string;
}

export function CertificateModal({
  isOpen,
  onClose,
  totalPoints,
  totalStars,
  levelName
}: CertificateModalProps) {
  const [studentName, setStudentName] = useState('Pequeno(a) Gênio(a)');

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playPopSound();
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}
    window.print();
  };

  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top actions */}
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 id="certificate-title" className="font-black text-amber-950 text-base sm:text-lg">
              Diploma Oficial de Mestre da Língua Portuguesa
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
              aria-label="Fechar certificado"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input to customize name (hidden on print) */}
        <div className="p-4 bg-amber-100/50 border-b border-amber-200 flex items-center gap-3 print:hidden">
          <label htmlFor="student-name" className="text-xs sm:text-sm font-bold text-amber-900 shrink-0">
            Nome da Criança:
          </label>
          <input
            id="student-name"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border-2 border-amber-300 bg-white font-bold text-amber-950 text-sm focus:outline-hidden focus:border-amber-500"
            placeholder="Digite o nome do aluno aqui..."
          />
        </div>

        {/* Printable Certificate Layout */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto bg-linear-to-b from-amber-50/50 via-white to-orange-50/40 text-center flex flex-col items-center justify-between gap-6 print:p-8">
          {/* Ornate Frame Border */}
          <div className="w-full p-6 sm:p-8 rounded-2xl border-4 border-dashed border-amber-400 bg-white shadow-inner flex flex-col items-center gap-4 relative">
            {/* Stars decoration */}
            <div className="flex items-center justify-center gap-2 text-amber-400 text-2xl">
              ⭐ ⭐ ⭐ ⭐ ⭐
            </div>

            <div className="text-xs uppercase tracking-widest font-black text-amber-600">
              República das Letras e Palavras
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-amber-950 font-serif tracking-tight">
              DIPLOMA DE HONRA AO MÉRITO
            </h1>

            <p className="text-xs sm:text-sm text-amber-800 max-w-md italic">
              Certificamos com muito orgulho e admiração que
            </p>

            {/* Child's Name */}
            <div className="text-3xl sm:text-4xl font-black text-indigo-950 border-b-2 border-amber-400 pb-1 px-6 my-1">
              {studentName}
            </div>

            <p className="text-xs sm:text-sm text-gray-700 max-w-lg leading-relaxed font-medium">
              Concluiu com brilhantismo os desafios gramaticais da Língua Portuguesa para os Anos Iniciais, demonstrando domínio em Substantivos, Verbos, Adjetivos, Pontuação, Rimas e Sílabas com muita dedicação e alegria!
            </p>

            {/* Badges and Stats */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mt-2 py-2 px-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{totalStars} Estrelas</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Nível: {levelName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>{today}</span>
              </div>
            </div>

            {/* Seal and Signatures */}
            <div className="w-full flex items-center justify-between pt-6 border-t border-amber-200/80 mt-4 text-xs text-gray-600">
              <div className="flex flex-col items-center">
                <div className="w-24 sm:w-32 border-b border-gray-400 mb-1" />
                <span className="font-bold text-[11px] text-amber-900">Professor(a) / Orientador(a)</span>
              </div>

              {/* Golden Seal */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-tr from-amber-500 to-yellow-300 text-amber-950 flex flex-col items-center justify-center font-black text-[10px] shadow-md border-2 border-amber-600">
                <span>SELO</span>
                <span className="text-xs">🏆</span>
                <span>OFICIAL</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-24 sm:w-32 border-b border-gray-400 mb-1" />
                <span className="font-bold text-[11px] text-amber-900">Mascote Salsicha & Scooby</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
