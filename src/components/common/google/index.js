import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { loginWithGoogle as loginGoogle } from '../../../actions/auth';
import authStatus from '../../../constants/authStatus';

const hoc = Component => {
  return props => {
    const login = async () => {
      if (!window || !window.gapi) return false;
      const { auth2 } = window.gapi;
      const googleAuth = auth2.getAuthInstance();
      return (await props.loginGoogle(googleAuth)) === authStatus.CONNECTED;
    };
    return <Component loginWithGoogle={login} {...props} />;
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginGoogle }, dispatch);

export const withGoogle = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  hoc,
);
