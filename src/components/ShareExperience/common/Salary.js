import React from 'react';
import PropTypes from 'prop-types';

import Select from 'common/form/Select';
import TextInput from 'common/form/TextInput';
import Unit from 'common/form/Unit';
import { P } from 'common/base';
import InputTitle from './InputTitle';

import styles from './Salary.module.css';
import dialogStyles from './Dialog.module.css';

import { salaryTypeOptions } from './optionMap';

const Salary = ({ salaryType, salaryAmount, onSalaryType, onSalaryAmount }) => (
  <div>
    <InputTitle text="待遇" />
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          marginRight: '40px',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            width: '100px',
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
            alignItems: 'center',
          }}
        >
          <TextInput
            value={salaryAmount}
            onChange={e => onSalaryAmount(e.target.value)}
            placeholder="70,000"
            type="number"
            min={0}
          />
          <Unit>元</Unit>
        </div>
      </div>
      <div className={dialogStyles.dialog}>
        <span className={dialogStyles.exclamation}>！</span>
        <P size="s">
          薪資請以包含平常的
          <strong>薪資、分紅、年終、績效獎金</strong>
          等實質上獲得的價值去計算。
        </P>
      </div>
    </div>
  </div>
);

Salary.propTypes = {
  onSalaryAmount: PropTypes.func,
  onSalaryType: PropTypes.func,
  salaryAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salaryType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Salary;
