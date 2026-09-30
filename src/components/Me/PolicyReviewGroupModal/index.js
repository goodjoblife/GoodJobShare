import PropTypes from 'prop-types';
import React from 'react';

import { Heading, P } from 'common/base';
import Modal from 'common/Modal';
import { formatSimpleDate } from 'utils/dateUtil';

import styles from './PolicyReviewGroupModal.module.css';

const PolicyReviewGroupModal = ({ group, isOpen, close }) => (
  <Modal isOpen={isOpen} close={close} size="m" closableOnClickOutside>
    {group && (
      <div className={styles.group}>
        <Heading size="sl" Tag="h3">
          {group.company.name} － {group.jobTitle}
        </Heading>
        <P size="s" className={styles.sharedAt}>
          分享於 {formatSimpleDate(new Date(group.createdAt))}
        </P>
      </div>
    )}
  </Modal>
);

PolicyReviewGroupModal.propTypes = {
  close: PropTypes.func.isRequired,
  group: PropTypes.shape({
    company: PropTypes.shape({ name: PropTypes.string }),
    createdAt: PropTypes.string,
    jobTitle: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
};

export default PolicyReviewGroupModal;
