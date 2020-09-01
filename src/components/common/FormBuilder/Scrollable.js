import React, { useRef, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useMeasure } from 'react-use';

import styles from './Scrollable.module.css';

const Scrollable = ({ children, className }) => {
  const ref = useRef(null);
  const [handleMeasureRef, { height: frameHeight }] = useMeasure();
  const [remainOffset, setRemainOffset] = useState(0);
  const calcRemainOffsetByElement = useCallback(() => {
    if (ref.current) {
      setRemainOffset(ref.current.scrollHeight - ref.current.scrollTop);
    }
  }, []);

  const handleRef = useCallback(
    el => {
      ref.current = el;
      handleMeasureRef(el);
    },
    [handleMeasureRef],
  );

  useEffect(calcRemainOffsetByElement, [frameHeight]);

  return (
    <div
      className={cn(
        styles.frame,
        { [styles.end]: remainOffset - frameHeight <= 1 },
        className,
      )}
    >
      <div
        ref={handleRef}
        onScroll={calcRemainOffsetByElement}
        className={styles.content}
      >
        {children}
      </div>
    </div>
  );
};

export default Scrollable;
