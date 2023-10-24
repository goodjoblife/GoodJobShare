import { useMemo } from 'react';
import {
  company,
  jobTitle,
  employmentType,
  salaryType,
  salaryAmount,
  experienceInYear,
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

const useValidationStatus = (form, { submitted }) => {
  return useMemo(() => {
    const validationStatus = {};

    const checks = {
      company,
      jobTitle,
      employmentType,
      salaryType,
      salaryAmount,
      experienceInYear,
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

    // Compounded check status for salary
    const isSalaryValid =
      validationStatus.salaryType.isValid &&
      validationStatus.salaryAmount.isValid;

    validationStatus.salary = {
      isValid: isSalaryValid,
      shouldSetWarning: submitted && !isSalaryValid,
    };

    return validationStatus;
  }, [form, submitted]);
};

export default useValidationStatus;
