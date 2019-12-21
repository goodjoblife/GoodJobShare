import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const windowSize = state.windowSize.toJS();
  console.log('windowSize', JSON.stringify(windowSize));
  return { windowSize };
};

export default WrappedComponent => {
  class WithWindowResize extends Component {
    static propTypes = {
      windowSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    };
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    mapStateToProps,
    null,
  )(WithWindowResize);
};
