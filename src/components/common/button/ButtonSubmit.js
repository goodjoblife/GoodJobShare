import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cn from 'classnames';
import Modal from 'common/Modal';

import authStatus from '../../../constants/authStatus';

import WhyFacebookAuth from './WhyFacebookAuth';

import styles from './ButtonSubmit.module.css';

const isLogin = auth =>
  auth.get('status') === authStatus.CONNECTED;

const getWhyFacebookAuth = onClick => (
  <WhyFacebookAuth
    buttonClick={onClick}
  />
);

class ButtonSubmit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      feedback: null,
    };
  }

  handleIsOpen = isOpen => (
    this.setState({
      isOpen,
    })
  )

  handleFeedback = feedback => (
    this.setState({
      feedback,
    })
  )

  render() {
    const { text, onSubmit, disabled, auth, login } = this.props;
    const { isOpen, feedback } = this.state;
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        {
          isLogin(auth) ?
            <button
              className={styles.container}
              onClick={onSubmit}
              disabled={disabled}
            >
              {text}
            </button> :
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button
                className={styles.container}
                onClick={login}
                disabled={disabled}
              >
                <pre>{`以  f  認證，${text}`}</pre>
              </button>
              <div
                style={{
                  marginTop: '21px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  this.handleIsOpen(true);
                  return this.handleFeedback(getWhyFacebookAuth(
                    () => this.handleIsOpen(false)
                  ));
                }}
              >
                <p
                  className={cn('pMbold', styles.whyFB)}
                >
                  為什麼需要 Facebook 帳戶驗證？
              </p>
              </div>
            </div>
        }
        <Modal
          isOpen={isOpen}
          close={() => this.handleIsOpen(!isOpen)}
          hasClose={false}
        >
          {feedback}
        </Modal>
      </div>
    );
  }
}

ButtonSubmit.propTypes = {
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  auth: ImmutablePropTypes.map,
  login: PropTypes.func.isRequired,
};

export default ButtonSubmit;
