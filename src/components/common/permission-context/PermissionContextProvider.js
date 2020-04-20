import React, { Component } from 'react';
import PermissionContext from './PermissionContext';

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

export default PermissionContextProvider;
