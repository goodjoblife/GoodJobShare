import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';
import InputTitle from '../../common/InputTitle';

import {
  checkWordingLength,
} from '../../utils';

const JobTitle = ({ jobTitle, onChange }) => (
  <div>
    <InputTitle
      text="應徵職稱"
      must
    />
    <TextInput
      placeholder="硬體工程師"
      value={jobTitle}
      onChange={e => onChange(e.target.value)}
      isWarning={!checkWordingLength(10)(jobTitle)}
      warningWording="請輸入10個字以內"
    />
  </div>
);

JobTitle.propTypes = {
  jobTitle: PropTypes.string,
  onChange: PropTypes.func,
};

export default JobTitle;
