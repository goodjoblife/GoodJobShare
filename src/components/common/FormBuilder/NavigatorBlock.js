import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './NavigatorBlock.module.css';

const NavigatorButton = ({ className, ...restProps }) => (
  <button {...restProps} className={cn(className, styles.btn)} />
);

const NavigatorBlock = ({ onPrevious, onNext, hasPrevious, hasNext }) => (
  <div className={styles.container}>
    <NavigatorButton onClick={onPrevious} disabled={!hasPrevious}>
      上一題
    </NavigatorButton>
    <NavigatorButton onClick={onNext} disabled={!hasNext}>
      下一題
    </NavigatorButton>
  </div>
);

NavigatorBlock.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
};

export default NavigatorBlock;
