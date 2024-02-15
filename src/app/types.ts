export interface AudioFile {
  loaded: boolean;
  playing: boolean;
  play: () => void;
  stop: () => void;
}