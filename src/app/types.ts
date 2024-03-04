export interface AudioFile {
  loaded: boolean;
  playing: boolean;
  play: () => void;
  stop: () => void;
  pause: () => void;
  audio: any;
}

export interface Timer {
  time: number;
  reset: () => void;
}

export interface GoogleUser {
  expires?: string;
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | undefined;
}

export interface RoutineSettings {
  warmUp: boolean;
  warmUpLength: 1 | 1.5 | 2 | 2.5 | 3;
  whiteNoise: null | 'white-noise';
  length: 5 | 7 | 10 | 15 | 30;
  guided: null | 'semi' | 'full';
  secondaryQueue: null | 'music' | 'singing-bowl';
  visualization: null | 'stillness' | 'loving-kindness';
}

export enum SessionStatus {
  LoggedOut = 'unauthenticated',
  LoggedIn = 'authenticated',
  Loading = 'loading'
}