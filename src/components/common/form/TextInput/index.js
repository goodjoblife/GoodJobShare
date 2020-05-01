import React, { forwardRef, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import useEnterConfirm from './useEnterConfirm';
import useAutocomplete from './useAutocomplete';
import styles from './TextInput.module.css';

const AutoCompleteMenu = ({ className, open, ...props }) => (
  <div
    className={cn(
      styles.menu,
      {
        [styles.visible]: open,
      },
      className,
    )}
    {...props}
  />
);

const AutoCompleteOption = forwardRef(({ active, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      styles.item,
      { [styles.active]: active },
      active ? 'pSBold' : 'pS',
    )}
    {...props}
  />
));

const TextInput = forwardRef(
  (
    {
      isWarning,
      warningWording,
      type,
      wrapperClassName,
      className,
      style,
      value,
      onCompositionStart,
      onCompositionEnd,
      onEnter,
      onFocus,
      onBlur,
      autocompleteItems,
      autocompleteItemKeySelector,
      autocompleteItemLabelSelector,
      onAutocompleteItemSelected,
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

    const [
      isMenuOpen,
      highlightedIndex,
      handleFocus,
      handleBlur,
      handleEnter,
      handleItemRef,
      handleMouseEnterItem,
      handleMouseLeaveOption,
      handleMouseClickItem,
    ] = useAutocomplete(
      {
        value,
        onFocus,
        onBlur,
        autocompleteItems,
        onAutocompleteItemSelected,
      },
      inputRef,
    );

    const [handleCompositionStart, handleCompositionEnd] = useEnterConfirm(
      {
        onCompositionStart,
        onCompositionEnd,
        onEnter: e => {
          handleEnter(e);
          if (!isMenuOpen && onEnter) onEnter(e);
        },
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
          value={value}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <AutoCompleteMenu open={isMenuOpen}>
          {autocompleteItems.map((item, i) => (
            <AutoCompleteOption
              key={autocompleteItemKeySelector(item)}
              ref={e => handleItemRef(e, i)}
              active={highlightedIndex === i}
              onClick={e => handleMouseClickItem(i)}
              onMouseEnter={e => handleMouseEnterItem(i)}
              onMouseLeave={e => handleMouseLeaveOption(i)}
            >
              {autocompleteItemLabelSelector(item)}
            </AutoCompleteOption>
          ))}
        </AutoCompleteMenu>
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
  value: PropTypes.string.isRequired,
  onCompositionStart: PropTypes.func,
  onCompositionEnd: PropTypes.func,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autocompleteItems: PropTypes.array.isRequired,
  autocompleteItemKeySelector: PropTypes.func.isRequired,
  autocompleteItemLabelSelector: PropTypes.func.isRequired,
  onAutocompleteItemSelected: PropTypes.func,
};

TextInput.defaultProps = {
  type: 'text',
  autocompleteItems: [],
  autocompleteItemKeySelector: x => x,
  autocompleteItemLabelSelector: x => x,
};

export default TextInput;
