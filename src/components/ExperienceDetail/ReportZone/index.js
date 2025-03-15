import React, { useCallback, useState } from 'react';
import Modal from 'common/Modal';
import PropTypes from 'prop-types';
import { MODAL_TYPE } from './ReportForm/constants';
import ReportModalContent from './ReportModalContent';

const ReportZone = ({
  children,
  reportType,
  id,
  reports,
  reportCount,
  renderButton: Button = 'button',
  onCreateReport,
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

  const handleShowReportList = useCallback(() => {
    setModalClosableOnClickOutside(true);
    setModalOpen(true, MODAL_TYPE.REPORT_LIST);
  }, [setModalOpen]);

  const handleShowReportForm = useCallback(() => {
    setModalClosableOnClickOutside(false);
    setModalOpen(true, MODAL_TYPE.REPORT_FORM);
  }, [setModalOpen]);

  const handleReportFormError = useCallback(
    payload => {
      setModalClosableOnClickOutside(false);
      setModalOpen(true, MODAL_TYPE.REPORT_API_ERROR, payload);
    },
    [setModalOpen],
  );

  const handleReportFormSuccess = useCallback(
    payload => {
      setModalClosableOnClickOutside(false);
      setModalOpen(true, MODAL_TYPE.REPORT_SUCCESS, payload);
    },
    [setModalOpen],
  );

  const handleCloseReport = useCallback(
    modalType => {
      if (modalType === MODAL_TYPE.REPORT_SUCCESS) {
        onCreateReport();
      }
      setModalClosableOnClickOutside(true);
      setModalOpen(false, MODAL_TYPE.REPORT_LIST);
    },
    [onCreateReport, setModalOpen],
  );

  return (
    <>
      <Button onClick={handleShowReportList}>{children}</Button>
      <Modal
        isOpen={isModalOpen}
        close={() => handleCloseReport(modalType)}
        closableOnClickOutside={closableOnClickOutside}
        hasClose
      >
        <ReportModalContent
          modalType={modalType}
          modalPayload={modalPayload}
          id={id}
          reportType={reportType}
          reports={reports}
          reportCount={reportCount}
          onShowReportForm={handleShowReportForm}
          onCloseReport={handleCloseReport}
          onShowReportList={handleShowReportList}
          onReportFormError={handleReportFormError}
          onReportFormSuccess={handleReportFormSuccess}
        />
      </Modal>
    </>
  );
};

ReportZone.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  onCreateReport: PropTypes.func,
  renderButton: PropTypes.func,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportZone;
