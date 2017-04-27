import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import InputTitle from '../../common/InputTitle';

import {
  educationOptions,
} from '../../common/optionMap';

const Education = ({ education, onChange }) => (
  <div>
    <InputTitle
      text="最高學歷"
    />
    <div
      style={{
        width: '320px',
      }}
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
