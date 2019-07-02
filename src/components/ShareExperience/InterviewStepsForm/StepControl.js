import React from 'react';
import { withRouter } from 'react-router';
import cn from 'classnames';
import styles from './StepControl.module.css';

const StepControl = ({ match, location, children, isActive }) => (
  <div
    className={cn(styles.stepControl, {
      [styles.active]:
        typeof isActive === 'function' ? isActive(match, location) : !!isActive,
    })}
  >
    {children}
  </div>
);

StepControl.Group = ({ children }) => (
  <div className={styles.stepControlGroup}>{children}</div>
);

export default withRouter(StepControl);
