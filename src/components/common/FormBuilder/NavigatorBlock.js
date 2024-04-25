import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './NavigatorBlock.module.css';

export const NavigatorButton = ({ className, ...restProps }) => (
  <button {...restProps} className={cn(className, styles.btn)} />
);

const NavigatorBlock = ({
  skippable,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => (
  <div className={styles.container}>
    <NavigatorButton onClick={onPrevious} disabled={!hasPrevious}>
      上一題
    </NavigatorButton>
    <NavigatorButton onClick={onNext} disabled={!hasNext}>
      {skippable ? '跳過' : '下一題'}
    </NavigatorButton>
  </div>
);

NavigatorBlock.propTypes = {
  skippable: PropTypes.bool.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
};

export default NavigatorBlock;
