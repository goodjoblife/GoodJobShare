import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TextInput.module.css';

const TextInput = ({
  value,
  placeholder,
  isWarning,
  warningWording,
  wrapperClassName,
  className,
  style,
  ...props
}) => (
  <div className={cn(styles.wrapper, wrapperClassName)} style={style}>
    <textarea
      placeholder={placeholder}
      className={cn(isWarning ? styles.warning : styles.input, className)}
      value={value}
      {...props}
    />
    {warningWording && (
      <p
        className={cn('pS', styles.warning__text, {
          [styles.isWarning]: isWarning,
        })}
      >
        {warningWording}
      </p>
    )}
  </div>
);

TextInput.propTypes = {
  isWarning: PropTypes.bool,
  warningWording: PropTypes.string,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
