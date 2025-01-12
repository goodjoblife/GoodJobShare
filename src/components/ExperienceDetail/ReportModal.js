import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import { useParams } from 'react-router-dom';
import Modal from 'common/Modal';
import usePermission from 'hooks/usePermission';
import { queryExperienceIfUnfetched } from 'actions/experience';
import PropTypes from 'prop-types';
import ModalContent from './MocalContent';

// from params
const experienceIdSelector = R.prop('id');
const useExperienceId = () => {
  const params = useParams();
  return experienceIdSelector(params);
};

const ReportModal = ({
  modalState,
  handleIsModalOpen,
  closableOnClickOutside,
  setModalClosableOnClickOutside,
}) => {
  const { isModalOpen, modalType, modalPayload } = modalState;
  const experienceId = useExperienceId();
  const [, fetchPermission] = usePermission({
    publishId: experienceId,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperienceIfUnfetched(experienceId));
  }, [dispatch, experienceId]);

  useEffect(() => {
    fetchPermission();
  }, [experienceId, fetchPermission]);

  return (
    <Modal
      isOpen={isModalOpen}
      close={() => handleIsModalOpen(false)}
      closableOnClickOutside={closableOnClickOutside}
      hasClose
    >
      <ModalContent
        modalType={modalType}
        modalPayload={modalPayload}
        experienceId={experienceId}
        handleIsModalOpen={handleIsModalOpen}
        setModalClosableOnClickOutside={setModalClosableOnClickOutside}
      />
    </Modal>
  );
};

export default ReportModal;

ReportModal.propTypes = {
  closableOnClickOutside: PropTypes.bool.isRequired,
  handleIsModalOpen: PropTypes.func.isRequired,
  modalState: PropTypes.shape({
    isModalOpen: PropTypes.bool.isRequired,
    modalPayload: PropTypes.any,
    modalType: PropTypes.string.isRequired,
  }).isRequired,
  setModalClosableOnClickOutside: PropTypes.func.isRequired,
};
