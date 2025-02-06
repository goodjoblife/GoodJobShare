import React from 'react';
import PropTypes from 'prop-types';
import { REPORT_TYPE } from './ReportForm/constants';
import ReportFormProcess from './ReportFormProcess';

const ModalContent = ({
  modalType,
  handleIsModalOpen,
  modalPayload,
  setModalClosableOnClickOutside,
  reportType,
  id,
}) => {
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
