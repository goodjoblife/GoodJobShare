import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from '../ShareExperience.module.css';

const IconHeading = ({ text, Icon }) => (
  <h2 className={cn('pLBold', styles.iconHeading)}>
    <Icon />{text}
  </h2>
);

IconHeading.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};

export default IconHeading;
