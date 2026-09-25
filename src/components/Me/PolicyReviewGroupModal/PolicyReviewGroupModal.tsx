import React from 'react';

import { Heading, P } from 'common/base';
import Modal from 'common/Modal';
import {
  complianceTranslation,
  hasPolicyTranslation,
  policyTranslation,
  remoteWorkPolicyTranslation,
  YesNoOrUnknown,
} from 'constants/policy';

import {
  PolicyReviewGroup,
  PolicyReviewInGroup,
} from '../fakePolicyReviewGroups';
import styles from './PolicyReviewGroupModal.module.css';

// 「有無該制度」以外的補充說明：遠端工作看天數，請假類看是否符合法規
const answerDetailOf = ({
  hasPolicy,
  compliance,
  remoteWorkPolicy,
}: PolicyReviewInGroup): string | null => {
  if (hasPolicy !== YesNoOrUnknown.YES) return null;
  if (remoteWorkPolicy) return remoteWorkPolicyTranslation[remoteWorkPolicy];
  if (compliance) return complianceTranslation[compliance];
  return null;
};

type Props = {
  policyReviewGroup: PolicyReviewGroup | null;
  close: () => void;
};

const PolicyReviewGroupModal: React.FC<Props> = ({
  policyReviewGroup,
  close,
}) => (
  <Modal
    isOpen={!!policyReviewGroup}
    close={close}
    closableOnClickOutside
    size="m"
    contentClassName={styles.modalContent}
  >
    {policyReviewGroup && (
      <div>
        <Heading size="sl" Tag="h2">
          {policyReviewGroup.company.name} - {policyReviewGroup.jobTitle}
        </Heading>
        {policyReviewGroup.sector && (
          <P size="s" className={styles.sector}>
            {policyReviewGroup.sector}
          </P>
        )}
        <ul className={styles.policyList}>
          {policyReviewGroup.policyReviews.map(policyReview => {
            const answerDetail = answerDetailOf(policyReview);
            return (
              <li key={policyReview.id} className={styles.policyItem}>
                <P size="l" bold>
                  {policyTranslation[policyReview.policy]}
                </P>
                <P size="m" className={styles.answer}>
                  {hasPolicyTranslation[policyReview.hasPolicy]}
                  {answerDetail && `・${answerDetail}`}
                </P>
                {policyReview.review && (
                  <P size="m" className={styles.review}>
                    {policyReview.review}
                  </P>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </Modal>
);

export default PolicyReviewGroupModal;
