import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';

import authStatus from '../../../constants/authStatus';

const isLogin = auth => auth.get('status') === authStatus.CONNECTED;

const CallToLoginShareButton = ({
  notLoginText,
  isLoginText,
  to,
  auth,
  login,
  FB,
}) => {
  const onClick = () => {
    login(FB).catch(e => {
      console.log(e);
    });
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {isLogin(auth) ? (
        <Link className={cn('buttonCircleM', 'buttonBlack2')} to={to}>
          {isLoginText}
        </Link>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <button
            className={cn('buttonCircleM', 'buttonBlack2')}
            onClick={onClick}
          >
            <pre>{notLoginText}</pre>
          </button>
        </div>
      )}
    </div>
  );
};

CallToLoginShareButton.propTypes = {
  notLoginText: PropTypes.string.isRequired,
  isLoginText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  auth: ImmutablePropTypes.map,
  login: PropTypes.func.isRequired,
  FB: PropTypes.object,
};

export default CallToLoginShareButton;
