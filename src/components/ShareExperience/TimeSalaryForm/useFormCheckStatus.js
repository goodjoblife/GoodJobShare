import { useMemo } from 'react';
import {
  dayPromisedWorkTime as checkDayPromisedWorkTime,
  dayRealWorkTime as checkDayRealWorkTime,
  weekWorkTime as checkWeekWorkTime,
} from './formCheck';

const formatWorkTimeHour = hours => `${hours} 小時`;
const validOrFormat = valid => format => value =>
  value && !valid ? format(value) : null;

const useFormCheckStatus = (form, submitted) => {
  return useMemo(() => {
    const checks = {
      dayPromisedWorkTime: checkDayPromisedWorkTime,
      dayRealWorkTime: checkDayRealWorkTime,
      weekWorkTime: checkWeekWorkTime,
    };

    const formats = {
      dayPromisedWorkTime: formatWorkTimeHour,
      dayRealWorkTime: formatWorkTimeHour,
      weekWorkTime: formatWorkTimeHour,
    };

    const checkStatus = {};
    for (const key in checks) {
      const value = form[key];
      const check = checks[key];
      const format = formats[key];

      const isValid = check(value);
      const hint = validOrFormat(isValid)(format)(value);
      const shouldSetWarning = submitted && !isValid;

      checkStatus[key] = {
        isValid,
        hint,
        shouldSetWarning,
      };
    }

    return checkStatus;
  }, [form, submitted]);
};

export default useFormCheckStatus;
