export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';


export const increment = () => ({
  type: INCREMENT_COUNTER,
});


export const decrement = () => ({
  type: DECREMENT_COUNTER,
});


export const incrementIfOdd = () =>
  (dispatch, getState) => {
    const { counter } = getState();

    if (counter.counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
