import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Wrapper, Section, Heading } from 'common/base';
import IconHeadingBlock from 'common/IconHeadingBlock';
import Loader from 'common/Loader';
import { Comment2 } from 'common/icons';

import styles from './Me.module.css';
import ShareBlockElement from './ShareBlockElement';
import authStatus from '../../constants/authStatus';
import status from '../../constants/status';

class Me extends Component {
  static propTypes = {
    fetchMyExperiences: PropTypes.func.isRequired,
    fetchMyWorkings: PropTypes.func.isRequired,
    fetchMyReplies: PropTypes.func.isRequired,
    setExperienceStatus: PropTypes.func.isRequired,
    setWorkingStatus: PropTypes.func.isRequired,
    setReplyStatus: PropTypes.func.isRequired,
    me: ImmutablePropTypes.map.isRequired,
  }

  constructor(props) {
    super(props);
    const { getLoginStatus, FB, getMe } = this.props;
    getLoginStatus(FB)
      .then(() => getMe(FB))
      .catch(() => {});
  }

  componentDidMount() {
    this.props.fetchMyExperiences();
    this.props.fetchMyWorkings();
    this.props.fetchMyReplies();
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
    const { me } = this.props;
    const data = me.toJS();
    const { experiences } = data.myExperiences;
    const workings = data.myWorkings.time_and_salary;
    const { replies } = data.myReplies;

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
                  {
                    data.myExperiencesStatus === status.FETCHING
                    ? <Loader size="s" />
                    : (experiences || []).map(o => (
                      <ShareBlockElement
                        key={o._id}
                        type={o.type === 'work' ? '工作' : '面試'}
                        heading={o.title}
                        to={`/experiences/${o._id}?backable=true`}
                        disabled={o.status === 'hidden'}
                        publishHandler={() => {
                          this.props.setExperienceStatus(o);
                        }}
                      />
                    ))
                  }
                  {
                    data.myWorkingsStatus === status.FETCHING
                    ? <Loader size="s" />
                    : (workings || []).map(o => (
                      <ShareBlockElement
                        key={o._id}
                        type="薪時"
                        heading={o.company.name}
                        position={o.job_title}
                        to={o.company.name}
                        disabled={o.status === 'hidden'}
                        publishHandler={() => {
                          this.props.setWorkingStatus(o);
                        }}
                      />
                    ))
                  }
                  {
                    data.myRepliesStatus === status.FETCHING
                    ? <Loader size="s" />
                    : (replies || []).map(o => (
                      <ShareBlockElement
                        key={o._id}
                        type="留言"
                        heading={o.experience.title}
                        comment={o.content}
                        to={`/experiences/${o.experience._id}`}
                        disabled={o.status === 'hidden'}
                        publishHandler={() => {
                          this.props.setReplyStatus(o);
                        }}
                        options={{ replyId: o._id }}
                      />
                    ))
                  }
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
