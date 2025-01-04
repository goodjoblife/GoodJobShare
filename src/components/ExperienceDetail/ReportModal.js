import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import { useParams } from 'react-router-dom';
import Modal from 'common/Modal';
import usePermission from 'hooks/usePermission';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import { queryExperienceIfUnfetched } from 'actions/experience';
import ReportForm from './ReportForm';
import { MODAL_TYPE } from './ReportForm/constants';
import PropTypes from 'prop-types';

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

  const renderModalChildren = useCallback(
    modalType => {
      switch (modalType) {
        case MODAL_TYPE.REPORT_DETAIL:
          return (
            <ReportForm
              close={() => handleIsModalOpen(false)}
              id={experienceId}
              onApiError={pload => {
                setModalClosableOnClickOutside(false);
                handleIsModalOpen(true, MODAL_TYPE.REPORT_API_ERROR, pload);
              }}
              onSuccess={() => {
                setModalClosableOnClickOutside(true);
                handleIsModalOpen(true, MODAL_TYPE.REPORT_SUCCESS);
              }}
            />
          );
        case MODAL_TYPE.REPORT_API_ERROR:
          return (
            <ApiErrorFeedback
              buttonClick={() => {
                setModalClosableOnClickOutside(false);
                handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
              }}
              message={modalPayload.message}
            />
          );
        case MODAL_TYPE.REPORT_SUCCESS:
          return (
            <ReportSuccessFeedback
              buttonClick={() => handleIsModalOpen(false)}
            />
          );
        default:
          return null;
      }
    },
    [
      experienceId,
      handleIsModalOpen,
      modalPayload.message,
      setModalClosableOnClickOutside,
    ],
  );

  return (
    <Modal
      isOpen={isModalOpen}
      close={() => handleIsModalOpen(false)}
      closableOnClickOutside={closableOnClickOutside}
      hasClose
    >
      {renderModalChildren(modalType, modalPayload)}
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
