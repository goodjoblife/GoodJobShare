import { useKey } from 'react-use';

const useKeyNavigation = ({ onArrowUp, onArrowDown }, inputRef) => {
  useKey('ArrowUp', onArrowUp, { target: inputRef.current }, [onArrowUp]);
  useKey('ArrowDown', onArrowDown, { target: inputRef.current }, [onArrowDown]);
};

export default useKeyNavigation;
