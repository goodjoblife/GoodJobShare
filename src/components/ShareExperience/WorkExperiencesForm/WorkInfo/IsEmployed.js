import React from 'react';
import PropTypes from 'prop-types';

import RadioDefault from 'common/form/RadioDefault';

import {
  isEmployedOptions,
} from '../../common/optionMap';

const IsEmployed = ({
  onIsCurrentlyEmployed,
  isCurrentlyEmployed,
}) => (
  <div>
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
);

IsEmployed.propTypes = {
  isCurrentlyEmployed: PropTypes.string,
  // jobEndingTimeYear: PropTypes.number,
  // jobEndingTimeMonth: PropTypes.number,
  onIsCurrentlyEmployed: PropTypes.func,
  // onJobEndingTimeYear: PropTypes.func,
  // onJobEndingTimeMonth: PropTypes.func,
};

export default IsEmployed;
