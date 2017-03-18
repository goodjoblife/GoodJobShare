import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';


const Counter = ({
  increment, incrementIfOdd, decrement, counter,
}) => (
  <p>
    Clicked: {counter.counter} times
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={incrementIfOdd}>Increment if odd</button>
  </p>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: ImmutablePropTypes.map.isRequired,
};


export default Counter;
