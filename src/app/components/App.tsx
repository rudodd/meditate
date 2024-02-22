import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

import useTimer from '../hooks/timer';
import useMeditationRoutine from '../hooks/meditationRoutine';
import Login from './Login';

import { Timer } from '../types';
import useSettings from '../hooks/useSettings';

export default function App() {
  const session = useSession();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timer: Timer = useTimer(isActive, isPaused);
  const settings = useSettings(session?.data, session?.status);
  const routine = useMeditationRoutine({settings, isActive, isPaused, timer});

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
      <Login />
    </main>
  )
}