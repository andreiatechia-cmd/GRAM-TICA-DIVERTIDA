'use client';

import React from 'react';

interface FunIllustrationProps {
  id: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function FunIllustration({ id, className = '', size = 'md' }: FunIllustrationProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }[size];

  // Specific custom SVG vector artwork for key categories, paired with vibrant colors and character styling
  switch (id) {
    case 1: // Dog
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <ellipse cx="26" cy="46" rx="11" ry="18" fill="#B45309" transform="rotate(-15 26 46)" />
          <ellipse cx="74" cy="46" rx="11" ry="18" fill="#B45309" transform="rotate(15 74 46)" />
          <ellipse cx="50" cy="54" rx="28" ry="24" fill="#F59E0B" />
          <ellipse cx="50" cy="62" rx="16" ry="12" fill="#FEF3C7" />
          <circle cx="40" cy="48" r="4.5" fill="#1E293B" />
          <circle cx="60" cy="48" r="4.5" fill="#1E293B" />
          <circle cx="42" cy="46" r="1.5" fill="#FFFFFF" />
          <circle cx="62" cy="46" r="1.5" fill="#FFFFFF" />
          <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M47 62 Q50 67 53 62" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M48 64 Q50 72 52 64" fill="#F43F5E" />
          <circle cx="34" cy="55" r="3" fill="#FCA5A5" opacity="0.6" />
          <circle cx="66" cy="55" r="3" fill="#FCA5A5" opacity="0.6" />
        </svg>
      );

