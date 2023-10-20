import { useMemo } from 'react';
import {
  company,
  jobTitle,
  employmentType,
  salaryType as salaryTypeValidator,
  salaryAmount as salaryAmountValidator,
  experienceInYear as experienceInYearValidator,
  dayPromisedWorkTime,
  dayRealWorkTime,
  weekWorkTime,
  overtimeFrequency,
} from './formCheck';
import { VALID, INVALID } from 'constants/formElements';

const formatWorkTimeHour = hours => `${hours} 小時`;
const validOrFormat = valid => format => value => {
  if (!value) return null;
  if (valid) return null;

  // We return (formatted) value only when the value is present and invalid
  return format ? format(value) : value;
};

const useValidationStatus = (
  form,
  { submitted, changeBasicElValidationStatus },
) => {
  // Basic check

  const basicElementNames = ['company', 'jobTitle', 'employmentType'];
  const basicValidates = {
    company,
    jobTitle,
    employmentType,
  };

  basicElementNames.forEach(elementName => {
    const value = form[elementName];
    const validate = basicValidates[elementName];
    const isValid = validate(value);
    changeBasicElValidationStatus(elementName, isValid ? VALID : INVALID);
  });

  // Salary check

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
      ...basicValidates,
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
    basicValidates,
    form,
    isExperienceInYearValid,
    isExperienceInYearWarning,
    isSalarySetWarning,
    isSalaryValid,
    submitted,
  ]);
};

export default useValidationStatus;
