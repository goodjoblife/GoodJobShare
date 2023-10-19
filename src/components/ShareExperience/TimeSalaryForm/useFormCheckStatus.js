import { useMemo } from 'react';
import {
  dayPromisedWorkTime,
  dayRealWorkTime,
  weekWorkTime,
  overtimeFrequency,
} from './formCheck';

const formatWorkTimeHour = hours => `${hours} 小時`;
const validOrFormat = valid => format => value => {
  if (!value) return null;
  if (valid) return null;

  // We return (formatted) value only when the value is present and invalid
  return format ? format(value) : value;
};

const useFormCheckStatus = (form, submitted) => {
  return useMemo(() => {
    const checks = {
      dayPromisedWorkTime,
      dayRealWorkTime,
      weekWorkTime,
      overtimeFrequency,
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
