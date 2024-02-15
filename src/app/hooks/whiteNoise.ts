import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useWhiteNoise() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    sound.play();
    sound.fade(0,1,1000);
  }

  const stop = () => {
    sound.fade(1,0,1000);
    setTimeout(() => {
      sound.stop();
    }, 1000)
  }

  useEffect(() => {
    setSound(new Howl({
      src: '/sounds/white-noise-long.mp3',
      preload: true,
      valume: 0,
      autoplay: false,
      onload: () => setLoaded(true),
      onplay: () => setPlaying(true),
      onstop: () => setPlaying(false),
    }))
  }, [])

  return {loaded: loaded, playing: playing, play: play, stop: stop, audio: sound}
}