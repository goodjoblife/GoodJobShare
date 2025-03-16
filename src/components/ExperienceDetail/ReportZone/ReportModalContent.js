import React from 'react';
import PropTypes from 'prop-types';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ReportForm from './ReportForm';
import { MODAL_TYPE } from './ReportForm/constants';
import ReportList from './ReportList';

const ReportModalContent = ({
  modalType,
  modalPayload,
  reportType,
  id,
  reports,
  reportCount,
  onCloseReport,
  onShowReportForm,
  onShowReportList,
  onReportFormError,
  onReportFormSuccess,
}) => {
  switch (modalType) {
    case MODAL_TYPE.REPORT_LIST:
      return (
        <ReportList
          reports={reports}
          reportCount={reportCount}
          onShowReportForm={onShowReportForm}
        />
      );
    case MODAL_TYPE.REPORT_FORM:
      return (
        <ReportForm
          reportType={reportType}
          close={() => onCloseReport(modalType)}
          id={id}
          onApiError={payload => onReportFormError(payload)}
          onSuccess={payload => onReportFormSuccess(payload)}
        />
      );

    case MODAL_TYPE.REPORT_API_ERROR:
      return (
        <ApiErrorFeedback
          buttonClick={onShowReportList}
          message={modalPayload?.message}
        />
      );

    case MODAL_TYPE.REPORT_SUCCESS:
      return (
        <ReportSuccessFeedback buttonClick={() => onCloseReport(modalType)} />
      );

    default:
      return null;
  }
};

ReportModalContent.propTypes = {
  id: PropTypes.string,
  modalPayload: PropTypes.object,
  modalType: PropTypes.string.isRequired,
  onCloseReport: PropTypes.func,
  onReportFormError: PropTypes.func,
  onReportFormSuccess: PropTypes.func,
  onShowReportForm: PropTypes.func,
  onShowReportList: PropTypes.func,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.array,
};

export default ReportModalContent;
