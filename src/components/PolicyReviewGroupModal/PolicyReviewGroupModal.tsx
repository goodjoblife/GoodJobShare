import React, { useEffect } from 'react';

import Modal from 'common/Modal';

import PolicyReviewGroupDetail from './PolicyReviewGroupDetail';
import { useFetchPolicyReviewGroupBox } from './useQuery';

type Props = {
  open: boolean;
  groupId?: string;
  onClose: () => void;
};

const PolicyReviewGroupModal: React.FC<Props> = ({
  open,
  groupId,
  onClose,
}) => {
  const [
    box,
    fetchPolicyReviewGroup,
    clearPolicyReviewGroup,
  ] = useFetchPolicyReviewGroupBox();

  useEffect(() => {
    if (open && groupId) {
      fetchPolicyReviewGroup(groupId);
    } else {
      clearPolicyReviewGroup();
    }
  }, [open, groupId, fetchPolicyReviewGroup, clearPolicyReviewGroup]);

  return (
    <Modal isOpen={open} close={onClose} size="m" closableOnClickOutside>
      <PolicyReviewGroupDetail box={box} />
    </Modal>
  );
};

export default PolicyReviewGroupModal;
