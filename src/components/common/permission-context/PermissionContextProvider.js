import React, { Component } from 'react';
import PermissionContext from './PermissionContext';

class PermissionContextProvider extends Component {
  constructor(props) {
    super(props);

    this.setCanView = state => {
      this.setState(state);
    };

    this.state = {
      canView: null,
      setCanView: this.setCanView,
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
