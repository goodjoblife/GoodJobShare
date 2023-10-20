import { useMemo } from 'react';
import {
  salaryType as salaryTypeValidator,
  salaryAmount as salaryAmountValidator,
  experienceInYear as experienceInYearValidator,
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
  const { salaryType, salaryAmount, experienceInYear } = form;

  const isSalaryTypeValid = salaryTypeValidator(salaryType);
  const isSalaryAmountValid = salaryAmountValidator(salaryAmount);
  const isSalaryValid = isSalaryTypeValid && isSalaryAmountValid;
  const isSalarySetWarning = submitted && !isSalaryValid;

  const isExperienceInYearValid = experienceInYearValidator(experienceInYear);
  const isExperienceInYearWarning = submitted && !isExperienceInYearValid;

  return useMemo(() => {
    const validationStatus = {};

    // Compute check status of salary info
    validationStatus.salary = {
      isValid: isSalaryValid,
      shouldSetWarning: isSalarySetWarning,
    };

    validationStatus.experienceInYear = {
      isValid: isExperienceInYearValid,
      shouldSetWarning: isExperienceInYearWarning,
    };

    // Compute check status of time info
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
  }, [
    form,
    isExperienceInYearValid,
    isExperienceInYearWarning,
    isSalarySetWarning,
    isSalaryValid,
    submitted,
  ]);
};

export default useValidationStatus;
