import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import {
  regionOptions,
} from './optionMap';

const Region = ({ region, onChange }) => (
  <div>
    <InputTitle
      text="面試地區"
      must
    />
    <div
      style={{
        width: '320px',
      }}
    >
      <Select
        options={regionOptions}
        value={region}
        onChange={
          e => onChange(e.target.value)
        }
      />
    </div>
  </div>
);

Region.propTypes = {
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default Region;
