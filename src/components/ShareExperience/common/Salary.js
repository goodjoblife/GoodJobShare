import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import TextInput from 'common/form/TextInput';
import InputTitle from './InputTitle';

import styles from './Salary.module.css';

import {
  salaryTypeOptions,
} from './optionMap';

const Salary = (
  { salaryType, salaryAmount, onSalaryType, onSalaryAmount }
) => (
  <div>
    <InputTitle
      text="待遇"
    />
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '107px',
          marginRight: '18px',
        }}
      >
        <Select
          value={salaryType}
          options={salaryTypeOptions}
          onChange={e => onSalaryType(e.target.value)}
        />
      </div>
      <div
        style={{
          width: '155px',
          display: 'flex',
        }}
      >
        <TextInput
          value={salaryAmount}
          onChange={e => onSalaryAmount(e.target.value)}
          placeholder="700,000"
          type="number"
          min={0}
        />
        <div>
          <p
            className="pS"
            style={{
              marginLeft: '12px',
              lineHeight: '44px',
            }}
          >
            元
          </p>
        </div>
      </div>
      <div
        className={styles.dialog}
        style={{
          width: '330px',
          marginLeft: '74px',
          padding: '10px',
        }}
      >
        <p className={styles.exclamation}>！</p>
        <p className="pS">
          薪資請以包含平常的
          <b
            style={{
              fontWeight: '700',
            }}
          >
            薪資、分紅、年終、績效獎金
          </b>
          等實質上獲得的價值去計算。
        </p>
      </div>
    </div>
  </div>
);

Salary.propTypes = {
  salaryType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salaryAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onSalaryType: PropTypes.func,
  onSalaryAmount: PropTypes.func,
};

export default Salary;
