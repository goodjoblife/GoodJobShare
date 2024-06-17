import React, { useEffect, Fragment } from 'react';
import { Wrapper, Section, Heading } from 'common/base';
import IconHeadingBlock from 'common/IconHeadingBlock';
import Loader from 'common/Loader';
import Comment2 from 'common/icons/Comment2';

import AuthMask from './AuthMask';
import ShareBlockElement from './ShareBlockElement';
import {
  useFetchMyPublishes,
  useToggleExperienceStatus,
  useToggleSalaryWorkTimeStatus,
  useToggleReplyStatus,
} from './useQuery';

const Me = () => {
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
        <AuthMask>
          <div>
            <Heading size="l" center>
              管理我的資料
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
        </AuthMask>
      </Wrapper>
    </Section>
  );
};

export default Me;
