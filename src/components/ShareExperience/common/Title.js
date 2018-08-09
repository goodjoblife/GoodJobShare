import React from 'react';
import PropTypes from 'prop-types';

import TextInput from 'common/form/TextInput';

import InputTitle from './InputTitle';

const Title = ({ title, onChange, placeholder, validator, submitted }) => (
  <div>
    <InputTitle text="標題" must />
    <TextInput
      value={title}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      isWarning={submitted && !validator(title)}
      warningWording="需輸入 1 ~ 25 字"
    />
  </div>
);

Title.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

export default Title;
