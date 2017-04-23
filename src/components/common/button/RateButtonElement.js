import React, { PropTypes } from 'react';
// import styles from './RateButtonElement.module.css';

const RateButtonElement = ({ active, onClick }) => (
  <div
    style={{
      display: 'inline-block',
      color: active ? 'red' : 'black',
      margin: '0 3px',
    }}
    onClick={onClick}
  >
    T
  </div>
);

RateButtonElement.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default RateButtonElement;
