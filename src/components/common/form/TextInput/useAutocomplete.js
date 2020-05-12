import { useState, useEffect, useCallback, useRef } from 'react';

const useBoundedIndex = (bound, initialIndex) => {
  const [index, setIndex] = useState(initialIndex);
  const setBoundedIndex = useCallback(
    index => setIndex((index + bound) % bound),
    [bound],
  );
  const resetIndex = useCallback(() => setIndex(initialIndex), [initialIndex]);
  return [index, setBoundedIndex, resetIndex];
};

const useScrollToItem = itemRef => {
  useEffect(() => {
    if (itemRef) {
      itemRef.scrollIntoView({ block: 'nearest' });
    }
  }, [itemRef]);
};

export default ({
  value,
  onFocus,
  onBlur,
  autocompleteItems,
  onAutocompleteItemSelected,
}) => {
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

  const handleArrowUp = useCallback(
    e => {
      if (isMenuOpen) {
        e.preventDefault();
        setHighlightedIndex(highlightedIndex - 1);
      }
    },
    [highlightedIndex, isMenuOpen, setHighlightedIndex],
  );

  const handleArrowDown = useCallback(
    e => {
      if (isMenuOpen) {
        e.preventDefault();
        setHighlightedIndex(highlightedIndex + 1);
      } else if (autocompleteItems.length > 0) {
        setHighlightedIndex(0);
        setMenuOpen(true);
      }
    },
    [
      autocompleteItems.length,
      highlightedIndex,
      isMenuOpen,
      setHighlightedIndex,
    ],
  );

  const handleEscape = useCallback(
    e => {
      if (isMenuOpen) {
        e.preventDefault();
        setMenuOpen(false);
      }
    },
    [isMenuOpen],
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

  return {
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
  };
};
