import React, { Component } from 'react';

export default (keyName = 'modal') => WrappedComponent => {
  class WithModal extends Component {
    state = {
      isOpen: false,
    };

    setIsOpen = isOpen => {
      this.setState({
        isOpen,
      });
    };

    render() {
      const props = {
        [keyName]: {
          isOpen: this.state.isOpen,
          setIsOpen: this.setIsOpen,
        },
        ...this.props,
      };
      return <WrappedComponent {...props} />;
    }
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithModal.displayName = `withModal(${displayName})`;
  WithModal.fetchData = WrappedComponent.fetchData;

  return WithModal;
};
