import React from 'react';
import PropTypes from 'prop-types';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ReportForm from './ReportForm';
import { MODAL_TYPE } from './ReportForm/constants';

const ModalContent = ({
  modalType,
  experienceId,
  handleIsModalOpen,
  modalPayload,
  setModalClosableOnClickOutside,
}) => {
  switch (modalType) {
    case MODAL_TYPE.REPORT_DETAIL:
      return (
        <ReportForm
          close={() => handleIsModalOpen(false)}
          id={experienceId}
          onApiError={payload => {
            setModalClosableOnClickOutside(false);
            handleIsModalOpen(true, MODAL_TYPE.REPORT_API_ERROR, payload);
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
          message={modalPayload?.message}
        />
      );

    case MODAL_TYPE.REPORT_SUCCESS:
      return (
        <ReportSuccessFeedback buttonClick={() => handleIsModalOpen(false)} />
      );

    default:
      return null;
  }
};
ModalContent.propTypes = {
  experienceId: PropTypes.string.isRequired,
  handleIsModalOpen: PropTypes.func.isRequired,
  modalPayload: PropTypes.object,
  modalType: PropTypes.string.isRequired,
  setModalClosableOnClickOutside: PropTypes.func.isRequired,
};

export default ModalContent;
