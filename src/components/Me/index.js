import React, { Component, PropTypes } from 'react';

import { Wrapper, Section, Heading } from 'common/base';
import styles from './Me.module.css';

import authStatus from '../../constants/authStatus';

class Me extends Component {
  constructor(props) {
    super(props);
    const { getLoginStatus, FB, getMe } = this.props;
    getLoginStatus(FB)
      .then(() => getMe(FB))
      .catch(() => {});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.FB !== this.props.FB) {
      // FB instance changed
      const { getLoginStatus, FB } = this.props;

      getLoginStatus(FB)
        .catch(() => {});
    }

    if (prevProps.auth.get('status') !== this.props.auth.get('status') &&
      this.props.auth.get('status') === authStatus.CONNECTED) {
      const { getMe, FB } = this.props;
      getMe(FB).catch(() => {});
    }
  }

  login = () => {
    const { login, FB } = this.props;
    login(FB)
      .catch(() => {});
  }

  render() {
    return (
      <Section pageTop paddingBottom>
        <Wrapper size="l">
          {
            this.props.auth.getIn(['user', 'name']) === null &&
            <div>
              <Heading size="l" center>登入以查看個人頁面</Heading>
              <div className={styles.loginBtnSection}>
                <button className="buttonCircleM buttonBlackLine" onClick={this.login}>facebook 登入</button>
              </div>
            </div>
          }
          {
            this.props.auth.getIn(['user', 'name']) !== null &&
            <Heading size="l" center>
              {this.props.auth.getIn(['user', 'name'])}&nbsp;&nbsp;的個人頁面
            </Heading>
          }
        </Wrapper>
      </Section>
    );
  }
}
Me.propTypes = {
  login: PropTypes.func.isRequired,
  getLoginStatus: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
  auth: PropTypes.object,
  FB: PropTypes.object,
};

export default Me;
