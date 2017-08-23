import React, { PropTypes } from 'react';
import Modal from 'common/Modal';
import fetchUtil from 'utils/fetchUtil';
import styles from './ReportInspectModal.module.css';
import fetchingStatus from '../../constants/status';

class ReportInspectModal extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleReportInspectModal: PropTypes.func.isRequired,
  }

  state = {
    status: fetchingStatus.FETCHING,
    reports: [],
  }

  componentDidMount() {
    const { id } = this.props;
    fetchUtil(`/experiences/${id}/reports`)('GET')
      .then(({ reports }) => {
        this.setState({
          status: fetchingStatus.FETCHED,
          reports,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          status: fetchingStatus.ERROR,
        });
      });
  }

  render() {
    const { isOpen, toggleReportInspectModal } = this.props;
    const { status, reports } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        close={() => toggleReportInspectModal(false)}
        hasClose
      >
        <h2 className={styles.title}>
          查看檢舉
        </h2>
        <div className={styles.reports}>
          共 {reports.length} 個檢舉：
          {
            reports.map(({ reason, detail }, i) => (
              <div key={i} className={styles.report}>
                <h2 className="pMBold">{reason}</h2>
                <span className="pM">{detail}</span>
              </div>
            ))
          }
        </div>
      </Modal>
    );
  }
}

export default ReportInspectModal;
