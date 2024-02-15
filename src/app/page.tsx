"use client"
import { useState, useEffect } from 'react';

// @ts-ignore
import {Howl, Howler} from 'howler';
import useWhiteNoise from './hooks/whiteNoise';
import { AudioFile } from './types';
import useWarmUp from './hooks/warmUp';
import { time } from './helpers';
import useTimer from './hooks/timer';

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useTimer(isActive, isPaused);
  const whiteNoise: AudioFile = useWhiteNoise();
  const warmUp: AudioFile = useWarmUp();

  const playRoutine = () => {
    setIsActive(true);
    whiteNoise.play();
    setTimeout(() => {
      warmUp.play();
    }, time.seconds(3))
  }

  return (
    <main>
      <h1>Meditate</h1>
      <p>{timer.time}</p>
      <button onClick={() => playRoutine()}>Play</button>
      <button onClick={() => whiteNoise.stop()}>Stop</button>
    </main>
  );
}
