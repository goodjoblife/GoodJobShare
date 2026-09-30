import React, { Fragment, useEffect, useState } from 'react';

import { Heading, Section, Wrapper } from 'common/base';
import IconHeadingBlock from 'common/IconHeadingBlock';
import Comment2 from 'common/icons/Comment2';
import BoxRenderer from 'common/StatusRenderer';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';

import AuthMask from './AuthMask';
import { byPolicyReviewGroup } from './byPolicyReviewGroup';
import PolicyReviewGroupModal from './PolicyReviewGroupModal';
import ShareBlockElement from './ShareBlockElement';
import {
  useFetchMyPublishesBox,
  useToggleExperienceStatus,
  useTogglePolicyReviewGroupStatus,
  useToggleReplyStatus,
  useToggleSalaryWorkTimeStatus,
} from './useQuery';

const Me = () => {
  const [myPublishesBox, fetchMyPublishes] = useFetchMyPublishesBox();
  const toggleExperienceStatus = useToggleExperienceStatus();
  const toggleSalaryWorkTimeStatus = useToggleSalaryWorkTimeStatus();
  const togglePolicyReviewGroupStatus = useTogglePolicyReviewGroupStatus();
  const toggleReplyStatus = useToggleReplyStatus();
  const [openedPolicyReviewGroup, setOpenedPolicyReviewGroup] = useState(null);

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
                      {me.experiences.map(o => (
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
                      {me.salary_work_times.map(o => (
                        <ShareBlockElement
                          key={o.id}
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
                      ))}
                      {byPolicyReviewGroup(me.policyReviewGroupList).map(o => (
                        <ShareBlockElement
                          key={o.groupId}
                          type="制度"
                          heading={o.company.name}
                          position={o.jobTitle}
                          onTitleClick={() => setOpenedPolicyReviewGroup(o)}
                          disabled={
                            o.status === 'hidden' ||
                            (o.archive && o.archive.is_archived)
                          }
                          publishHandler={async () => {
                            await togglePolicyReviewGroupStatus(o);
                            await fetchMyPublishes();
                          }}
                          archive={o.archive}
                        />
                      ))}
                      {(me.replies || []).map(o => (
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
                />
              </div>
            </IconHeadingBlock>
          </div>
        </AuthMask>
      </Wrapper>
      <PolicyReviewGroupModal
        group={openedPolicyReviewGroup}
        isOpen={openedPolicyReviewGroup !== null}
        close={() => setOpenedPolicyReviewGroup(null)}
      />
    </Section>
  );
};

export default Me;
