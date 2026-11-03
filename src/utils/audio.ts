/**
 * Ambient Runway Soundscape via Web Audio API (twin oscillators + biquad filter)
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

  public start(): void {
    if (this.isPlaying) return;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.isPlaying = true;
    this.osc1 = this.audioCtx.createOscillator();
    this.osc2 = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    this.gainNode = this.audioCtx.createGain();

    this.osc1.type = 'sine';
    this.osc1.frequency.value = 110;

    this.osc2.type = 'triangle';
    this.osc2.frequency.value = 164.81;

    filter.type = 'lowpass';
    filter.frequency.value = 420;

    this.gainNode.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.07, this.audioCtx.currentTime + 1.5);

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    filter.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);

    this.osc1.start();
    this.osc2.start();
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

