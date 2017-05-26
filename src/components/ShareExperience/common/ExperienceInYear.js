import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import {
  experienceInYearOptions,
} from './optionMap';

const ExperienceInYear = ({ experienceInYear, onChange }) => (
  <div>
    <InputTitle
      text="相關職務工作經驗"
    />
    <div
      style={{
        width: '320px',
        position: 'relative',
      }}
    >
      <Select
        options={experienceInYearOptions}
        value={experienceInYear}
        onChange={
          e => onChange(Number(e.target.value))
        }
      />
      <p
        className="pS"
        style={{
          position: 'absolute',
          top: '50%',
          left: '100%',
          transform: 'translate(16px, -50%)',
        }}
      >
        年
      </p>
    </div>
  </div>
);

ExperienceInYear.propTypes = {
  experienceInYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default ExperienceInYear;
