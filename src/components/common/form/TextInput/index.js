import React, { forwardRef, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import useEnterConfirm from './useEnterConfirm';
import useAutocomplete from './useAutocomplete';
import useKeyNavigation from './useKeyNavigation';
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

AutoCompleteMenu.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
};

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

AutoCompleteOption.propTypes = {
  active: PropTypes.bool,
};

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

    const {
      isMenuOpen,
      highlightedIndex,
      hasHighlight,
      handleFocus,
      handleBlur,
      handleEnter,
      handleArrowUp,
      handleArrowDown,
      handleEscape,
      handleItemRef,
      handleMouseEnterItem,
      handleMouseLeaveItem,
      handleMouseClickItem,
    } = useAutocomplete({
      value,
      onFocus,
      onBlur,
      autocompleteItems,
      onAutocompleteItemSelected,
    });

    useKeyNavigation(
      {
        onArrowUp: handleArrowUp,
        onArrowDown: handleArrowDown,
        onEscape: handleEscape,
      },
      inputRef,
    );

    const [handleCompositionStart, handleCompositionEnd] = useEnterConfirm(
      {
        onCompositionStart,
        onCompositionEnd,
        onEnter: e => {
          handleEnter(e);
          if (!hasHighlight) {
            onEnter && onEnter(e);
          }
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
              onMouseLeave={e => handleMouseLeaveItem(i)}
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
  autocompleteItemKeySelector: PropTypes.func.isRequired,
  autocompleteItemLabelSelector: PropTypes.func.isRequired,
  autocompleteItems: PropTypes.array.isRequired,
  className: PropTypes.string,
  isWarning: PropTypes.bool,
  onAutocompleteItemSelected: PropTypes.func,
  onBlur: PropTypes.func,
  onCompositionEnd: PropTypes.func,
  onCompositionStart: PropTypes.func,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  warningWording: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text',
  autocompleteItems: [],
  autocompleteItemKeySelector: x => x,
  autocompleteItemLabelSelector: x => x,
};

export default TextInput;
