import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './GradientMask.module.css';

const GradientMask = ({
  children,
  rootClassName,
  childrenOnMaskBottom,
  show = true,
}) => (
  <div className={cn(styles.container, rootClassName)}>
    {children}
    <div className={cn({ [styles.mask]: show })} />
    {childrenOnMaskBottom && (
      <div className={cn({ [styles.maskBottomContainer]: show })}>
        {childrenOnMaskBottom}
      </div>
    )}
  </div>
);

GradientMask.propTypes = {
  children: PropTypes.element,
  rootClassName: PropTypes.string,
  show: PropTypes.bool,
};

GradientMask.defaultProps = {
  children: null,
  rootClassName: '',
  show: true,
};

export default GradientMask;
