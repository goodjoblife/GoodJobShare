import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';

import {
  lteLength,
} from 'utils/dataCheckUtil';

import InputTitle from './InputTitle';

const Title = ({ title, onChange, placeholder }) => (
  <div>
    <InputTitle
      text="標題"
      must
    />
    <TextInput
      value={title}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      isWarning={!lteLength(25)(title)}
      warningWording="請輸入25個字以內"
    />
  </div>
);

Title.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Title;
