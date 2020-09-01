import { useRef, useCallback, useEffect } from 'react';

/* Workaround for Google Chrome:
   When we click on the "More" button, the children grows and Chrome scrolls so that the "More" button stays in the same position.
   This makes the children growth not evident to the user, which is not what we intend. Instead, we want Chrome to not scroll.

   This hook restores the scrolling offset when the dependencies change.
   The restored offset is saved when we invoke the callback function returned by this hook. */

export default deps => {
  const offsetState = useRef();
  useEffect(() => {
    window.scrollTo(window.pageXOffset, offsetState.current);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  const saveOffsetState = useCallback(() => {
    offsetState.current = window.pageYOffset;
  }, []);
  return saveOffsetState;
};
