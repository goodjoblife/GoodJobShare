import React, { PropTypes } from 'react';
import Modal from 'common/Modal';

class ReportInspectModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleReportInspectModal: PropTypes.func.isRequired,
  }

  render() {
    const { isOpen, toggleReportInspectModal } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        close={() => toggleReportInspectModal(false)}
        hasClose
      >
        <h2
          style={{
            fontSize: '2rem',
            marginBottom: '30px',
          }}
        >
          查看檢舉
        </h2>
      </Modal>
    );
  }
}

export default ReportInspectModal;
