import { useKey } from 'react-use';

const useKeyNavigation = ({ onArrowUp, onArrowDown, onEscape }, inputRef) => {
  useKey('ArrowUp', onArrowUp, { target: inputRef.current }, [onArrowUp]);
  useKey('ArrowDown', onArrowDown, { target: inputRef.current }, [onArrowDown]);
  useKey('Escape', onEscape, { target: inputRef.current }, [onEscape]);
};

export default useKeyNavigation;
