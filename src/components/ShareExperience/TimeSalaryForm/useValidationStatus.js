import { useMemo } from 'react';
import {
  dayPromisedWorkTime,
  dayRealWorkTime,
  weekWorkTime,
} from './formCheck';

const formatWorkTimeHour = hours => `${hours} 小時`;
const validOrFormat = valid => format => value =>
  value && !valid ? format(value) : null;

const useValidationStatus = (form, submitted) => {
  return useMemo(() => {
    const checks = {
      dayPromisedWorkTime,
      dayRealWorkTime,
      weekWorkTime,
    };

    const formats = {
      dayPromisedWorkTime: formatWorkTimeHour,
      dayRealWorkTime: formatWorkTimeHour,
      weekWorkTime: formatWorkTimeHour,
    };

    const validationStatus = {};
    for (const key in checks) {
      const value = form[key];
      const check = checks[key];
      const format = formats[key];

      const isValid = check(value);
      const hint = validOrFormat(isValid)(format)(value);
      const shouldSetWarning = submitted && !isValid;

      validationStatus[key] = {
        isValid,
        hint,
        shouldSetWarning,
      };
    }

    return validationStatus;
  }, [form, submitted]);
};

export default useValidationStatus;
