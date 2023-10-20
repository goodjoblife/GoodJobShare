import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Element as ScrollElement } from 'react-scroll';
import Coin2 from 'common/icons/Coin2';
import { P } from 'common/base';
import TextInput from 'common/form/TextInput';
import Select from 'common/form/Select';
import InputTitle from '../common/InputTitle';

import {
  salaryTypeOptions,
  experienceInYearOptions2,
} from '../common/optionMap';

import styles from './TimeSalaryForm.module.css';
import Hint from './Hint';

const SalaryInfo = ({
  hint,
  showWarning,
  handleState,
  salaryType,
  salaryAmount,
  experienceInYear,
  validationStatus,
}) => {
  const isSalarySetWarning = validationStatus.salary.shouldSetWarning;

  const isExperienceInYearWarning =
    validationStatus.experienceInYear.shouldSetWarning;

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
              <ScrollElement name="salaryType" />
              <Select
                value={salaryType}
                options={salaryTypeOptions}
                onChange={e => {
                  return handleState('salaryType')(e.target.value);
                }}
              />
              <div style={{ width: '15px' }} />
              <div>
                <div className={styles.inputUnit}>
                  <ScrollElement name="salaryAmount" />
                  <TextInput
                    value={salaryAmount}
                    placeholder="22000"
                    onChange={e => {
                      return handleState('salaryAmount')(e.target.value);
                    }}
                  />
                  <span className={styles.unit}> 元</span>
                </div>
                <Hint hint={hint} showWarning={showWarning} />
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
              <ScrollElement name="experienceInYear" />
              <Select
                value={experienceInYear}
                options={experienceInYearOptions2}
                onChange={e => {
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
