import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './ButtonSubmit.module.css';

const isLogin = auth =>
  auth.get('status') === 'connected';

class ButtonSubmit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }
  login() {
    return this.props.login(this.props.FB)
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { text, onSubmit, disabled, auth } = this.props;
    return (
      <div
        style={{
          // display: 'flex',
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
                onClick={() =>
                  this.login()
                    .then(onSubmit)
                }
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
  FB: PropTypes.object,
};

export default ButtonSubmit;
