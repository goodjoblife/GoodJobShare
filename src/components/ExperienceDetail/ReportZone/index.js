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
  onCloseReport,
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
        // 這裡不在 ApiSuccess 時就 call onCreateReport
        // 而是等待 modal 關閉才做處理
        // TODO: 允許 report 更新但不導致 UI 重整
        onCloseReport && onCloseReport();
      }
      setModalClosableOnClickOutside(true);
      setModalOpen(false, MODAL_TYPE.REPORT_LIST);
    },
    [onCloseReport, setModalOpen],
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
  onCloseReport: PropTypes.func,
  renderButton: PropTypes.func,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportZone;
