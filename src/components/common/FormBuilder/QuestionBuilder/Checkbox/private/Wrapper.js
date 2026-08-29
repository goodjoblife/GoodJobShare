import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './private.module.css';
import Scrollable from '../../../Scrollable';
import commonStyles from '../../styles.module.css';

const Wrapper = ({ warning, footnote, children }) => (
  <div
    className={cn(styles.container, { [commonStyles.hasWarning]: !!warning })}
  >
    <div
      className={cn(styles.warnableContainer, commonStyles.warnableContainer)}
    >
      <div className={styles.options}>
        <Scrollable className={styles.optionsContent}>
          {children}
          {footnote && <div className={styles.footnote}>{footnote}</div>}
        </Scrollable>
      </div>
    </div>
    <div className={commonStyles.warning}>{warning}</div>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node,
  footnote: PropTypes.node,
  warning: PropTypes.string,
};

export default Wrapper;
