
import React from 'react';
import { Element as ScrollElement } from 'react-scroll';

import { VALID, INVALID } from '../../constants/formElements';

/**
 *
 * @param {*} WrappedComponent: The component to be wrapped
 * @param {*} validate: The validation function to validate target value, it should return true / false
 * @param {*} elementName: The element name for scrolling
 * @param {*} onChangeFuncName: The function name in this.props to update validation status
 */
export default function subscribeValidation(WrappedComponent, validate, elementName, onChangeFuncName) {
  return class extends React.Component {
    render() {
      if (this.props[onChangeFuncName]) {
        const isValid = validate(this.props);
        this.props[onChangeFuncName](elementName, isValid ? VALID : INVALID);
        return (
          <div>
            <ScrollElement name={elementName} />
            <WrappedComponent {...this.props} />
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}
