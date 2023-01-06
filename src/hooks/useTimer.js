import { useState, useEffect, useCallback } from 'react';

const stopwatchUnit = 1000;

export const countingStatusMap = {
  counting: 'counting',
  pause: 'pause',
  stop: 'stop',
};

const useTimer = (callback, time, countingStatus) => {
  const [duration, setDuration] = useState(0);
  const [counting, setCounting] = useState(
    countingStatus === countingStatusMap.counting,
  );

  const resetDuration = useCallback(() => {
    setDuration(0);
  }, []);

  // connection between caller and callee
  useEffect(() => {
    if (countingStatus === countingStatusMap.counting) {
      setCounting(true);
      return;
    }

    if (countingStatus === countingStatusMap.stop) {
      setCounting(false);
      resetDuration();
      return;
    }

    if (countingStatus === countingStatusMap.pause) {
      setCounting(false);
      return;
    }
  }, [countingStatus, resetDuration]);

  // trigger timer
  useEffect(() => {
    if (!counting) {
      return;
    }

    const stopwatch = setInterval(() => {
      setDuration(dur => {
        const nextDur = dur + stopwatchUnit;

        return nextDur > time ? time : nextDur;
      });
    }, stopwatchUnit);

    return () => {
      clearInterval(stopwatch);
    };
  }, [time, counting]);

  // for timing to fire the callback
  useEffect(() => {
    if (duration >= time) {
      setCounting(false);
      callback();
    }
  }, [callback, time, duration]);

  return { duration };
};

export default useTimer;
