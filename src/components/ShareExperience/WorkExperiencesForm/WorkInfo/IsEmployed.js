import React from 'react';
import PropTypes from 'prop-types';

const IsEmployed = () => (
  <div>
    IsEmployed
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
