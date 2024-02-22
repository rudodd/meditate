import { useState, useEffect } from 'react';

import useWarmUp from './sounds/warmUp';
import useWhiteNoise from './sounds/whiteNoise';
import useChime from './sounds/chime';

import { RoutineSettings, AudioFile, Timer } from '../types';

import { time } from '../helpers';
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
  settings: RoutineSettings;
  isActive: boolean;
  isPaused :boolean;
  timer: Timer;
}

export default function useMeditationRoutine(props: RoutineProps) {
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
  const mindfulNess : AudioFile = useMindfullness();
  const backToBreath : AudioFile = useBackToBreath();
  const letGo: AudioFile = useLetGo();
  const backToBodyLong: AudioFile = useBackToBodyLong();
  const backToBodyShort: AudioFile = useBackToBodyShort();
  const mantra: AudioFile = useMantra();
  const end: AudioFile = useEnd();
  const singingBowl: AudioFile = useSingingBowl();
  const stillnessOne: AudioFile = useStillnessOne();
  const stillnessTwo: AudioFile = useStillnessTwo();

  useEffect(() => {
    const beginTime = settings.warmUp ? time.minToSec(settings.warmUpLength) : 5;
    const bodyScanTime = beginTime + 30;
    const mindfullnessTime = bodyScanTime + 70;
    const halfWayTime = Math.round((time.minToSec(settings.length) - mindfullnessTime - time.minToSec(1.5)) / 2) + mindfullnessTime;
    const visualizationTime = beginTime + time.minToSec(settings.length);
    const finalChimeTime = settings.visualization !== null ? visualizationTime + time.minToSec(3) : beginTime + time.minToSec(settings.length) + 15;
    const windDownChimeTime = finalChimeTime - time.minToSec(1.5);
    const chimeInterval = time.seconds(7);

    if (isActive && !isPaused) {

      // chime triggers
      // - three chimes
      if (timer.time === beginTime || timer.time === finalChimeTime) {
        chime.play();
        setTimeout(() => chime.play(), chimeInterval);
        setTimeout(() => chime.play(), (chimeInterval * 2));
      }

      // - two chimes
      if (timer.time === windDownChimeTime) {
        chime.play();
        setTimeout(() => chime.play(), chimeInterval);
      }

      // - one chime
      if (settings.length > 5 && timer.time === halfWayTime) {
        chime.play();
      }

      // white noise triggers
      if (settings.whiteNoise === 'white-noise' && timer.time === 0) {
        whiteNoise.play();
      }

      // warm up triggers
      if (settings.warmUp) {

        // singing bowl
        if (timer.time === 2) {
          singingBowl.play();
        }

        if (timer.time === time.minToSec(settings.warmUpLength) - 5) {
          singingBowl.stop();
        }
        
        // full-guided
        if (settings.guided === 'full') {
          if (beginTime > 30 && timer.time === 5) {
            warmUp.play();
          }
          if (timer.time === (beginTime - 15)) {
            getComfortable.play();
          }
          if (timer.time === (beginTime - 10)) {
            breathAttention.play();
          }
          if (timer.time === (beginTime + 14)) {
            lastBreath.play();
          }

        // semi-guided
        } else if (settings.guided === 'semi') {
          if (timer.time === (beginTime - 15)) {
            getComfortable.play();
          }
        }
      }

      // body / mood scan triggers
      if (timer.time === bodyScanTime && settings.guided !== null) {
        beginBody.play();
      }

      if (timer.time === bodyScanTime + 20) {
        if (settings.guided === 'full') {
          bodyScanLong.play();
        }
        if (settings.guided === 'semi') {
          bodyScanShort.play();
        }
      }

      if (timer.time === bodyScanTime + 40) {
        if (settings.guided === 'full') {
          moodLong.play();
        }
        if (settings.guided === 'semi') {
          moodShort.play();
        }
      }

      // breath triggers
      if (timer.time === mindfullnessTime && settings.guided !== null) {
        beginBreath.play();
      }

      if (timer.time === mindfullnessTime + 10 && settings.guided === 'full') {
        noticeBreath.play();
      }

      // mindfullness triggers
      if (settings.guided === 'full') {
        if (timer.time === mindfullnessTime + 35) {
          mindfulNess.play();
        }

        if (settings.length > 5) {
          const reminderInterval = Math.round(time.minToSec((settings.length - 3.5) / 4));
          if (timer.time === (halfWayTime - reminderInterval + 30) || timer.time === (halfWayTime + reminderInterval)) {
            backToBreath.play();
          }
        }
      }

      // wind down triggers
      if (timer.time === windDownChimeTime + 12 && settings.guided != null) {
        letGo.play();
      }

      if (settings.guided === 'full') {
        if (timer.time === windDownChimeTime + 45) {
          backToBodyLong.play();
        }
        if (timer.time === windDownChimeTime + 60) {
          mantra.play();
        }
      }

      if (timer.time === windDownChimeTime + 45 && settings.guided === 'semi') {
        backToBodyShort.play();
      }

      if (timer.time === finalChimeTime - 13 && settings.guided != null) {
        end.play();
      }

      if (settings.whiteNoise != null && timer.time === finalChimeTime + 10) {
        whiteNoise.stop();
      }

      // stillness visualization
      if (settings.visualization === 'stillness') {

        if (timer.time === visualizationTime - 10) {
          singingBowl.play();
        }

        if (timer.time === visualizationTime) {
          stillnessOne.play();
        }

        if (timer.time === visualizationTime + 32) {
          chime.play();
        }

        if (timer.time === visualizationTime + 50) {
          stillnessTwo.play();
        }

        if (timer.time === visualizationTime + 85) {
          singingBowl.stop();
        }
      }
    }
  }, [isActive, isPaused, timer])

  return {something: true}
}