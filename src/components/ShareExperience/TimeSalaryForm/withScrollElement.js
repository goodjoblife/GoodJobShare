import React from 'react';
import { Element as ScrollElement } from 'react-scroll';

const withScrollElement = (WrappedComponent, elementName) => {
  const Subscriber = props => {
    return (
      <div>
        <ScrollElement name={elementName} />
        <WrappedComponent {...props} />
      </div>
    );
  };

  return Subscriber;
};

export default withScrollElement;
