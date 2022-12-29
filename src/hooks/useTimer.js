import { useState, useEffect, useCallback } from 'react';

const stopwatchUnit = 1000;

const useTimer = (callback, time, counting, repeat = false) => {
  const [duration, setDuration] = useState(0);

  const setTimerFunc = repeat ? setInterval : setTimeout;
  const clearTimerFunc = repeat ? clearInterval : clearTimeout;

  const resetDuration = useCallback(() => {
    setDuration(0);
  }, []);

  useEffect(() => {
    if (duration >= time) {
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
  }, [duration, time]);

  useEffect(() => {
    if (!counting) {
      return;
    }

    resetDuration();
    const timerId = setTimerFunc(callback, time);

    return () => clearTimerFunc(timerId);
  }, [setTimerFunc, clearTimerFunc, callback, resetDuration, time, counting]);

  return { duration };
};

export default useTimer;
