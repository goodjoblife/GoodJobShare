import React, { useCallback, useState } from 'react';
import Modal from 'common/Modal';
import PropTypes from 'prop-types';
import { MODAL_TYPE } from './ReportForm/constants';
import ReportFormProcess from './ReportFormProcess';
import ReportList from './ReportList';

const ReportZone = ({ children, reportType, id, reports, reportCount }) => {
  const [modalState, setModal] = useState({
    isModalOpen: false,
    modalType: '',
    modalPayload: {},
  });
  const { isModalOpen, modalType, modalPayload } = modalState;
  const [closableOnClickOutside, setModalClosableOnClickOutside] = useState(
    true,
  );
  const [isShowReportList, setIsShowReportList] = useState(true);

  const handleIsModalOpen = useCallback(
    (isModalOpen, modalType = '', modalPayload = {}) => {
      setModal({ isModalOpen, modalType, modalPayload });
    },
    [],
  );

  const handleReportClick = () => {
    setModalClosableOnClickOutside(false);
    handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
  };

  return (
    <>
      <button onClick={handleReportClick}>{children}</button>
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

ReportZone.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportZone;
