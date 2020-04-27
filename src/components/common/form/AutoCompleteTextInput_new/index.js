import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useKey } from 'react-use';
import cn from 'classnames';

import TextInput from '../TextInput';
import styles from './styles.module.css';

const useBoundedIndex = (bound, initialIndex) => {
  const [index, setIndex] = useState(initialIndex);
  const setBoundedIndex = useCallback(
    index => setIndex((index + bound) % bound),
    [bound],
  );
  const resetIndex = useCallback(() => setIndex(initialIndex), [initialIndex]);
  return [index, setBoundedIndex, resetIndex];
};

const useKeyNavigation = (index, setIndex, isEnabled, target) => {
  useKey(
    'ArrowUp',
    e => {
      if (isEnabled) {
        e.preventDefault();
        setIndex(index - 1);
      }
    },
    { target },
    [isEnabled, index, setIndex],
  );
  useKey(
    'ArrowDown',
    e => {
      if (isEnabled) {
        e.preventDefault();
        setIndex(index + 1);
      }
    },
    { target },
    [isEnabled, index, setIndex],
  );
};

const useScrollToItem = itemRef => {
  useEffect(() => {
    if (itemRef) {
      itemRef.scrollIntoView({ block: 'nearest' });
    }
  }, [itemRef]);
};

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

const AutoCompleteTextInput = forwardRef(
  (
    {
      wrapperClassName,
      value,
      onFocus,
      onBlur,
      onEnter,
      autocompleteItems,
      autocompleteItemKeySelector,
      autocompleteItemLabelSelector,
      onAutocompleteItemSelected,
      ...inputProps
    },
    inputRef,
  ) => {
    const itemRefs = useRef([]);
    const [isFocused, setFocused] = useState(false);
    const [shouldMenuOpen, setMenuOpen] = useState(false);
    const [shouldIgnoreBlur, setIgnoreBlur] = useState(false);
    const [
      highlightedIndex,
      setHighlightedIndex,
      resetHighlightedIndex,
    ] = useBoundedIndex(autocompleteItems.length + 1, autocompleteItems.length);
    const hasHighlight = highlightedIndex < autocompleteItems.length;

    useEffect(() => {
      setMenuOpen(isFocused);
    }, [isFocused]);

    useEffect(() => {
      if (isFocused) setMenuOpen(true);
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    const isMenuOpen = shouldMenuOpen && autocompleteItems.length > 0;

    const selectItemAt = useCallback(
      index => {
        if (index < autocompleteItems.length) {
          setMenuOpen(false);
          const selectedItem = autocompleteItems[index];
          onAutocompleteItemSelected(selectedItem);
        }
      },
      [autocompleteItems, onAutocompleteItemSelected],
    );
    const selectHighlightedItem = useCallback(
      () => selectItemAt(highlightedIndex),
      [highlightedIndex, selectItemAt],
    );

    useKeyNavigation(
      highlightedIndex,
      setHighlightedIndex,
      isMenuOpen,
      inputRef.current,
    );

    useEffect(resetHighlightedIndex, [resetHighlightedIndex, value]);

    useScrollToItem(itemRefs.current[highlightedIndex]);

    return (
      <div className={cn(styles.wrapper, wrapperClassName)}>
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={e => {
            setFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={e => {
            if (shouldIgnoreBlur) return;
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          onEnter={e => {
            if (isMenuOpen && hasHighlight) {
              selectHighlightedItem();
            } else if (onEnter) {
              onEnter(e);
            }
          }}
          {...inputProps}
        />
        <AutoCompleteMenu open={isMenuOpen}>
          {autocompleteItems.map((item, i) => (
            <AutoCompleteOption
              key={autocompleteItemKeySelector(item)}
              ref={el => (itemRefs.current[i] = el)}
              active={highlightedIndex === i}
              onClick={e => {
                selectItemAt(i);
              }}
              onMouseEnter={e => {
                setIgnoreBlur(true);
                setHighlightedIndex(i);
              }}
              onMouseLeave={e => {
                setIgnoreBlur(false);
                resetHighlightedIndex();
              }}
            >
              {autocompleteItemLabelSelector(item)}
            </AutoCompleteOption>
          ))}
        </AutoCompleteMenu>
      </div>
    );
  },
);
AutoCompleteTextInput.propTypes = {
  wrapperClassName: PropTypes.string,
  value: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func,
  autocompleteItems: PropTypes.array.isRequired,
  autocompleteItemKeySelector: PropTypes.func.isRequired,
  autocompleteItemLabelSelector: PropTypes.func.isRequired,
  onAutocompleteItemSelected: PropTypes.func.isRequired,
};

AutoCompleteTextInput.defaultProps = {
  autocompleteItems: [],
  autocompleteItemKeySelector: x => x,
  autocompleteItemLabelSelector: x => x,
};

export default AutoCompleteTextInput;
