import React from 'react';
import PropTypes from 'prop-types';

import RadioDefault from 'common/form/RadioDefault';
import Select from 'common/form/Select';
import Unit from 'common/form/Unit';

import InputTitle from '../../common/InputTitle';

import {
  isEmployedOptions,
  jobEndingTimeYearOptions,
  jobEndingTimeMonthOptions,
} from '../../common/optionMap';

import styles from './IsEmployed.module.css';

const IsEmployed = ({
  isCurrentlyEmployed,
  jobEndingTimeYear,
  jobEndingTimeMonth,
  onIsCurrentlyEmployed,
  onJobEndingTimeYear,
  onJobEndingTimeMonth,
}) => (
  <div className={styles.wrapper}>
    <div>
      <InputTitle
        text="你現在在職嗎？"
        must
      />
      <div className={styles.radios}>
        {
          isEmployedOptions.map(option => (
            <RadioDefault
              label={option.label}
              value={option.value}
              onChange={onIsCurrentlyEmployed}
              checked={isCurrentlyEmployed === option.value}
            />
          ))
        }
      </div>
    </div>
    {
      isCurrentlyEmployed === 'no' ?
        <div>
          <InputTitle
            text="離職時間"
            must
          />
          <div className={styles.selects}>
            <Select
              placeholder="- 請選擇 -"
              options={jobEndingTimeYearOptions}
              value={jobEndingTimeYear}
              onChange={e => onJobEndingTimeYear(Number(e.target.value))}
            />
            <Unit marginRight>年</Unit>
            <Select
              options={jobEndingTimeMonthOptions}
              value={jobEndingTimeMonth}
              onChange={e => onJobEndingTimeMonth(Number(e.target.value))}
            />
            <Unit>月</Unit>
          </div>
        </div>
        : null
    }
  </div>
);

IsEmployed.propTypes = {
  isCurrentlyEmployed: PropTypes.string,
  jobEndingTimeYear: PropTypes.number,
  jobEndingTimeMonth: PropTypes.number,
  onIsCurrentlyEmployed: PropTypes.func,
  onJobEndingTimeYear: PropTypes.func,
  onJobEndingTimeMonth: PropTypes.func,
};

export default IsEmployed;
