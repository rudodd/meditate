import { useState, useEffect } from 'react';
import { time } from '../helpers';

export default function useTimer(isActive: boolean, isPaused: boolean) {
  const [timer, setTimer] = useState<number>(0);

  const timerReset = () => {
      setTimer(0);
  };

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval> | undefined;
    if (isActive && !isPaused) {
      timerInterval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, time.seconds(1));
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isActive, isPaused]);

  return {time: timer, reset: timerReset}
}