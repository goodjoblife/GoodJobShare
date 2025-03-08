import React, { useCallback, useState } from 'react';
import Modal from 'common/Modal';
import PropTypes from 'prop-types';
import { MODAL_TYPE } from './ReportForm/constants';
import ReportForm from './ReportForm';
import ReportList from './ReportList';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';

const ReportZone = ({
  children,
  reportType,
  id,
  reports,
  reportCount,
  renderButton: Button = 'button',
}) => {
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    modalType: MODAL_TYPE.REPORT_LIST,
    modalPayload: {},
  });
  const { isModalOpen, modalType, modalPayload } = modalState;
  const [closableOnClickOutside, setModalClosableOnClickOutside] = useState(
    true,
  );

  const setModalOpen = useCallback(
    (isModalOpen, modalType = '', modalPayload = {}) => {
      setModalState({ isModalOpen, modalType, modalPayload });
    },
    [],
  );

  const handleShowReportList = () => {
    setModalClosableOnClickOutside(true);
    setModalOpen(true, MODAL_TYPE.REPORT_LIST);
  };

  const handleShowReportForm = () => {
    setModalClosableOnClickOutside(false);
    setModalOpen(true, MODAL_TYPE.REPORT_FORM);
  };

  const handleReportFormError = payload => {
    setModalClosableOnClickOutside(false);
    setModalOpen(true, MODAL_TYPE.REPORT_API_ERROR, payload);
  };

  const handleReportFormSuccess = payload => {
    setModalClosableOnClickOutside(false);
    setModalOpen(true, MODAL_TYPE.REPORT_SUCCESS, payload);
  };

  const handleCloseReport = () => {
    setModalClosableOnClickOutside(true);
    setModalOpen(false, MODAL_TYPE.REPORT_LIST);
  };

  return (
    <>
      <Button onClick={handleShowReportList}>{children}</Button>
      <Modal
        isOpen={isModalOpen}
        close={handleCloseReport}
        closableOnClickOutside={closableOnClickOutside}
        hasClose
      >
        {
          {
            [MODAL_TYPE.REPORT_LIST]: (
              <ReportList
                reports={reports}
                reportCount={reportCount}
                onShowReportForm={handleShowReportForm}
              />
            ),
            [MODAL_TYPE.REPORT_FORM]: (
              <ReportForm
                reportType={reportType}
                close={handleCloseReport}
                id={id}
                onApiError={payload => handleReportFormError(payload)}
                onSuccess={payload => handleReportFormSuccess(payload)}
              />
            ),
            [MODAL_TYPE.REPORT_API_ERROR]: (
              <ApiErrorFeedback
                buttonClick={handleShowReportList}
                message={modalPayload?.message}
              />
            ),
            [MODAL_TYPE.REPORT_SUCCESS]: (
              <ReportSuccessFeedback buttonClick={handleCloseReport} />
            ),
          }[modalType]
        }
      </Modal>
    </>
  );
};

ReportZone.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  renderButton: PropTypes.func,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportZone;
