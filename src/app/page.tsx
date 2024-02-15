"use client"
import { useState, useEffect } from 'react';

// @ts-ignore
import {Howl, Howler} from 'howler';
import useWhiteNoise from './hooks/whiteNoise';
import { AudioFile } from './types';

export default function Home() {
  const [state, setState] = useState(false)
  const whiteNoise: AudioFile = useWhiteNoise();

  useEffect(() => {
    if (whiteNoise.loaded) {
      console.log('sound loaded: ', whiteNoise.loaded)
      setTimeout(() => {
        setState(true);
      }, 5000)
    }
    console.log(whiteNoise.playing);
  }, [whiteNoise])

  return (
    <main>
      <h1>Meditate</h1>
      <h6>{state.toString()}</h6>
      <button onClick={() => whiteNoise.play()}>Play</button>
      <button onClick={() => whiteNoise.stop()}>Stop</button>
    </main>
  );
}
