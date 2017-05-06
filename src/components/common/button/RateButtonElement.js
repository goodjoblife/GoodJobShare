import React, { PropTypes } from 'react';
import styles from './RateButtonElement.module.css';

const handleClassName = hover => active => {
  if (hover) {
    return styles.hover;
  }

  if (active) {
    return styles.active;
  }

  return styles.container;
};

const RateButtonElement = ({ hover, active, onClick }) => (
  <div
    className={handleClassName(hover)(active)}
    style={{
      fontSize: '3rem',
    }}
    onClick={onClick}
  >
    T
  </div>
);

RateButtonElement.propTypes = {
  hover: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default RateButtonElement;
