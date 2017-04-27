import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';

import {
  checkWordingLength,
} from '../../utils';
import InputTitle from '../../common/InputTitle';

const Title = ({ title, onChange }) => (
  <div>
    <InputTitle
      text="標題"
      must
    />
    <TextInput
      value={title}
      placeholder="ＯＯ 股份有限公司面試經驗分享"
      onChange={e => onChange(e.target.value)}
      isWarning={!checkWordingLength(25)(title)}
      warningWording="請輸入25個字以內"
    />
  </div>
);

Title.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
};

export default Title;
