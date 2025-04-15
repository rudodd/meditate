import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useWarmUp() {
  const [sound, setSound] = useState<any>(null)
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const play = () => {
    sound.volume(0.7);
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
      src: '/sounds/stretch-intro.mp3',
      preload: true,
      volume: 1,
      rate: 1.1,
      autoplay: false,
      onload: () => setLoaded(true),
      onplay: () => {setPlaying(true), setPaused(false)},
      onstop: () => setPlaying(false),
      onpause: () => setPaused(true)
    }))
  }, [])

  return { loaded, playing, paused, play, stop, pause, audio: sound }
}