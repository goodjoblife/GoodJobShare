import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { REPORT_TYPE } from './ReportForm/constants';

import ReportFormProcess from './ReportFormProcess';
import ReportList from './ReportList';

const ModalContent = ({
  modalType,
  handleIsModalOpen,
  modalPayload,
  setModalClosableOnClickOutside,
  reportType,
  id,
}) => {
  const [isShowReport, setIsShowReport] = useState(true);
  const handleCloseReport = () => setIsShowReport(false);

  useEffect(() => {
    setIsShowReport(prev => {
      if (!prev) {
        return true;
      }
      return prev;
    });
  }, [modalType]);

  if (isShowReport) {
    return <ReportList id={id} onCloseReport={handleCloseReport} />;
  }

  return (
    <ReportFormProcess
      modalType={modalType}
      modalPayload={modalPayload}
      id={id}
      handleIsModalOpen={handleIsModalOpen}
      setModalClosableOnClickOutside={setModalClosableOnClickOutside}
      reportType={reportType}
    />
  );
};

ModalContent.propTypes = {
  handleIsModalOpen: PropTypes.func.isRequired,
  id: PropTypes.string,
  modalPayload: PropTypes.object,
  modalType: PropTypes.string.isRequired,
  reportType: PropTypes.string,
  setModalClosableOnClickOutside: PropTypes.func.isRequired,
};

ModalContent.defaultProps = {
  reportType: REPORT_TYPE.EXPERIENCE,
};

export default ModalContent;
