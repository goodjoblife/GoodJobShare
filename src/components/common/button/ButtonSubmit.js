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
    this.props.login(this.props.FB)
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { text, onSubmit, disabled, auth } = this.props;
    return (
      isLogin(auth) ?
        <button
          className={styles.container}
          onClick={onSubmit}
          disabled={disabled}
        >
          {text}
        </button> :
        <button
          className={styles.container}
          onClick={() =>
            this.login()
              .then(onSubmit)
          }
          disabled={disabled}
        >
          {`以F認證，${text}`}
        </button>
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
