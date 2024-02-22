export interface AudioFile {
  loaded: boolean;
  playing: boolean;
  play: () => void;
  stop: () => void;
}

export interface Timer {
  time: number;
  reset: () => void;
}

export interface RoutineSettings {
  warmUp: boolean;
  warmUpLength: 0.5 | 1 | 1.5 | 2 | 2.5 | 3;
  whiteNoise: null | 'white-noise';
  length: 5 | 7 | 10 | 15 | 30;
  guided: null | 'semi' | 'full';
  secondaryQueue: null | 'music' | 'wind-chimes';
  visualization: null | 'stillness';
}