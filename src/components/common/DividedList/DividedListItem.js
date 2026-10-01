import PropTypes from 'prop-types';
import React from 'react';

import { P } from 'common/base';

import styles from './DividedList.module.css';

const DividedListItem = ({ label, children }) => (
  <div className={styles.item}>
    <P size="m" bold>
      {label}
    </P>
    {children}
  </div>
);

DividedListItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node.isRequired,
};

export default DividedListItem;
