import { useState, useEffect, useCallback, useRef } from 'react';
import { useKey } from 'react-use';

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

export default (
  { value, onFocus, onBlur, autocompleteItems, onAutocompleteItemSelected },
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
        if (onAutocompleteItemSelected)
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

  const handleItemRef = useCallback((node, i) => {
    itemRefs.current[i] = node;
  }, []);

  const handleFocus = useCallback(
    e => {
      setFocused(true);
      if (onFocus) onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    e => {
      if (shouldIgnoreBlur) return;
      setFocused(false);
      if (onBlur) onBlur(e);
    },
    [onBlur, shouldIgnoreBlur],
  );

  const handleEnter = useCallback(
    e => {
      if (isMenuOpen && hasHighlight) {
        selectHighlightedItem();
      }
    },
    [hasHighlight, isMenuOpen, selectHighlightedItem],
  );

  const handleMouseEnterItem = useCallback(
    i => {
      setIgnoreBlur(true);
      setHighlightedIndex(i);
    },
    [setHighlightedIndex],
  );

  const handleMouseLeaveItem = useCallback(
    i => {
      setIgnoreBlur(false);
      resetHighlightedIndex();
    },
    [resetHighlightedIndex],
  );

  const handleMouseClickItem = useCallback(
    i => {
      selectItemAt(i);
    },
    [selectItemAt],
  );

  return [
    isMenuOpen,
    highlightedIndex,
    handleFocus,
    handleBlur,
    handleEnter,
    handleItemRef,
    handleMouseEnterItem,
    handleMouseLeaveItem,
    handleMouseClickItem,
  ];
};
