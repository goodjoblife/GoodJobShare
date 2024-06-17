import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Glike from 'common/icons/Glike';
import styles from './RateButtonElement.module.css';

const RateButtonElement = ({ hover, active, onClick }) => (
  <Glike
    className={cn(styles.container, {
      [styles.hover]: hover,
      [styles.active]: active,
    })}
    onClick={onClick}
  />
);

RateButtonElement.propTypes = {
  active: PropTypes.bool,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default RateButtonElement;
