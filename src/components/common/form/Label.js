import React from 'react';
import cn from 'classnames';
import styles from './Label.module.css';
import PropTypes from 'prop-types';

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
