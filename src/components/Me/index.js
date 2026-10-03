import React, { Fragment, useEffect } from 'react';

import { Heading, Section, Wrapper } from 'common/base';
import IconHeadingBlock from 'common/IconHeadingBlock';
import Comment2 from 'common/icons/Comment2';
import BoxRenderer from 'common/StatusRenderer';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';

import AuthMask from './AuthMask';
import ShareBlockElement from './ShareBlockElement';
import { sortByCreatedAtDesc } from './sortByCreatedAtDesc';
import {
  useFetchMyPublishesBox,
  useToggleExperienceStatus,
  useToggleReplyStatus,
  useToggleSalaryWorkTimeStatus,
} from './useQuery';

const Me = () => {
  const [myPublishesBox, fetchMyPublishes] = useFetchMyPublishesBox();
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
                <BoxRenderer
                  box={myPublishesBox}
                  render={({ me }) => (
                    <Fragment>
                      {sortByCreatedAtDesc([
                        ...me.experiences.map(o => ({
                          createdAt: o.created_at,
                          element: (
                            <ShareBlockElement
                              key={`experience-${o.id}`}
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
                          ),
                        })),
                        ...me.salary_work_times.map(o => ({
                          createdAt: o.created_at,
                          element: (
                            <ShareBlockElement
                              key={`salary-work-time-${o.id}`}
                              type="薪時"
                              heading={o.company.name}
                              position={o.job_title.name}
                              to={generateTabURL({
                                pageType: PageType.COMPANY,
                                pageName: o.company.name,
                                tabType: TabType.TIME_AND_SALARY,
                              })}
                              linkTitle="檢視薪時"
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
                          ),
                        })),
                        ...(me.replies || []).map(o => ({
                          createdAt: o.created_at,
                          element: (
                            <ShareBlockElement
                              key={`reply-${o.id}`}
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
                          ),
                        })),
                      ]).map(({ element }) => element)}
                    </Fragment>
                  )}
                />
              </div>
            </IconHeadingBlock>
          </div>
        </AuthMask>
      </Wrapper>
    </Section>
  );
};

export default Me;
