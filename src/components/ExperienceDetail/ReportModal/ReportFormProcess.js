import React from 'react';
import PropTypes from 'prop-types';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ReportForm from './ReportForm';
import { MODAL_TYPE } from './ReportForm/constants';

const ReportFormProcess = ({
  modalType,
  handleIsModalOpen,
  modalPayload,
  setModalClosableOnClickOutside,
  reportType,
  id,
  setIsShowReportList,
}) => {
  switch (modalType) {
    case MODAL_TYPE.REPORT_DETAIL:
      return (
        <ReportForm
          reportType={reportType}
          close={() => {
            setIsShowReportList(true);
            handleIsModalOpen(false);
          }}
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

ReportFormProcess.propTypes = {
  handleIsModalOpen: PropTypes.func.isRequired,
  id: PropTypes.string,
  modalPayload: PropTypes.object,
  modalType: PropTypes.string.isRequired,
  reportType: PropTypes.string,
  setIsShowReportList: PropTypes.func.isRequired,
  setModalClosableOnClickOutside: PropTypes.func.isRequired,
};

export default ReportFormProcess;
