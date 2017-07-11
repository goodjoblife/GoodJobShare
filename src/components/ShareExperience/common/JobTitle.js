import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';

import InputTitle from './InputTitle';

const JobTitle = ({ inputTitle, jobTitle, onChange, validator }) => (
  <div>
    <InputTitle
      text={inputTitle}
      must
    />
    <TextInput
      placeholder="硬體工程師"
      value={jobTitle}
      onChange={e => onChange(e.target.value)}
      isWarning={!validator(jobTitle)}
      warningWording="需填寫職稱"
    />
  </div>
);

JobTitle.propTypes = {
  inputTitle: PropTypes.string,
  jobTitle: PropTypes.string,
  onChange: PropTypes.func,
  validator: PropTypes.func,
};

JobTitle.defaultProps = {
  validator: () => {},
};

export default JobTitle;
