import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useSingingBowl() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const play = () => {
    if (!paused) {
      sound.fade(0,1,2000);
    }
    sound.play();
  }

  const stop = () => {
    sound.fade(1,0,5000);
    setTimeout(() => {
      sound.stop();
    }, 5000)
  }

  const pause = () => {
    sound.pause();
  }

  useEffect(() => {
    setSound(new Howl({
      src: '/sounds/singing-bowl.mp3',
      preload: true,
      volume: 1,
      autoplay: false,
      loop: true,
      onload: () => setLoaded(true),
      onplay: () => {setPlaying(true), setPaused(false)},
      onstop: () => setPlaying(false),
      onpause: () => setPaused(true)
    }))
  }, [])

  return { loaded, playing, paused, play, stop, pause, audio: sound }
}