import React, { Children, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { childrenOfType } from 'airbnb-prop-types';
import cn from 'classnames';

import styles from './AnimatedPager.module.css';

const AnimatedPager = ({ page, children, ...props }) => {
  const [frameWidth, setFrameWidth] = useState(0);
  const handleRef = useCallback(node => {
    setFrameWidth(node.getBoundingClientRect().width);
  }, []);

  return (
    <div ref={handleRef} className={cn(styles.frame, props.className)}>
      {Children.map(children, ({ props: { children } }) => (
        <div
          className={styles.page}
          style={{ left: `${-frameWidth * page}px` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

const Page = 'div';

AnimatedPager.propTypes = {
  children: childrenOfType(Page).isRequired,
  page: PropTypes.number.isRequired,
};

AnimatedPager.Page = Page;

export default AnimatedPager;
