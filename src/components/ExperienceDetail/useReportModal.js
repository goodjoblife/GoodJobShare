import { useState, useCallback } from 'react';

export function useReportModal() {
  const [modalState, setModal] = useState({
    isModalOpen: false,
    modalType: '',
    modalPayload: {},
  });

  const [closableOnClickOutside, setModalClosableOnClickOutside] = useState(
    true,
  );

  const handleIsModalOpen = useCallback(
    (isModalOpen, modalType = '', modalPayload = {}) => {
      setModal({ isModalOpen, modalType, modalPayload });
    },
    [],
  );

  return {
    modalState,
    handleIsModalOpen,
    closableOnClickOutside,
    setModalClosableOnClickOutside,
  };
}
