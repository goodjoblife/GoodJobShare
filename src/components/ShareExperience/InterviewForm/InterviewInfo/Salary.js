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
    <Select
      value={salaryType}
      options={salaryTypeOptions}
      onChange={e => onSalaryType(e.target.value)}
    />
    <TextInput
      value={salaryAmount}
      onChange={e => onSalaryAmount(e.target.value)}
    />
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
