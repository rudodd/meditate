import { useState, useEffect } from 'react';

import useWarmUp from './warmUp';
import useWhiteNoise from './whiteNoise';

import { RoutineSettings, AudioFile, Timer } from '../types';

import { time } from '../helpers';
import useGetComfortable from './getComfortable';

interface RoutineProps {
  settings: RoutineSettings;
  isActive: boolean;
  isPaused :boolean;
  timer: Timer;
}

export default function useMeditationRoutine(props: RoutineProps) {
  const { settings, isActive, isPaused, timer } = props;
  const whiteNoise: AudioFile = useWhiteNoise();
  const warmUp: AudioFile = useWarmUp();
  const getComfortable = useGetComfortable();

  useEffect(() => {
    console.log(timer.time)

    if (isActive && !isPaused) {

      // white noise triggers
      if (settings.whiteNoise === 'white-noise' && timer.time === 0) {
        whiteNoise.play();
      }

      // warm up triggers
      if (settings.warmUp) {
        
        // full-guided
        if (settings.guided === 'full') {
          if (timer.time === 10) {
            warmUp.play();
          }
          if (timer.time === (time.minToSec(settings.warmUpLength) - 15)) {
            getComfortable.play();
          }

        // semi-guided
        } else if (settings.guided === 'semi') {
          if (timer.time === (time.minToSec(settings.warmUpLength) - 15)) {
            getComfortable.play();
          }
        }
        
      }
    }
  }, [isActive, isPaused, timer])

  return {something: true}
}