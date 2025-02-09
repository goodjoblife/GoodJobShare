import React, { useState } from 'react';
import Modal from 'common/Modal';
import PropTypes from 'prop-types';
import { useReportModal } from './useReportModal';
import { MODAL_TYPE } from './ReportForm/constants';
import ReportFormProcess from './ReportFormProcess';
import ReportList from './ReportList';

const ReportModal = ({ children, reportType, id, reports, reportCount }) => {
  const {
    modalState,
    handleIsModalOpen,
    closableOnClickOutside,
    setModalClosableOnClickOutside,
  } = useReportModal();
  const { isModalOpen, modalType, modalPayload } = modalState;
  const [isShowReportList, setIsShowReportList] = useState(true);

  const handleReportClick = () => {
    setModalClosableOnClickOutside(false);
    handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
  };

  return (
    <>
      <div onClick={handleReportClick}>{children}</div>
      <Modal
        isOpen={isModalOpen}
        close={() => {
          handleIsModalOpen(false);
          setIsShowReportList(true);
        }}
        closableOnClickOutside={closableOnClickOutside}
        hasClose
      >
        {isShowReportList ? (
          <ReportList
            reports={reports}
            onCloseReport={() => setIsShowReportList(false)}
            reportCount={reportCount}
          />
        ) : (
          <ReportFormProcess
            modalType={modalType}
            modalPayload={modalPayload}
            id={id}
            handleIsModalOpen={handleIsModalOpen}
            setModalClosableOnClickOutside={setModalClosableOnClickOutside}
            reportType={reportType}
            setIsShowReportList={setIsShowReportList}
          />
        )}
      </Modal>
    </>
  );
};

ReportModal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportModal;
