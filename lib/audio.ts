'use client';

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private soundEffectsEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private salsichaVoiceEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedSFX = localStorage.getItem('bilingual_game_sfx');
      const savedVoice = localStorage.getItem('bilingual_game_voice');
      const savedSalsicha = localStorage.getItem('bilingual_game_salsicha');
      if (savedSFX !== null) this.soundEffectsEnabled = savedSFX === 'true';
      if (savedVoice !== null) this.voiceEnabled = savedVoice === 'true';
      if (savedSalsicha !== null) this.salsichaVoiceEnabled = savedSalsicha === 'true';
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setSoundEffectsEnabled(enabled: boolean) {
    this.soundEffectsEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('bilingual_game_sfx', String(enabled));
    }
  }

  public isSoundEffectsEnabled(): boolean {
    return this.soundEffectsEnabled;
  }

  public setSalsichaVoiceEnabled(enabled: boolean) {
    this.salsichaVoiceEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('bilingual_game_salsicha', String(enabled));
    }
  }

  public isSalsichaVoiceEnabled(): boolean {
    return this.salsichaVoiceEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('bilingual_game_voice', String(enabled));
    }
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  // --- Cartoon Character Salsicha (Shaggy) Voice Synthesis ---
  public speakSalsicha(text: string, emotion: 'happy' | 'sad' | 'excited' = 'happy', force: boolean = false) {
    if (typeof window === 'undefined') return;
    if (!this.salsichaVoiceEnabled && !force) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';

      if (emotion === 'happy' || emotion === 'excited') {
        // High, excitable, energetic cartoon tone for Salsicha celebrating
        utterance.pitch = 1.3;
        utterance.rate = 1.05;
      } else {
        // Low, tremulous, sorrowful cartoon tone for Salsicha's sadness
        utterance.pitch = 0.85;
        utterance.rate = 0.82;
      }

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Prefer Portuguese male / expressive voice if available, or best PT voice
        const ptVoices = voices.filter(v => v.lang.toLowerCase().startsWith('pt'));
        const malePtVoice = ptVoices.find(v => 
          v.name.toLowerCase().includes('daniel') || 
          v.name.toLowerCase().includes('ricardo') ||
          v.name.toLowerCase().includes('male') ||
          v.name.toLowerCase().includes('brazil')
        ) || ptVoices[0];

        if (malePtVoice) {
          utterance.voice = malePtVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Salsicha Speech error:', e);
    }
  }

  // --- Cartoon Sad Trombone ("Wah-Wah-Wah-Waaah") Sound Effect ---
  public playSadCartoonTrombone() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Notes: Eb4 (311Hz) -> D4 (293Hz) -> Db4 (277Hz) -> C4 (261Hz held with vibrato/slide)
      const notes = [
        { startFreq: 311, endFreq: 298, start: 0.0, dur: 0.28 },
        { startFreq: 293, endFreq: 282, start: 0.32, dur: 0.28 },
        { startFreq: 277, endFreq: 268, start: 0.64, dur: 0.28 },
        { startFreq: 261, endFreq: 235, start: 0.96, dur: 0.75 }
      ];

      notes.forEach((n, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Warm brassy cartoon buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.startFreq, now + n.start);
        osc.frequency.exponentialRampToValueAtTime(n.endFreq, now + n.start + n.dur);

        // Lowpass filter to mimic a muted trombone
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now + n.start);
        filter.frequency.exponentialRampToValueAtTime(450, now + n.start + n.dur);

        // Gain envelope
        gain.gain.setValueAtTime(0.01, now + n.start);
        gain.gain.linearRampToValueAtTime(idx === 3 ? 0.22 : 0.16, now + n.start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur + 0.05);
      });
    } catch {}
  }

  // --- Web Speech API for Pronunciation ---
  public speak(text: string, lang: 'en' | 'pt', force: boolean = false) {
    if (typeof window === 'undefined') return;
    if (!this.voiceEnabled && !force) return;

    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'pt-BR';
      utterance.rate = 0.88; // Slightly slower, perfect for language learners
      utterance.pitch = 1.05; // Slightly cheerful, friendly tone

      // Try selecting an optimal voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const langPrefix = lang === 'en' ? 'en' : 'pt';
        const bestVoice = voices.find(v => 
          v.lang.toLowerCase().startsWith(langPrefix) && 
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Luciana') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.default)
        ) || voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));

        if (bestVoice) {
          utterance.voice = bestVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }

  // --- Sound Effects using Web Audio API ---
  public playCardFlip() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  public playMatchSound() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Ascending major chord: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.36);
      });
    } catch {}
  }

  public playMismatchSound() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [240, 180].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.12, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.13);
      });
    } catch {}
  }

  public playComboSound(comboLevel: number) {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const baseFreq = 587.33 * Math.min(1.5, 1 + comboLevel * 0.1); // D5
      const now = ctx.currentTime;

      [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.2, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.25);
      });
    } catch {}
  }

  public playVictoryFanfare() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Fanfare: C5, G4, C5, E5, G5, C6 (Held)
      const melody = [
        { f: 523.25, d: 0.12, t: 0.0 },
        { f: 392.00, d: 0.12, t: 0.12 },
        { f: 523.25, d: 0.14, t: 0.24 },
        { f: 659.25, d: 0.16, t: 0.40 },
        { f: 783.99, d: 0.22, t: 0.58 },
        { f: 1046.5, d: 0.65, t: 0.82 }
      ];

      const now = ctx.currentTime;

      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        gain.gain.setValueAtTime(0.25, now + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + note.t);
        osc.stop(now + note.t + note.d);
      });
    } catch {}
  }

  public playHintSound() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  }

  // --- Fun Pop sound for UI interactions ---
  public playPopSound() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  // --- Clap sound for counting syllables ---
  public playClapSound() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }

  // --- Magical sparkle chime for stars and rewards ---
  public playStarSound() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.3);
      });
    } catch {}
  }

  // --- Portuguese Child Accessibility Narrator ---
  public speakPortugueseNarrator(text: string, force: boolean = false) {
    if (typeof window === 'undefined') return;
    if (!this.voiceEnabled && !force) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.88; // Gentle, clear speed for early elementary children
      utterance.pitch = 1.15; // Friendly, warm, engaging voice

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const ptVoices = voices.filter(v => v.lang.toLowerCase().startsWith('pt'));
        const friendlyPt = ptVoices.find(v =>
          v.name.toLowerCase().includes('luciana') ||
          v.name.toLowerCase().includes('leticia') ||
          v.name.toLowerCase().includes('maria') ||
          v.name.toLowerCase().includes('francisca') ||
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('brazil')
        ) || ptVoices[0];

        if (friendlyPt) {
          utterance.voice = friendlyPt;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  }
}

export const soundManager = new SoundManager();
