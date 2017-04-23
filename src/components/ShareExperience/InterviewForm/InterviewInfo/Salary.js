import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import TextInput from 'common/form/TextInput';
import InputTitle from '../../common/InputTitle';

import {
  salaryTypeOptions,
} from '../../common/optionMap';

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
          alignItems: 'center',
        }}
      >
        <TextInput
          value={salaryAmount}
          onChange={e => onSalaryAmount(e.target.value)}
          placeholder="700,000"
        />
        <p
          className="pS"
          style={{
            marginLeft: '12px',
          }}
        >
          元
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
