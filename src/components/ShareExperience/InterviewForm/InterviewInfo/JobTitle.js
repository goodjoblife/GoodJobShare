import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';
import InputTitle from '../../common/InputTitle';

import {
  checkWordingLength,
} from '../../utils';

const JobTitle = ({ jobTitle, onChange }) => (
  <div>
    <InputTitle
      text="公司/單位 或 統一編號"
      must
    />
    <TextInput
      placeholder="ＯＯ 股份有限公司"
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
