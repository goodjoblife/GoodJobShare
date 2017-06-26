import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './ButtonSubmit.module.css';

const isLogin = auth =>
  auth.get('status') === 'connected';

class ButtonSubmit extends React.PureComponent {
  render() {
    const { text, onSubmit, disabled, auth, login } = this.props;
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
            <div>
              <button
                className={styles.container}
                onClick={login}
                disabled={disabled}
              >
                <pre>{`以  f  認證，${text}`}</pre>
              </button>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '21px',
                }}
              >
                <p
                  className="pMbold"
                  style={{
                    color: '#C0C0C0',
                  }}
                >
                  為什麼需要 Facebook 帳戶驗證？
              </p>
              </div>
            </div>
        }
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
