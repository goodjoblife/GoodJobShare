import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { childrenOfType } from 'airbnb-prop-types';
import { useMeasure } from 'react-use';
import cn from 'classnames';

import styles from './AnimatedPager.module.css';

const AnimatedPager = ({ page, children, ...props }) => {
  const [handleRef, { width: frameWidth }] = useMeasure();
  return (
    <div ref={handleRef} className={cn(styles.frame, props.className)}>
      {Children.map(children, ({ props: { children } }, i) => (
        <div
          key={i}
          className={styles.page}
          style={{ left: `${-frameWidth * page}px` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

const Page = props => <div {...props} />;

AnimatedPager.propTypes = {
  children: childrenOfType(Page).isRequired,
  className: PropTypes.string,
  page: PropTypes.number.isRequired,
};

AnimatedPager.Page = Page;

export default AnimatedPager;
