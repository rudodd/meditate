import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useWhiteNoise() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const play = () => {
    if (!paused) {
      sound.fade(0,1,2000);
    }
    sound.play();
  }

  const stop = () => {
    sound.fade(1,0,10000);
    setTimeout(() => {
      sound.stop();
    }, 10000)
  }

  const pause = () => {
    sound.pause();
  }

  useEffect(() => {
    setSound(new Howl({
      src: '/sounds/white-noise-long.mp3',
      preload: true,
      volume: 1,
      autoplay: false,
      html5: true,
      onload: () => setLoaded(true),
      onplay: () => {setPlaying(true), setPaused(false)},
      onstop: () => setPlaying(false),
      onpause: () => setPaused(true)
    }))
  }, [])

  return { loaded, playing, paused, play, stop, pause, audio: sound }
}