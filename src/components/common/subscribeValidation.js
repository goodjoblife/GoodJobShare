import React from 'react';
import PropTypes from 'prop-types';
import { Element as ScrollElement } from 'react-scroll';

import { VALID, INVALID } from 'constants/formElements';

/**
 *
 * @param {*} WrappedComponent: The component to be wrapped
 * @param {*} validate: The validation function to validate target value, it should return true / false
 * @param {*} elementName: The element name for scrolling
 */
export default function subscribeValidation(
  WrappedComponent,
  validate,
  elementName,
) {
  return class Subscriber extends React.Component {
    static propTypes = {
      changeValidationStatus: PropTypes.func,
      elementName: PropTypes.string,
    };
    static defaultProps = {
      changeValidationStatus: undefined,
    };
    render() {
      if (this.props.changeValidationStatus) {
        const isValid = validate(this.props);
        const { changeValidationStatus, ...restProps } = this.props;
        changeValidationStatus(
          elementName || this.props.elementName,
          isValid ? VALID : INVALID,
        );
        return (
          <div>
            <ScrollElement name={elementName || this.props.elementName} />
            <WrappedComponent {...restProps} />
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}
