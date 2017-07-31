import React, { PropTypes } from 'react';
import { P } from 'common/base';
import styles from './IconHeading.module.css';

const IconHeading = ({ text, Icon }) => (
  <P size="l" bold Tag="h2" className={styles.iconHeading}>
    <Icon />{text}
  </P>
);

IconHeading.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};

export default IconHeading;
