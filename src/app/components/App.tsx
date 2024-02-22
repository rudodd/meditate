// import library functionality
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

// import custom functionality
import useTimer from '../hooks/timer';
import useMeditationRoutine from '../hooks/meditationRoutine';
import useSettings from '../hooks/useSettings';
import { Timer, SessionStatus } from '../types';

// import components
import Header from './Header';

export default function App() {
  const { data, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timer: Timer = useTimer(isActive, isPaused);
  const settings = useSettings(data, status);
  const routine = useMeditationRoutine({settings, isActive, isPaused, timer});

  const playRoutine = () => {
    setIsActive(true);
  }

  const stopRoutine = () => {

  }

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(loadingTimeout);
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <main>
      <Header user={data?.user} />
      {loading || status === SessionStatus.Loading ? (
        <h2>Loading.</h2>
      ) : status === SessionStatus.LoggedOut ? (
        <button onClick={() => signIn('google')}>sign in with gooogle</button>
      ) : (
        <>
          <button onClick={() => signOut()}>sign out</button>
          <p>{timer.time}</p>
          <button onClick={() => playRoutine()}>Play</button>
          <button onClick={() => stopRoutine()}>Stop</button>
        </>
      )}
    </main>
  )
}