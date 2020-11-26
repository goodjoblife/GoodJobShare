import React, { Component } from 'react';
import PermissionContext from './PermissionContext';

const firstTimeView = () => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem('visitedWebsite') === null;
  }
  return true;
};
class PermissionContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTimeView: firstTimeView(),
    };
  }

  componentDidMount() {
    if (typeof Storage !== 'undefined') {
      const visitedWebsite = localStorage.getItem('visitedWebsite');
      if (visitedWebsite === null) {
        localStorage.setItem('visitedWebsite', true);
      }
    }
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
