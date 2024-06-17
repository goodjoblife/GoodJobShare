import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PermissionContext from 'contexts/PermissionContext';

class PermissionContextProvider extends Component {
  constructor(props) {
    super(props);

    this.setPermissionState = state => this.setState(state);

    this.state = {
      canView: true,
      permissionFetched: false,
      setPermissionState: this.setPermissionState,
    };
  }

  render() {
    return (
      <PermissionContext.Provider value={this.state}>
        {this.props.children}
      </PermissionContext.Provider>
    );
  }
}

PermissionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PermissionContextProvider;
