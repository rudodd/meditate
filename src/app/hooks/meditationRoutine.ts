import { useState, useEffect } from 'react';
// @ts-ignore
import { Howler } from 'howler';

import { RoutineSettings, AudioFile, Timer } from '../types';
import { time } from '../helpers';

// import audio hooks
import useWarmUp from './sounds/warmUp';
import useWhiteNoise from './sounds/whiteNoise';
import useChime from './sounds/chime';
import useGetComfortable from './sounds/getComfortable';
import useAttentionToBreath from './sounds/attentionToBreath';
import useLastBreath from './sounds/lastBreath';
import useBeginBody from './sounds/beginBody';
import useBodyScanLong from './sounds/bodyScanLong';
import useBodyScanShort from './sounds/bodyScanShort';
import useMoodLong from './sounds/moodLong';
import useMoodShort from './sounds/moodShort';
import useBeginBreath from './sounds/beginBreath';
import useNoticeBreath from './sounds/noticeBreath';
import useMindfullness from './sounds/useMindfullness';
import useBackToBreath from './sounds/backToBreath';
import useLetGo from './sounds/letGo';
import useBackToBodyLong from './sounds/backToBodyLong';
import useBackToBodyShort from './sounds/backToBodyShort';
import useMantra from './sounds/mantra';
import useEnd from './sounds/end';
import useSingingBowl from './sounds/singingBowl';
import useStillnessOne from './sounds/visualizations/stillnessOne';
import useStillnessTwo from './sounds/visualizations/stillnessTwo';

interface RoutineProps {
  settings: RoutineSettings | undefined;
  isActive: boolean;
  isPaused :boolean;
  timer: Timer;
}

