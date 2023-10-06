import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Clock from 'common/icons/Clock';
import { P } from 'common/base';
import TextInput from 'common/form/TextInput';
import RadioButton from 'common/form/RadioButton';
import Radio from 'common/form/Radio';

import InputTitle from '../common/InputTitle';

import styles from './TimeSalaryForm.module.css';
import Hint from './Hint';
import useValidationStatus from './useValidationStatus';

const TimeInfo = ({
  handleState,
  dayPromisedWorkTime,
  dayRealWorkTime,
  weekWorkTime,
  overtimeFrequency,
  hasOvertimeSalary,
  isOvertimeSalaryLegal,
  hasCompensatoryDayoff,
  submitted,
}) => {
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);

  const validationStatus = useValidationStatus(
    {
      dayPromisedWorkTime,
      dayRealWorkTime,
      weekWorkTime,
    },
    submitted,
  );

  return (
    <section id="formSectionWorkTime">
      <div className={styles.iconLineDivider}>
        <Clock />
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroupTwo}>
          <div className={styles.formGroup}>
            <InputTitle text="工作日表訂工時" must />
            <div
              className={cn(styles.inputUnit, {
                [styles.warning]:
                  validationStatus.dayPromisedWorkTime.shouldSetWarning,
              })}
            >
              <TextInput
                value={dayPromisedWorkTime}
                placeholder="8 或 8.5"
                onChange={e =>
                  handleState('dayPromisedWorkTime')(e.target.value)
                }
              />
              <span className={styles.unit}> 小時</span>
            </div>
            <Hint
              hint={validationStatus.dayPromisedWorkTime.hint}
              showWarning
            />
          </div>
          <div className={styles.formGroup}>
            <InputTitle text="實際平均工時" must />
            <div
              className={cn(styles.inputUnit, {
                [styles.warning]:
                  validationStatus.dayRealWorkTime.shouldSetWarning,
              })}
            >
              <TextInput
                value={dayRealWorkTime}
                placeholder="10 或 10.5"
                onChange={e => handleState('dayRealWorkTime')(e.target.value)}
              />
              <span className={styles.unit}> 小時</span>
            </div>
            <Hint hint={validationStatus.dayRealWorkTime.hint} showWarning />
          </div>
        </div>
        <div className={styles.formInfo}>
          <P size="s">
            <strong>工作日</strong>
            指與雇主約定的上班日，或是排班排定的日子。
          </P>
          <P size="s">
            <strong>實際平均工時</strong>
            包含在家工作、待命的時間。
            <span
              className={styles.info}
              onClick={() => setShowInfo1(!showInfo1)}
            >
              {' '}
              我有疑問
            </span>
          </P>
          <P size="s" style={{ display: showInfo1 ? 'block' : 'none' }}>
            例如: 公司規定 9:00上班，18:00 下班，午休 1 小時。
            那麼表訂工作時間為 (18:00-9:00)-1=8 小時。
            <br />
            若實際上平均 20:00 才下班，則實際工作時間為 (20:00-9:00)-1=10 小時。
          </P>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <InputTitle text="一週總工時" must />
          <div
            className={cn(styles.inputUnit, {
              [styles.warning]: validationStatus.weekWorkTime.shouldSetWarning,
            })}
          >
            <TextInput
              value={weekWorkTime}
              placeholder="40 或 40.5"
              onChange={e => handleState('weekWorkTime')(e.target.value)}
            />
            <span className={styles.unit}> 小時</span>
          </div>
          <Hint hint={validationStatus.weekWorkTime.hint} showWarning />
        </div>
        <div className={styles.formInfo}>
          <P size="s">
            請您留下最近一週的「實際工作時數（不含休息時間，如：午休）」。
            <span
              className={styles.info}
              onClick={() => setShowInfo2(!showInfo2)}
            >
              {' '}
              我有疑問
            </span>
          </P>
          <P size="s" style={{ display: showInfo2 ? 'block' : 'none' }}>
            例如: 週一至週五工作 10 小時，週六加班 8 小時，則最近一週工時為
            10x5+8 = 58 小時。
            <br />
            若您為每月排班，您可以考慮將整個月個工時加總，除上該月天數，再乘上七估算。
          </P>
        </div>
      </div>

      <InputTitle text="加班頻率" must />
      <div className={styles.radioButton}>
        {[
          { label: '幾乎不', value: '0' },
          { label: '偶爾', value: '1' },
          { label: '經常', value: '2' },
          { label: '幾乎每天', value: '3' },
        ].map(o => (
          <RadioButton
            key={o.value}
            label={o.label}
            value={o.value}
            name="overtimeFrequency"
            emoji={`emoji${o.value}`}
            id={`overtimeFrequency-${o.value}`}
            checked={overtimeFrequency === o.value}
            onChange={e => {
              handleState('overtimeFrequency')(
                overtimeFrequency === o.value ? null : e.target.value,
              );
            }}
          />
        ))}
      </div>

      <InputTitle text="加班有無加班費" />
      <div className={styles.radioButton}>
        {[
          { label: '有', value: 'yes' },
          { label: '沒有', value: 'no' },
          { label: '不知道', value: "don't know" },
        ].map(o => (
          <RadioButton
            key={o.value}
            label={o.label}
            value={o.value}
            id={`hasOvertimeSalary-${o.value}`}
            checked={hasOvertimeSalary === o.value}
            onChange={e => {
              handleState('hasOvertimeSalary')(
                hasOvertimeSalary === o.value ? null : e.target.value,
              );
            }}
          />
        ))}
        <div style={{ clear: 'both' }} />
        {hasOvertimeSalary === 'yes' &&
          [
            { label: '有，優於或符合勞基法', value: 'yes' },
            { label: '有，不符合勞基法', value: 'no' },
            { label: '有，不清楚是否符合勞基法', value: "don't know" },
          ].map(o => (
            <Radio
              key={o.value}
              id={`isOvertimeSalaryLegal-${o.value}`}
              label={o.label}
              value={o.value}
              margin="10px 0 5px 0"
              checked={isOvertimeSalaryLegal === o.value}
              onChange={e => {
                handleState('isOvertimeSalaryLegal')(
                  isOvertimeSalaryLegal === o.value ? null : e.target.value,
                );
              }}
            />
          ))}
      </div>

      <InputTitle text="加班有無補休" />
      <div className={styles.radioButton}>
        {[
          { label: '有', value: 'yes' },
          { label: '沒有', value: 'no' },
          { label: '不知道', value: "don't know" },
        ].map(o => (
          <RadioButton
            key={o.value}
            label={o.label}
            value={o.value}
            id={`hasCompensatoryDayoff-${o.value}`}
            checked={hasCompensatoryDayoff === o.value}
            onChange={e => {
              handleState('hasCompensatoryDayoff')(
                hasCompensatoryDayoff === o.value ? null : e.target.value,
              );
            }}
          />
        ))}
      </div>
    </section>
  );
};

TimeInfo.propTypes = {
  handleState: PropTypes.func,
  dayPromisedWorkTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  dayRealWorkTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weekWorkTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overtimeFrequency: PropTypes.string,
  hasOvertimeSalary: PropTypes.string,
  isOvertimeSalaryLegal: PropTypes.string,
  hasCompensatoryDayoff: PropTypes.string,
};

export default TimeInfo;
