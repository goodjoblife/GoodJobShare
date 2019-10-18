import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';

import authStatus from '../../../constants/authStatus';
import LoginModal from '../../common/LoginModal';

const isLogin = auth => auth.get('status') === authStatus.CONNECTED;

const CallToLoginShareButton = ({
  notLoginText,
  isLoginText,
  to,
  auth,
  loginModal,
}) => {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <LoginModal
        isOpen={loginModal.isOpen}
        close={() => loginModal.setIsOpen(false)}
        loginModal={loginModal}
      />
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
            onClick={() => loginModal.setIsOpen(true)}
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
  loginModal: PropTypes.object.isRequired,
};

export default CallToLoginShareButton;
