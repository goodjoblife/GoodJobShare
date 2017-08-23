import React, { PropTypes } from 'react';
import Modal from 'common/Modal';

const ReportInspectModal = ({ isOpen, toggleReportInspectModal }) => (
  <Modal
    isOpen={isOpen}
    close={() => toggleReportInspectModal(false)}
    hasClose
  >
    123
  </Modal>
);

ReportInspectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleReportInspectModal: PropTypes.func.isRequired,
};

export default ReportInspectModal;
