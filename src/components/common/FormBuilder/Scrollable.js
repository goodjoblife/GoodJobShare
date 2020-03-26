import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import styles from './Scrollable.module.css';

const Scrollable = ({ children, className }) => {
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const handleRef = useCallback(el => {
    if (el) {
      new ResizeObserver(entries => {
        for (const e of entries) {
          setMaxOffset(e.target.scrollHeight - e.target.offsetHeight);
        }
      }).observe(el);
    }
  }, []);
  const handleScroll = useCallback(e => {
    setOffset(e.target.scrollTop);
  }, []);

  return (
    <div
      className={cn(
        styles.frame,
        { [styles.end]: offset >= maxOffset },
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
