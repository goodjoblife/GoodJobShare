import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Scrollable from '../../../Scrollable';
import styles from './private.module.css';
import commonStyles from '../../styles.module.css';

const Wrapper = ({ warning, children }) => (
  <div
    className={cn(styles.container, { [commonStyles.hasWarning]: !!warning })}
  >
    <div
      className={cn(styles.warnableContainer, commonStyles.warnableContainer)}
    >
      <div className={styles.options}>
        <Scrollable className={styles.optionsContent}>{children}</Scrollable>
      </div>
    </div>
    <div className={commonStyles.warning}>{warning}</div>
  </div>
);

Wrapper.propTypes = {
  warning: PropTypes.string,
  children: PropTypes.node,
};

export default Wrapper;
