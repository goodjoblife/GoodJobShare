import PropTypes from 'prop-types';
import React from 'react';

import { Heading, P } from 'common/base';
import DividedList, { DividedListItem } from 'common/DividedList';
import Modal from 'common/Modal';
import BoxRenderer from 'common/StatusRenderer';
import { policyAnswerOf, policyTranslation } from 'constants/policy';
import { formatSimpleDate } from 'utils/dateUtil';
import { fetchBoxPropType } from 'utils/fetchBox';

import styles from './PolicyReviewGroupModal.module.css';

const PolicyReviewGroupModal = ({ box, isOpen, close }) => (
  <Modal isOpen={isOpen} close={close} size="m" closableOnClickOutside>
    <BoxRenderer
      box={box}
      render={group => (
        <div className={styles.group}>
          <Heading size="sl" Tag="h3">
            {group.company.name} － {group.jobTitle}
          </Heading>
          {group.sector && (
            <P size="s" className={styles.sector}>
              {group.sector}
            </P>
          )}
          <P size="s" className={styles.sharedAt}>
            分享於 {formatSimpleDate(new Date(group.createdAt))}
          </P>
          <DividedList className={styles.policyReviews}>
            {group.policyReviews.map(policyReview => (
              <DividedListItem
                key={policyReview.policy}
                label={policyTranslation[policyReview.policy]}
              >
                <P size="m" className={styles.answer}>
                  {policyAnswerOf(policyReview)}
                </P>
                {policyReview.review && (
                  <P size="m" className={styles.review}>
                    {policyReview.review}
                  </P>
                )}
              </DividedListItem>
            ))}
          </DividedList>
        </div>
      )}
    />
  </Modal>
);

PolicyReviewGroupModal.propTypes = {
  box: fetchBoxPropType.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

export default PolicyReviewGroupModal;
