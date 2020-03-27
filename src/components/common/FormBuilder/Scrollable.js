import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { useMeasure } from 'react-use';

import styles from './Scrollable.module.css';

const Scrollable = ({ children, className }) => {
  const [ref, { height: frameHeight }] = useMeasure();
  const [remainOffset, setRemainOffset] = useState(0);
  const calcRemainOffsetByElement = useCallback(
    el => setRemainOffset(el.scrollHeight - el.scrollTop),
    [],
  );

  const handleRef = useCallback(
    el => {
      if (el) {
        calcRemainOffsetByElement(el);
        ref(el);
      }
    },
    [calcRemainOffsetByElement, ref],
  );
  const handleScroll = useCallback(
    e => {
      calcRemainOffsetByElement(e.target);
    },
    [calcRemainOffsetByElement],
  );

  return (
    <div
      className={cn(
        styles.frame,
        { [styles.end]: remainOffset <= frameHeight },
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
