import { useMemo, useCallback } from 'react';
import {
  salaryType as salaryTypeValidator,
  salaryAmount as salaryAmountValidator,
  experienceInYear as experienceInYearValidator,
  dayPromisedWorkTime,
  dayRealWorkTime,
  weekWorkTime,
  overtimeFrequency,
} from './formCheck';
import {
  VALID,
  INVALID,
  SALARY_TYPE,
  SALARY_AMOUNT,
  EXPERIENCE_IN_YEAR,
} from 'constants/formElements';

const formatWorkTimeHour = hours => `${hours} 小時`;
const validOrFormat = valid => format => value => {
  if (!value) return null;
  if (valid) return null;

  // We return (formatted) value only when the value is present and invalid
  return format ? format(value) : value;
};

const useValidationStatus = (
  form,
  { submitted, changeExtElValidationStatus },
) => {
  const { salaryType, salaryAmount, experienceInYear } = form;

  const changeSalaryTypeStatus = useCallback(
    val => {
      changeExtElValidationStatus(
        SALARY_TYPE,
        salaryTypeValidator(val) ? VALID : INVALID,
      );
    },
    [changeExtElValidationStatus],
  );
  const changeSalaryAmountStatus = useCallback(
    val => {
      changeExtElValidationStatus(
        SALARY_AMOUNT,
        salaryAmountValidator(val) ? VALID : INVALID,
      );
    },
    [changeExtElValidationStatus],
  );
  const changeExperienceInYearStatus = useCallback(
    val => {
      changeExtElValidationStatus(
        EXPERIENCE_IN_YEAR,
        experienceInYearValidator(val) ? VALID : INVALID,
      );
    },
    [changeExtElValidationStatus],
  );

  changeSalaryTypeStatus(salaryType);
  changeSalaryAmountStatus(salaryAmount);
  changeExperienceInYearStatus(experienceInYear);

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
