import React from 'react';
import PropTypes from 'prop-types';

import RadioDefault from 'common/form/RadioDefault';
import Select from 'common/form/Select';

import InputTitle from '../../common/InputTitle';

import {
  isEmployedOptions,
  jobEndingTimeYearOptions,
  jobEndingTimeMonthOptions,
} from '../../common/optionMap';

const IsEmployed = ({
  isCurrentlyEmployed,
  jobEndingTimeYear,
  jobEndingTimeMonth,
  onIsCurrentlyEmployed,
  onJobEndingTimeYear,
  onJobEndingTimeMonth,
}) => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        marginRight: '50px',
      }}
    >
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <InputTitle
          text="你現在在職嗎？"
          must
        />
      </div>
      {
        isEmployedOptions.map(option => (
          <div
            key={option.value}
            style={{
              display: 'inline-block',
              marginRight: '39px',
            }}
          >
            <RadioDefault
              label={option.label}
              value={option.value}
              onChange={onIsCurrentlyEmployed}
              checked={isCurrentlyEmployed === option.value}
            />
          </div>
        ))
      }
    </div>
    {
      isCurrentlyEmployed === 'no' ?
        <div>
          <InputTitle
            text="離職時間"
            must
          />
          <div
            style={{
              display: 'flex',
              marginTop: '7px',
              alignItems: 'center',
            }}
          >
            <Select
              options={jobEndingTimeYearOptions}
              value={jobEndingTimeYear}
              onChange={e => onJobEndingTimeYear(Number(e.target.value))}
            />
            <p
              className="pS"
              style={{
                margin: '0 35px 0 11px',
              }}
            >
              年
            </p>
            <Select
              options={jobEndingTimeMonthOptions}
              value={jobEndingTimeMonth}
              onChange={e => onJobEndingTimeMonth(Number(e.target.value))}
            />
            <p
              className="pS"
              style={{
                margin: '0 35px 0 11px',
              }}
            >
              月
            </p>
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
