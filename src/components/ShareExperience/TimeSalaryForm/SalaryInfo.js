import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Element as ScrollElement } from 'react-scroll';
import Coin2 from 'common/icons/Coin2';
import { P } from 'common/base';
import TextInput from 'common/form/TextInput';
import Select from 'common/form/Select';
import {
  salaryType as salaryTypeValidator,
  salaryAmount as salaryAmountValidator,
  experienceInYear as experienceInYearValidator,
} from './formCheck';
import InputTitle from '../common/InputTitle';

import {
  salaryTypeOptions,
  experienceInYearOptions2,
} from '../common/optionMap';

import {
  VALID,
  INVALID,
  SALARY_TYPE,
  SALARY_AMOUNT,
  EXPERIENCE_IN_YEAR,
} from 'constants/formElements';

import styles from './TimeSalaryForm.module.css';

const SalaryInfo = ({
  hint,
  showWarning,
  handleState,
  salaryType,
  salaryAmount,
  experienceInYear,
  submitted,
  changeValidationStatus,
}) => {
  const renderHint = useCallback(() => {
    if (hint === null) {
      return null;
    } else if (showWarning) {
      return (
        <div className={cn([styles.warning__wording, styles.salaryHint])}>
          {hint}
          ，確定嗎？
        </div>
      );
    }
    return <div className={cn(styles.salaryHint)}>{hint}</div>;
  }, [hint, showWarning]);

  const changeSalaryTypeStatus = useCallback(
    val => {
      changeValidationStatus(
        SALARY_TYPE,
        salaryTypeValidator(val) ? VALID : INVALID,
      );
    },
    [changeValidationStatus],
  );
  const changeSalaryAmountStatus = useCallback(
    val => {
      changeValidationStatus(
        SALARY_AMOUNT,
        salaryAmountValidator(val) ? VALID : INVALID,
      );
    },
    [changeValidationStatus],
  );
  const changeExperienceInYearStatus = useCallback(
    val => {
      changeValidationStatus(
        EXPERIENCE_IN_YEAR,
        experienceInYearValidator(val) ? VALID : INVALID,
      );
    },
    [changeValidationStatus],
  );

  const isSalaryTypeValid = salaryTypeValidator(salaryType);
  const isSalaryAmountValid = salaryAmountValidator(salaryAmount);
  const isSalarySetWarning =
    submitted && (!isSalaryTypeValid || !isSalaryAmountValid);

  const isExperienceInYearValid = experienceInYearValidator(experienceInYear);
  const isExperienceInYearWarning = submitted && !isExperienceInYearValid;

  changeSalaryTypeStatus(salaryType);
  changeSalaryAmountStatus(salaryAmount);
  changeExperienceInYearStatus(experienceInYear);

  return (
    <section className={styles.formSectionSalary}>
      <div className={styles.iconLineDivider}>
        <Coin2 />
      </div>
      <div className={styles.formSection}>
        <div className={styles.formGroupTwo}>
          <div className={styles.formGroup}>
            <InputTitle text="薪資" must />
            <div
              className={cn({
                [styles.formSalaryGroup]: true,
                [styles.warning]: isSalarySetWarning,
              })}
            >
              <ScrollElement name={SALARY_TYPE} />
              <Select
                value={salaryType}
                options={salaryTypeOptions}
                onChange={e => {
                  changeSalaryTypeStatus(e.target.value);
                  return handleState('salaryType')(e.target.value);
                }}
              />
              <div style={{ width: '15px' }} />
              <div>
                <div className={styles.inputUnit}>
                  <ScrollElement name={SALARY_AMOUNT} />
                  <TextInput
                    value={salaryAmount}
                    placeholder="22000"
                    onChange={e => {
                      changeSalaryAmountStatus(e.target.value);
                      return handleState('salaryAmount')(e.target.value);
                    }}
                  />
                  <span className={styles.unit}> 元</span>
                </div>
                {renderHint()}
              </div>
            </div>
            {isSalarySetWarning && (
              <div>
                <p
                  className={`pS ${styles.warning__wording}`}
                  style={{ textAlign: 'left', margin: '10px 0 0 0' }}
                >
                  薪資(或下方的工時)需擇一填寫
                </p>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <InputTitle text="當時業界工作經歷" must />
            <div
              className={cn({
                [styles.warning]: isExperienceInYearWarning,
              })}
            >
              <ScrollElement name={EXPERIENCE_IN_YEAR} />
              <Select
                value={experienceInYear}
                options={experienceInYearOptions2}
                onChange={e => {
                  changeExperienceInYearStatus(e.target.value);
                  return handleState('experienceInYear')(e.target.value);
                }}
              />
            </div>
            {!isSalarySetWarning && isExperienceInYearWarning && (
              <div>
                <p
                  className={`pS ${styles.warning__wording}`}
                  style={{ textAlign: 'left', margin: '10px 0 0 0' }}
                >
                  需填寫當時業界工作經歷
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formInfo}>
          <P size="s">
            薪資請以包含平常的
            <strong>薪資、分紅、年終、績效獎金</strong>
            等實質上獲得的價值去計算。
          </P>
        </div>
      </div>
    </section>
  );
};

SalaryInfo.propTypes = {
  handleState: PropTypes.func,
  salaryType: PropTypes.string,
  salaryAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  experienceInYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
  showWarning: PropTypes.bool,
  hint: PropTypes.string,
};

SalaryInfo.defaultProps = {
  showWarning: false,
  hint: null,
};

export default SalaryInfo;
