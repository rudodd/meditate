import { useState, useEffect } from 'react';

// @ts-ignore
import { Howl } from 'howler';

export default function useSingingBowl() {
  const [sound, setSound] = useState<any>()
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    sound.play();
    sound.fade(0,1,2000);
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
      onplay: () => setPlaying(true),
      onstop: () => setPlaying(false),
    }))
  }, [])

  return {loaded: loaded, playing: playing, play: play, stop: stop, pause: pause, audio: sound}
}