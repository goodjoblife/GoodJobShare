import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { useMeasure } from 'react-use';

import styles from './Scrollable.module.css';

const Scrollable = ({ children, className }) => {
  const [ref, { height: frameHeight }] = useMeasure();
  const [remainOffset, setRemainOffset] = useState(0);

  const handleRef = useCallback(
    el => {
      setRemainOffset(el.scrollHeight - el.scrollTop);
      ref(el);
    },
    [ref],
  );
  const handleScroll = useCallback(e => {
    setRemainOffset(e.target.scrollHeight - e.target.scrollTop);
  }, []);

  return (
    <div
      className={cn(
        styles.frame,
        { [styles.end]: frameHeight >= remainOffset },
        className,
      )}
    >
      <div ref={handleRef} onScroll={handleScroll} className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Scrollable;
