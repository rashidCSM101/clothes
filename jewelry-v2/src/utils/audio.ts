/**
 * Ambient Runway Soundscape + Crystalline Diamond Chime via Web Audio API
 */
class RunwayAudioEngine {
  private audioCtx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public get playing(): boolean {
    return this.isPlaying;
  }

  private ensureContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public start(): void {
    if (this.isPlaying) return;
    const ctx = this.ensureContext();

    this.isPlaying = true;
    this.osc1 = ctx.createOscillator();
    this.osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    this.gainNode = ctx.createGain();

    this.osc1.type = 'sine';
    this.osc1.frequency.value = 110;

    this.osc2.type = 'triangle';
    this.osc2.frequency.value = 164.81;

    filter.type = 'lowpass';
    filter.frequency.value = 420;

    this.gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 1.5);

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    filter.connect(this.gainNode);
    this.gainNode.connect(ctx.destination);

    this.osc1.start();
    this.osc2.start();
    this.playCrystalChime();
  }

  /**
   * Plays a delicate high-frequency crystal harmonic chime when stepping between parures
   */
  public playCrystalChime(): void {
    if (!this.isPlaying) return;
    try {
      const ctx = this.ensureContext();
      const now = ctx.currentTime;
      const freqs = [1318.51, 1975.53]; // E6, B6 crystal fifth

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);

        g.gain.setValueAtTime(0.0001, now + idx * 0.06);
        g.gain.linearRampToValueAtTime(0.022, now + idx * 0.06 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.1);

        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.15);
      });
    } catch (_) {}
  }

  public stop(): void {
    if (!this.isPlaying || !this.audioCtx || !this.gainNode) return;
    this.gainNode.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc2?.stop();
      } catch (_) {}
      this.isPlaying = false;
    }, 800);
  }
}

export const audioEngine = new RunwayAudioEngine();
