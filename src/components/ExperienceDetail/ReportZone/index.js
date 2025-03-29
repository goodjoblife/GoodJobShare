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
  onReportSuccessFeedbackClick,
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

  const handleReportSuccessFeedbackClick = useCallback(
    modalType => {
      if (modalType === MODAL_TYPE.REPORT_SUCCESS) {
        onReportSuccessFeedbackClick && onReportSuccessFeedbackClick();
      }
      setModalClosableOnClickOutside(true);
      setModalOpen(false, MODAL_TYPE.REPORT_LIST);
    },
    [onReportSuccessFeedbackClick, setModalOpen],
  );

  return (
    <>
      <Button onClick={handleShowReportList}>{children}</Button>
      <Modal
        isOpen={isModalOpen}
        close={() => handleReportSuccessFeedbackClick(modalType)}
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
          onReportSuccessFeedbackClick={handleReportSuccessFeedbackClick}
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
  onReportSuccessFeedbackClick: PropTypes.func,
  renderButton: PropTypes.func,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportZone;
