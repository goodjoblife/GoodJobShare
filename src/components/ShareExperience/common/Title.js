import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';

import InputTitle from './InputTitle';

const Title = ({ title, onChange, placeholder, validator }) => (
  <div>
    <InputTitle
      text="標題"
      must
    />
    <TextInput
      value={title}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      isWarning={!validator(title)}
      warningWording="需輸入 1 ~ 25 字"
    />
  </div>
);

Title.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  validator: PropTypes.func,
};

export default Title;
