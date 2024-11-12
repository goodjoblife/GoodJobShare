import React from 'react';
import PropTypes from 'prop-types';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import shareStyles from './share.module.css';

import { experienceInYearOptions } from './optionMap';

const ExperienceInYear = ({ jobTitle, experienceInYear, onChange }) => (
  <div>
    <InputTitle
      text={
        jobTitle ? `當時已經有幾年擔任${jobTitle}的經驗？` : '自身相關職務經驗'
      }
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
          onChange={e =>
            e.target.value === ''
              ? onChange(null)
              : onChange(Number(e.target.value))
          }
        />
      </div>
      <p className="pS">年</p>
    </div>
  </div>
);

ExperienceInYear.propTypes = {
  experienceInYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  jobTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default ExperienceInYear;
