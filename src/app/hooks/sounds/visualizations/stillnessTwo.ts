import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useStillnessTwo() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    sound.play();
  }

  const stop = () => {
    sound.fade(1,0,5000);
    setTimeout(() => {
      sound.stop();
    }, 5000)
  }

  useEffect(() => {
    setSound(new Howl({
      src: '/sounds/your-mind-is-lake.mp3',
      preload: true,
      volume: 0.9,
      autoplay: false,
      onload: () => setLoaded(true),
      onplay: () => setPlaying(true),
      onstop: () => setPlaying(false),
    }))
  }, [])

  return {loaded: loaded, playing: playing, play: play, stop: stop}
}