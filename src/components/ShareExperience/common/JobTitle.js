import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';

import {
  lteLength,
} from 'utils/dataCheckUtil';

import InputTitle from './InputTitle';

const JobTitle = ({ inputTitle, jobTitle, onChange }) => (
  <div>
    <InputTitle
      text={inputTitle}
      must
    />
    <TextInput
      placeholder="硬體工程師"
      value={jobTitle}
      onChange={e => onChange(e.target.value)}
      isWarning={!lteLength(10)(jobTitle)}
      warningWording="請輸入10個字以內"
    />
  </div>
);

JobTitle.propTypes = {
  inputTitle: PropTypes.string,
  jobTitle: PropTypes.string,
  onChange: PropTypes.func,
};

export default JobTitle;
