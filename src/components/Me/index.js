import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Section, Heading } from 'common/base';
import IconHeadingBlock from 'common/IconHeadingBlock';
import Loader from 'common/Loader';
import { Comment2 } from 'common/icons';
import styles from './Me.module.css';
import ShareBlockElement from './ShareBlockElement';
import {
  useFetchMyPublishes,
  useToggleExperienceStatus,
  useToggleSalaryWorkTimeStatus,
  useToggleReplyStatus,
} from './useQuery';

const Me = props => {
  const login = () => {
    const { login, FB } = props;
    FB && login(FB);
  };

  const [myPublishesState, fetchMyPublishes] = useFetchMyPublishes();
  const toggleExperienceStatus = useToggleExperienceStatus();
  const toggleSalaryWorkTimeStatus = useToggleSalaryWorkTimeStatus();
  const toggleReplyStatus = useToggleReplyStatus();

  useEffect(() => {
    fetchMyPublishes();
  }, [fetchMyPublishes]);

  return (
    <Section pageTop paddingBottom>
      <Wrapper size="m">
        {props.auth.getIn(['user', 'name']) === null && (
          <div>
            <Heading size="l" center>
              登入以查看個人頁面
            </Heading>
            <div className={styles.loginBtnSection}>
              <button className="buttonCircleM buttonBlackLine" onClick={login}>
                facebook 登入
              </button>
            </div>
          </div>
        )}
        {props.auth.getIn(['user', 'name']) !== null && (
          <div>
            <Heading size="l" center>
              {props.auth.getIn(['user', 'name'])}
              &nbsp;&nbsp;的個人頁面
            </Heading>
            <IconHeadingBlock
              heading="我分享的資料"
              Icon={Comment2}
              marginTop
              noPadding
            >
              <div>
                {myPublishesState.loading && <Loader size="s" />}
                {!myPublishesState.loading &&
                  !myPublishesState.error &&
                  myPublishesState.value && (
                    <Fragment>
                      {myPublishesState.value.me.experiences.map(o => (
                        <ShareBlockElement
                          key={o.id}
                          type={o.type === 'work' ? '工作' : '面試'}
                          heading={o.title}
                          to={`/experiences/${o.id}?backable=true`}
                          disabled={
                            o.status === 'hidden' ||
                            (o.archive && o.archive.is_archived)
                          }
                          publishHandler={async () => {
                            await toggleExperienceStatus(o);
                            await fetchMyPublishes();
                          }}
                          archive={o.archive}
                        />
                      ))}
                      {myPublishesState.value.me.salary_work_times.map(o => (
                        <ShareBlockElement
                          key={o.id}
                          type="薪時"
                          heading={o.company.name}
                          position={o.job_title.name}
                          to={o.company.name}
                          disabled={
                            o.status === 'hidden' ||
                            (o.archive && o.archive.is_archived)
                          }
                          publishHandler={async () => {
                            await toggleSalaryWorkTimeStatus(o);
                            await fetchMyPublishes();
                          }}
                          archive={o.archive}
                        />
                      ))}
                      {(myPublishesState.value.me.replies || []).map(o => (
                        <ShareBlockElement
                          key={o.id}
                          type="留言"
                          heading={o.experience ? o.experience.title : ''}
                          comment={o.content}
                          to={`/experiences/${
                            o.experience ? o.experience.id : ''
                          }`}
                          disabled={o.status === 'hidden'}
                          publishHandler={async () => {
                            await toggleReplyStatus(o);
                            await fetchMyPublishes();
                          }}
                          options={{ replyId: o.id }}
                        />
                      ))}
                    </Fragment>
                  )}
              </div>
            </IconHeadingBlock>
          </div>
        )}
      </Wrapper>
    </Section>
  );
};

Me.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object,
  FB: PropTypes.object,
};

export default Me;
