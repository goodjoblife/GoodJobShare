import React from 'react';
import PropTypes from 'prop-types';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ReportForm from './ReportForm';
import { MODAL_TYPE, REPORT_TYPE } from './ReportForm/constants';

const ModalContent = ({
  modalType,
  handleIsModalOpen,
  modalPayload,
  setModalClosableOnClickOutside,
  reportType,
  id,
}) => {
  switch (modalType) {
    case MODAL_TYPE.REPORT_DETAIL:
      return (
        <ReportForm
          reportType={reportType}
          close={() => handleIsModalOpen(false)}
          id={id}
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
  handleIsModalOpen: PropTypes.func.isRequired,
  id: PropTypes.string,
  modalPayload: PropTypes.object,
  modalType: PropTypes.string.isRequired,
  reportType: PropTypes.string,
  setModalClosableOnClickOutside: PropTypes.func.isRequired,
};

ModalContent.defaultProps = {
  reportType: REPORT_TYPE.EXPERIENCE,
};

export default ModalContent;
