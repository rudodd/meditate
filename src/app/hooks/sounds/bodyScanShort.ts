import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useBodyScanShort() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    sound.play();
  }

  const stop = () => {
    sound.stop();
  }

  const pause = () => {
    sound.pause();
  }

  useEffect(() => {
    setSound(new Howl({
      src: '/sounds/body-scan-short.mp3',
      preload: true,
      volume: 0.7,
      autoplay: false,
      rate: 1.1,
      onload: () => setLoaded(true),
      onplay: () => setPlaying(true),
      onstop: () => setPlaying(false),
    }))
  }, [])

  return {loaded: loaded, playing: playing, play: play, stop: stop, pause: pause, audio: sound}
}