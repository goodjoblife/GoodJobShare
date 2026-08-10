import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Label.module.css';

const Label = ({ className, isRequired, ...props }) => (
  <label
    className={cn(styles.label, { [styles.isRequired]: isRequired }, className)}
    {...props}
  ></label>
);

Label.propTypes = {
  className: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Label;
