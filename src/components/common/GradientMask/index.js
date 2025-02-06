import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './GradientMask.module.css';

const GradientMask = ({
  children,
  className,
  maskClassName,
  childrenOnMaskBottom,
  show = true,
}) => (
  <div className={cn(styles.container, className)}>
    <div className={cn({ [styles.mask]: show, [maskClassName]: show })}>
      {children}
    </div>
    {childrenOnMaskBottom && show && (
      <div className={cn({ [styles.maskBottomContainer]: show })}>
        {childrenOnMaskBottom}
      </div>
    )}
  </div>
);

GradientMask.propTypes = {
  children: PropTypes.element,
  childrenOnMaskBottom: PropTypes.any,
  className: PropTypes.string,
  maskClassName: PropTypes.string,
  show: PropTypes.bool,
};

GradientMask.defaultProps = {
  children: null,
  className: '',
  show: true,
};

export default GradientMask;
