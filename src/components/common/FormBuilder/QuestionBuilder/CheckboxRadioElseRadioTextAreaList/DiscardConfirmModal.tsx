import React from 'react';

import ConfirmModal from 'common/FormBuilder/Modals/ConfirmModal';

export enum DiscardAction {
  CANCEL = 'cancel',
  CLEAR = 'clear',
}

const confirmLabels: Record<DiscardAction, string> = {
  [DiscardAction.CANCEL]: '取消',
  [DiscardAction.CLEAR]: '清除',
};

type Props = {
  action: DiscardAction;
  onConfirm: () => void;
  onDismiss: () => void;
};

const DiscardConfirmModal = ({
  action,
  onConfirm,
  onDismiss,
}: Props): React.ReactElement => {
  const label = confirmLabels[action];

  return (
    <ConfirmModal
      isOpen
      title={`確定要${label}？`}
      description={`${label}之後填寫的內容將會消失`}
      close={onDismiss}
      closableOnClickOutside
      actions={[[`確定${label}`, onConfirm], ['繼續編輯', onDismiss, 'white']]}
    />
  );
};

export default DiscardConfirmModal;
