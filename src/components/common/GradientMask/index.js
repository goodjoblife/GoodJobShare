import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './GradientMask.module.css';

const GradientMask = ({
  children,
  rootClassName,
  maskClassName,
  childrenOnMaskBottom,
  show = true,
}) => (
  <div className={cn(styles.container, rootClassName)}>
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
  maskClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  show: PropTypes.bool,
};

GradientMask.defaultProps = {
  children: null,
  rootClassName: '',
  show: true,
};

export default GradientMask;
