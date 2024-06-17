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
  idPrefix4Radio,
  isCurrentlyEmployed,
  jobEndingTimeYear,
  jobEndingTimeMonth,
  onIsCurrentlyEmployed,
  onJobEndingTimeYear,
  onJobEndingTimeMonth,
}) => (
  <div className={styles.wrapper}>
    <div>
      <InputTitle text="你現在在職嗎？" must />
      <div className={styles.radios}>
        {isEmployedOptions.map(option => (
          <RadioDefault
            idPrefix={idPrefix4Radio}
            key={option.value}
            label={option.label}
            value={option.value}
            onChange={onIsCurrentlyEmployed}
            checked={isCurrentlyEmployed === option.value}
          />
        ))}
      </div>
    </div>
    {isCurrentlyEmployed === 'no' ? (
      <div>
        <InputTitle text="離職時間" must />
        <div className={styles.selects}>
          <Select
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
    ) : null}
  </div>
);

IsEmployed.propTypes = {
  idPrefix4Radio: PropTypes.string,
  isCurrentlyEmployed: PropTypes.string,
  jobEndingTimeMonth: PropTypes.number,
  jobEndingTimeYear: PropTypes.number,
  onIsCurrentlyEmployed: PropTypes.func,
  onJobEndingTimeMonth: PropTypes.func,
  onJobEndingTimeYear: PropTypes.func,
};

export default IsEmployed;