export default function useMeditationRoutine(props: RoutineProps) {
  Howler.volume(9);
  const { settings, isActive, isPaused, timer } = props;
  const whiteNoise: AudioFile = useWhiteNoise();
  const warmUp: AudioFile = useWarmUp();
  const getComfortable: AudioFile = useGetComfortable();
  const chime: AudioFile = useChime();
  const breathAttention: AudioFile = useAttentionToBreath();
  const lastBreath: AudioFile = useLastBreath();
  const beginBody: AudioFile = useBeginBody();
  const bodyScanLong: AudioFile = useBodyScanLong();
  const bodyScanShort: AudioFile = useBodyScanShort();
  const moodLong: AudioFile = useMoodLong();
  const moodShort: AudioFile = useMoodShort();
  const beginBreath: AudioFile = useBeginBreath();
  const noticeBreath: AudioFile = useNoticeBreath();
  const mindfullNess: AudioFile = useMindfullness();
  const backToBreath: AudioFile = useBackToBreath();
  const letGo: AudioFile = useLetGo();
  const backToBodyLong: AudioFile = useBackToBodyLong();
  const backToBodyShort: AudioFile = useBackToBodyShort();
  const mantra: AudioFile = useMantra();
  const end: AudioFile = useEnd();
  const singingBowl: AudioFile = useSingingBowl();
  const stillnessOne: AudioFile = useStillnessOne();
  const stillnessTwo: AudioFile = useStillnessTwo();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [playProgress, setPlayProgress] = useState(0);
  const soundDependencies = [
    whiteNoise,
    warmUp,
    getComfortable,
    chime,
    breathAttention,
    lastBreath,
    beginBody,
    bodyScanLong,
    bodyScanShort,
    moodLong,
    moodShort,
    beginBreath,
    noticeBreath,
    mindfullNess,
    backToBreath,
    letGo,
    backToBodyLong,
    backToBodyShort,
    mantra,
    end,
    singingBowl,
    stillnessOne,
    stillnessTwo,
  ];

  const trigger = (play: boolean, sound: AudioFile, time: number = 0, guideLevel: string[] = []) => {
    if (timer.time === time) {
      if (guideLevel.length) {
        if (settings?.guided && guideLevel.includes(settings?.guided)) {
          if (play) {
            sound.play();
          } else {
            sound.stop();
          }
        }
      } else {
        if (play) {
          sound.play();
        } else {
          sound.stop();
        }
      }
    }
  }

  const stop = () => {
    Howler.stop();
  }

  useEffect(() => {
    if (loadingProgress < 100) {
      const numOfSounds = soundDependencies.length;
      const loadedSounds = [];
      soundDependencies.forEach((sound) => {
        if (sound.loaded) {
          loadedSounds.push(sound)
        }
      })
      const numLoadedSounds = loadedSounds.length;
      const progress = (numLoadedSounds / numOfSounds) * 100;
      setLoadingProgress(progress);
    }
  }, [...soundDependencies]);

  useEffect(() => {
    if (settings) {
      const beginTime = settings.warmUp ? time.minToSec(settings.warmUpLength) : 5;
      const bodyScanTime = beginTime + 25;
      const mindfullnessTime = bodyScanTime + 70;
      const halfWayTime = Math.round((time.minToSec(settings.length) - mindfullnessTime - time.minToSec(1.5)) / 2) + mindfullnessTime;
      const visualizationTime = beginTime + time.minToSec(settings.length);
      const finalChimeTime = settings.visualization !== null ? visualizationTime + time.minToSec(3) : beginTime + time.minToSec(settings.length) + 15;
      const windDownChimeTime = finalChimeTime - time.minToSec(1.5);
      const totalLength = finalChimeTime + 21;
      setPlayProgress((timer.time / totalLength) * 100)
  
      if (isActive && !isPaused) {
  
        // chime triggers
        // - three chimes to begin and to end
        trigger(true, chime, beginTime);
        trigger(true, chime, beginTime + 7);
        trigger(true, chime, beginTime + 14);
        trigger(true, chime, finalChimeTime);
        trigger(true, chime, finalChimeTime + 7);
        trigger(true, chime, finalChimeTime + 14);
  
        // - two chimes to signal the wind down
        trigger(true, chime, windDownChimeTime);
        trigger(true, chime, windDownChimeTime + 7);
  
        // - one chime at half way through mindfullness section
        if (settings.length > 5) {
          trigger(true, chime, halfWayTime);
        }
  
        // white noise triggers
        if (settings.whiteNoise === 'white-noise') {
          trigger(true, whiteNoise, 0);
          trigger(false, whiteNoise, finalChimeTime + 10);
        }
  
        // warm up triggers
        if (settings.warmUp) {
  
          // singing bowl triggers
          trigger(true, singingBowl, 2);
          trigger(false, singingBowl, time.minToSec(settings.warmUpLength) - 5)
          
          // warm up guides
          if (beginTime > 30) { trigger(true, warmUp, 5, ['full']) };
          trigger(true, getComfortable, (beginTime - 15), ['full', 'semi']);
          trigger(true, breathAttention, (beginTime - 10), ['full']);
          trigger(true, lastBreath, (beginTime + 14), ['full']);
        }
  
        // body / mood scan triggers
        trigger(true, beginBody, bodyScanTime, ['full', 'semi']);
        trigger(true, bodyScanLong, (bodyScanTime + 20), ['full']);
        trigger(true, bodyScanShort, (bodyScanTime + 20), ['semi']);
        trigger(true, moodLong, (bodyScanTime + 40), ['full']);
        trigger(true, moodShort, (bodyScanTime + 40), ['semi']);
  
        // breath triggers
        trigger(true, beginBreath, mindfullnessTime, ['full', 'semi']);
        trigger(true, noticeBreath, (mindfullnessTime + 10), ['full']);
        trigger(true, mindfullNess, (mindfullnessTime + 35), ['full']);
        if (settings.length > 5) {
          const reminderInterval = Math.round(time.minToSec((settings.length - 3.5) / 4));
          trigger(true, backToBreath, (halfWayTime - reminderInterval + 30), ['full']);
          trigger(true, backToBreath, (halfWayTime + reminderInterval), ['full']);
        }
  
        // wind down triggers
        trigger(true, letGo, (windDownChimeTime + 12), ['full', 'semi']);
        trigger(true, backToBodyLong, (windDownChimeTime + 45), ['full']);
        trigger(true, backToBodyShort, (windDownChimeTime + 45), ['semi']);
        trigger(true, mantra, (windDownChimeTime + 60), ['full']);
        trigger(true, end, (finalChimeTime - 13), ['full', 'semi']);

  
        // stillness visualization
        if (settings.visualization !== null) {

          // singing bowl triggers
          trigger(true, singingBowl, (visualizationTime - 10));
          trigger(false, singingBowl, (visualizationTime + 85));

          // stillness visualization triggers
          if (settings.visualization === 'stillness') {
            trigger(true, stillnessOne, visualizationTime);
            trigger(true, chime, (visualizationTime + 32));
            trigger(true, stillnessTwo, (visualizationTime + 50));
          }
        }
      }
    }
  }, [timer])

  useEffect(() => {
    // Howler.pause();
  }, [isPaused])

  return {loadingProgress: loadingProgress, playProgress: playProgress, stop: stop}
}