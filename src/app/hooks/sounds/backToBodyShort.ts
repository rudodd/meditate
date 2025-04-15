import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useBackToBodyShort() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const play = () => {
    sound.volume(0.6);
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
      src: '/sounds/back-to-body-short.mp3',
      preload: true,
      volume: 0.6,
      autoplay: false,
      rate: 1.1,
      onload: () => setLoaded(true),
      onplay: () => {setPlaying(true), setPaused(false)},
      onstop: () => setPlaying(false),
      onpause: () => setPaused(true)
    }))
  }, [])

  return { loaded, playing, paused, play, stop, pause, audio: sound }
}