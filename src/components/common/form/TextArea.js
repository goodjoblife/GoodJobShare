import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TextInput/TextInput.module.css';

const TextInput = ({
  isWarning,
  warningWording,
  wrapperClassName,
  className,
  ...props
}) => (
  <div className={cn(styles.wrapper, wrapperClassName)}>
    <textarea
      className={cn(isWarning ? styles.warning : styles.input, className)}
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
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
