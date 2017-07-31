import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import shareStyles from './share.module.css';

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
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className={shareStyles.single__select__input}
        style={{
          marginRight: '16px',
        }}
      >
        <Select
          options={experienceInYearOptions}
          value={experienceInYear}
          onChange={
            e => onChange(Number(e.target.value))
          }
        />
      </div>
      <p
        className="pS"
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