    case 2: // Cat
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FFEDD5" />
          <polygon points="26,20 40,42 22,46" fill="#F97316" />
          <polygon points="28,26 38,42 24,44" fill="#FECDD3" />
          <polygon points="74,20 60,42 78,46" fill="#F97316" />
          <polygon points="72,26 62,42 76,44" fill="#FECDD3" />
          <circle cx="50" cy="54" r="26" fill="#FB923C" />
          <circle cx="38" cy="50" r="5" fill="#047857" />
          <circle cx="62" cy="50" r="5" fill="#047857" />
          <circle cx="37" cy="48" r="2" fill="#FFFFFF" />
          <circle cx="61" cy="48" r="2" fill="#FFFFFF" />
          <polygon points="50,57 47,54 53,54" fill="#F43F5E" />
          <path d="M46 59 Q50 64 54 59" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="56" x2="34" y2="58" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="62" x2="34" y2="62" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="56" x2="66" y2="58" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
          <line x1="78" y1="62" x2="66" y2="62" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 3: // Lion
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <circle cx="50" cy="50" r="32" fill="#EA580C" />
          <circle cx="50" cy="50" r="24" fill="#FBBF24" />
          <circle cx="40" cy="45" r="4" fill="#1E293B" />
          <circle cx="60" cy="45" r="4" fill="#1E293B" />
          <ellipse cx="50" cy="54" rx="12" ry="9" fill="#FEF3C7" />
          <polygon points="50,53 46,49 54,49" fill="#7C2D12" />
          <path d="M46 56 Q50 61 54 56" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <polygon points="42,22 50,15 58,22 55,27 45,27" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      );

    case 9: // Apple
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEE2E2" />
          <path d="M50 32 C50 18 55 16 60 18" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="64" cy="22" rx="10" ry="5" fill="#22C55E" transform="rotate(-30 64 22)" />
          <path d="M50 34 C36 28 22 42 24 64 C26 78 38 86 50 82 C62 86 74 78 76 64 C78 42 64 28 50 34 Z" fill="#EF4444" />
          <ellipse cx="40" cy="46" rx="6" ry="10" fill="#F87171" transform="rotate(-20 40 46)" />
          <circle cx="42" cy="56" r="3.5" fill="#1E293B" />
          <circle cx="58" cy="56" r="3.5" fill="#1E293B" />
          <path d="M46 62 Q50 67 54 62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 11: // Ice Cream
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FCE7F3" />
          <polygon points="34,54 66,54 50,88" fill="#F59E0B" />
          <line x1="38" y1="62" x2="62" y2="62" stroke="#D97706" strokeWidth="1.5" />
          <line x1="42" y1="72" x2="58" y2="72" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="50" cy="44" r="20" fill="#EC4899" />
          <circle cx="38" cy="48" r="8" fill="#F472B6" />
          <circle cx="62" cy="48" r="8" fill="#F472B6" />
          <circle cx="50" cy="26" r="7" fill="#EF4444" />
          <path d="M54 22 C56 16 62 14 64 16" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" />
          <rect x="42" y="38" width="4" height="2" rx="1" fill="#FBBF24" transform="rotate(20 42 38)" />
          <rect x="54" y="40" width="4" height="2" rx="1" fill="#60A5FA" transform="rotate(-15 54 40)" />
          <rect x="48" y="48" width="4" height="2" rx="1" fill="#34D399" />
        </svg>
      );

    case 17: // Sun
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF9C3" />
          {/* Sun Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="50"
              y1="16"
              x2="50"
              y2="24"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="22" fill="#FBBF24" />
          {/* Cool sunglasses */}
          <rect x="34" y="44" width="13" height="10" rx="3" fill="#1E293B" />
          <rect x="53" y="44" width="13" height="10" rx="3" fill="#1E293B" />
          <line x1="47" y1="48" x2="53" y2="48" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="36" y1="46" x2="42" y2="46" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <line x1="55" y1="46" x2="61" y2="46" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <path d="M44 60 Q50 66 56 60" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="36" cy="58" r="3" fill="#F87171" opacity="0.6" />
          <circle cx="64" cy="58" r="3" fill="#F87171" opacity="0.6" />
        </svg>
      );

    case 18: // Moon
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#EDE9FE" />
          <path d="M58 20 C40 20 28 34 28 52 C28 70 42 82 60 82 C68 82 74 78 78 74 C62 76 46 66 46 50 C46 36 54 26 68 22 C64 20 61 20 58 20 Z" fill="#8B5CF6" />
          <polygon points="76,26 78,32 84,32 79,36 81,42 76,38 71,42 73,36 68,32 74,32" fill="#FBBF24" />
          <polygon points="32,24 33,28 37,28 34,31 35,35 32,32 29,35 30,31 27,28 31,28" fill="#FDE047" transform="scale(0.8) translate(10, 10)" />
          {/* Sleeping eye */}
          <path d="M40 48 Q44 52 48 48" stroke="#EDE9FE" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 19: // Star
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <polygon points="50,18 58,38 80,38 62,52 69,74 50,60 31,74 38,52 20,38 42,38" fill="#F59E0B" />
          <polygon points="50,24 56,40 74,40 60,51 65,68 50,57 35,68 40,51 26,40 44,40" fill="#FBBF24" />
          <circle cx="44" cy="48" r="3" fill="#1E293B" />
          <circle cx="56" cy="48" r="3" fill="#1E293B" />
          <path d="M46 55 Q50 59 54 55" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="38" cy="52" r="2.5" fill="#F87171" opacity="0.6" />
          <circle cx="62" cy="52" r="2.5" fill="#F87171" opacity="0.6" />
        </svg>
      );

    case 26: // Car
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEE2E2" />
          <path d="M22 58 L32 40 L68 40 L78 58 L82 66 L18 66 Z" fill="#EF4444" />
          <path d="M36 43 L48 43 L48 56 L28 56 Z" fill="#BAE6FD" />
          <path d="M52 43 L64 43 L72 56 L52 56 Z" fill="#BAE6FD" />
          <circle cx="34" cy="68" r="9" fill="#1E293B" />
          <circle cx="34" cy="68" r="4" fill="#E2E8F0" />
          <circle cx="66" cy="68" r="9" fill="#1E293B" />
          <circle cx="66" cy="68" r="4" fill="#E2E8F0" />
          <circle cx="78" cy="60" r="3" fill="#FDE047" />
        </svg>
      );

    case 30: // Heart
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FFE4E6" />
          <path d="M50 78 C25 60 16 44 24 30 C30 20 44 22 50 32 C56 22 70 20 76 30 C84 44 75 60 50 78 Z" fill="#F43F5E" />
          <circle cx="40" cy="42" r="3.5" fill="#FFFFFF" />
          <circle cx="60" cy="42" r="3.5" fill="#FFFFFF" />
          <circle cx="41" cy="42" r="2" fill="#1E293B" />
          <circle cx="61" cy="42" r="2" fill="#1E293B" />
          <path d="M46 48 Q50 53 54 48" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      // High-grade fallback with emoji and radiant badge
      return (
        <div className={`${sizeClasses} ${className} flex items-center justify-center rounded-2xl bg-white/70 shadow-sm border border-black/5 select-none transition-transform hover:scale-105`}>
          <span className="text-3xl sm:text-4xl filter drop-shadow-sm leading-none">
            {getFallbackEmoji(id)}
          </span>
        </div>
      );
  }
}

function getFallbackEmoji(id: number): string {
  const emojis: Record<number, string> = {
    4: '🐵', 5: '🐘', 6: '🐸', 7: '🦆', 8: '🐟',
    10: '🍌', 12: '🍕', 13: '🎂', 14: '🧀', 15: '🍞', 16: '🥛',
    20: '☁️', 21: '🌧️', 22: '🌳', 23: '🌸', 24: '🔥',
    25: '🏠', 27: '📖', 28: '⏰', 29: '⚽', 31: '🔑', 32: '✏️'
  };
  return emojis[id] || '⭐';
}
