import React from 'react';
import PropTypes from 'prop-types';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import shareStyles from './share.module.css';

import {
  educationOptions,
} from './optionMap';

const Education = ({ education, onChange }) => (
  <div>
    <InputTitle
      text="最高學歷"
    />
    <div
      className={shareStyles.single__select__input}
    >
      <Select
        options={educationOptions}
        value={education}
        onChange={
          e => onChange(e.target.value)
        }
      />
    </div>
  </div>
);

Education.propTypes = {
  education: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default Education;
