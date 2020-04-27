import React, { forwardRef, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import useEnterConfirm from './useEnterConfirm';
import styles from './TextInput.module.css';

const TextInput = forwardRef(
  (
    {
      isWarning,
      warningWording,
      type,
      wrapperClassName,
      className,
      style,
      onCompositionStart,
      onCompositionEnd,
      onEnter,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef(null);
    const handleRef = useCallback(
      node => {
        inputRef.current = node;
        if (ref) ref.current = node;
      },
      [ref],
    );

    const [handleCompositionStart, handleCompositionEnd] = useEnterConfirm(
      {
        onCompositionStart,
        onCompositionEnd,
        onEnter,
      },
      inputRef,
    );

    return (
      <div className={cn(styles.wrapper, wrapperClassName)} style={style}>
        <input
          ref={handleRef}
          {...props}
          type={type}
          className={cn(isWarning ? styles.warning : styles.input, className)}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
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
  },
);

TextInput.propTypes = {
  isWarning: PropTypes.bool,
  warningWording: PropTypes.string,
  type: PropTypes.string,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  onCompositionStart: PropTypes.func,
  onCompositionEnd: PropTypes.func,
  onEnter: PropTypes.func,
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
