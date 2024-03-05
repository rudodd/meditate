import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useAttentionToBreath() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    sound.volume(0.55);
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
      src: '/sounds/turn-attention-to-breath.mp3',
      preload: true,
      volume: 0.55,
      rate: 1.1,
      autoplay: false,
      onload: () => setLoaded(true),
      onplay: () => setPlaying(true),
      onstop: () => setPlaying(false),
    }))
  }, [])

  return {loaded: loaded, playing: playing, play: play, stop: stop, pause: pause, audio: sound}
}