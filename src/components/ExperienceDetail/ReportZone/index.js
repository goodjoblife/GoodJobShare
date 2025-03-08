import React, { useCallback, useState } from 'react';
import Modal from 'common/Modal';
import PropTypes from 'prop-types';
import { MODAL_TYPE } from './ReportForm/constants';
import ReportFormProcess from './ReportFormProcess';

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
        <ReportFormProcess
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
  renderButton: PropTypes.func,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportZone;
