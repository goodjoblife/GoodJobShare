import { useState, useEffect, useCallback } from 'react';

const stopwatchUnit = 1000;

const useTimer = (callback, time, counting) => {
  const [duration, setDuration] = useState(0);

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
    const timerId = setTimeout(callback, time);

    return () => clearTimeout(timerId);
  }, [callback, resetDuration, time, counting]);

  return { duration };
};

export default useTimer;
