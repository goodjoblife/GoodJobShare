import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import authStatus from '../../../constants/authStatus';
import FacebookFail from '../../ShareExperience/common/FacebookFail';

const isLogin = auth =>
  auth.get('status') === authStatus.CONNECTED;

const getFacebookFail = buttonClick => (
  <FacebookFail
    buttonClick={buttonClick}
  />
);

class CallToLoginShareButton extends React.PureComponent {

  onFacebookFail = () => {
    this.handleIsOpen(true);
    this.handleHasClose(true);
    return this.handleFeedback(getFacebookFail(this.login));
  }

  handleFeedback = feedback => {
    this.setState(() => ({
      feedback,
    }));
  }

  login = () => this.props.login(this.props.FB)
    .then(status => {
      if (status === authStatus.CONNECTED) {
        window.location.reload();
      } else {
        throw Error('can not login');
      }
    })
    .catch(e => {
      console.log(e);
      this.onFacebookFail();
    });

  render() {
    const { notLoginText, isLoginText, to, auth } = this.props;
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        {
          isLogin(auth) ?
            <Link
              className={cn('buttonCircleM', 'buttonBlack2')}
              to={to}
            >
              {isLoginText}
            </Link> :
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button
                className={cn('buttonCircleM', 'buttonBlack2')}
                onClick={this.login}
              >
                <pre>{notLoginText}</pre>
              </button>
            </div>
        }
      </div>
    );
  }
}

CallToLoginShareButton.propTypes = {
  notLoginText: PropTypes.string.isRequired,
  isLoginText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  auth: ImmutablePropTypes.map,
  login: PropTypes.func.isRequired,
  FB: PropTypes.object,
};

export default CallToLoginShareButton;
