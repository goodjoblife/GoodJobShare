import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { Heading, Section, Wrapper } from 'common/base';
import IconHeadingBlock from 'common/IconHeadingBlock';
import Comment2 from 'common/icons/Comment2';
import BoxRenderer from 'common/StatusRenderer';

import AuthMask from './AuthMask';
import fakePolicyReviewGroups from './fakePolicyReviewGroups';
import PolicyReviewGroupModal from './PolicyReviewGroupModal';
import ShareBlockElement from './ShareBlockElement';
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

  // TODO: 後端 me.policyReviewGroupList 接上後改成從 query 取得，隱藏改打
  //       changePolicyReviewGroupStatus
  const [policyReviewGroups, setPolicyReviewGroups] = useState(
    fakePolicyReviewGroups,
  );
  const [openedPolicyReviewGroup, setOpenedPolicyReviewGroup] = useState(null);

  const togglePolicyReviewGroupStatus = useCallback(groupId => {
    setPolicyReviewGroups(groups =>
      groups.map(group =>
        group.groupId === groupId
          ? {
              ...group,
              status: group.status === 'published' ? 'hidden' : 'published',
            }
          : group,
      ),
    );
  }, []);

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
                      {/* 制度沒有獨立頁面，點標題開彈窗看內容 */}
                      {policyReviewGroups.map(o => (
                        <ShareBlockElement
                          key={o.groupId}
                          type="制度"
                          heading={o.company.name}
                          position={o.jobTitle}
                          onHeadingClick={() => setOpenedPolicyReviewGroup(o)}
                          disabled={
                            o.status === 'hidden' || o.archive.is_archived
                          }
                          publishHandler={() =>
                            togglePolicyReviewGroupStatus(o.groupId)
                          }
                          archive={o.archive}
                        />
                      ))}
                    </Fragment>
                  )}
                />
              </div>
            </IconHeadingBlock>
          </div>
        </AuthMask>
        <PolicyReviewGroupModal
          policyReviewGroup={openedPolicyReviewGroup}
          close={() => setOpenedPolicyReviewGroup(null)}
        />
      </Wrapper>
    </Section>
  );
};

export default Me;
