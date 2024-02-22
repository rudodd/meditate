"use client"
import { useState, useEffect } from 'react';

// @ts-ignore
import {Howl, Howler} from 'howler';
import useWhiteNoise from './hooks/sounds/whiteNoise';
import { AudioFile, RoutineSettings, Timer } from './types';
import useWarmUp from './hooks/sounds/warmUp';
import { time } from './helpers';
import useTimer from './hooks/timer';
import useMeditationRoutine from './hooks/meditationRoutine';

const defaultRoutine: RoutineSettings = {
  warmUp: false,
  warmUpLength: 1,
  whiteNoise: 'white-noise',
  length: 5,
  guided: 'full',
  // guided: 'semi',
  secondaryQueue: 'music',
  visualization: 'stillness',
  // visualization: null,
}

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timer: Timer = useTimer(isActive, isPaused);
  const [settings, setSettings] = useState(defaultRoutine);
  const routine = useMeditationRoutine({settings, isActive, isPaused, timer})

  const playRoutine = () => {
    setIsActive(true);
  }

  const stopRoutine = () => {

  }

  return (
    <main>
      <h1>Meditate</h1>
      <p>{timer.time}</p>
      <button onClick={() => playRoutine()}>Play</button>
      <button onClick={() => stopRoutine()}>Stop</button>
    </main>
  );
}
