import React, { useCallback, useState } from 'react';
import Modal from 'common/Modal';
import PropTypes from 'prop-types';
import { MODAL_TYPE } from './ReportForm/constants';
import ReportFormProcess from './ReportFormProcess';
import ReportList from './ReportList';

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
    modalType: '',
    modalPayload: {},
  });
  const { isModalOpen, modalType, modalPayload } = modalState;
  const [closableOnClickOutside, setModalClosableOnClickOutside] = useState(
    true,
  );
  const [isShowReportList, setIsShowReportList] = useState(true);

  const setModalOpen = useCallback(
    (isModalOpen, modalType = '', modalPayload = {}) => {
      setModalState({ isModalOpen, modalType, modalPayload });
    },
    [],
  );

  const handleReportClick = () => {
    setModalClosableOnClickOutside(false);
    setModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
  };

  return (
    <>
      <Button onClick={handleReportClick}>{children}</Button>
      <Modal
        isOpen={isModalOpen}
        close={() => {
          setModalOpen(false);
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
            handleIsModalOpen={setModalOpen}
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
  renderButton: PropTypes.func,
  reportCount: PropTypes.number,
  reportType: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportZone;
