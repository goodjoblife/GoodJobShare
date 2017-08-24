import React, { Component, PropTypes } from 'react';

import { Wrapper, Section, Heading } from 'common/base';
import IconHeadingBlock from 'common/IconHeadingBlock';
import { Comment2 } from 'common/icons';

import styles from './Me.module.css';
import ShareBlockElement from './ShareBlockElement';
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
        <Wrapper size="m">
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
            <div>
              <Heading size="l" center>
                {this.props.auth.getIn(['user', 'name'])}&nbsp;&nbsp;的個人頁面
              </Heading>
              <IconHeadingBlock heading="我分享的資料" Icon={Comment2} marginTop noPadding>
                <div>
                  <ShareBlockElement
                    type="面試"
                    heading="日月光半導體面試經驗分享"
                    to="/"
                    disabled
                  />
                  <ShareBlockElement
                    type="工作"
                    heading="在亞熱帶低碳發展中心待了1年"
                    to="/"
                  />
                  <ShareBlockElement
                    type="薪時"
                    heading="大亞電線電纜股份有限公司"
                    position="助理管理師"
                    to="/"
                  />
                  <ShareBlockElement
                    type="留言"
                    heading="欽瑞工業股份有限公司 面試經驗分享"
                    comment="個情問體之她品商家為持禮爭平晚去光意母家入車弟實關人不量聽。面不天正三要知直色，此中分坡代女的他好我。"
                    to="/"
                  />
                </div>
              </IconHeadingBlock>
            </div>
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
