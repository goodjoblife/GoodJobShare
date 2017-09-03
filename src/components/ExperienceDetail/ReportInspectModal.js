import React, { PropTypes } from 'react';
import Modal from 'common/Modal';
import Loader from 'common/Loader';
import Warning from 'common/icons/Warning';
import styles from './ReportInspectModal.module.css';
import { getReports } from '../../apis/reportApi';
import fetchingStatus from '../../constants/status';

class ReportInspectModal extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleReportInspectModal: PropTypes.func.isRequired,
  }

  state = {
    status: fetchingStatus.UNFETCHED,
    reports: [],
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isOpen) return;
    if (this.state.status === fetchingStatus.FETCHED) return;
    const { id } = this.props;
    this.setState({ status: fetchingStatus.FETCHING });
    getReports(id)
      .then(reports => {
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
        { status === fetchingStatus.FETCHING && <Loader /> }
        { status === fetchingStatus.FETCHED && (
          <div className={styles.reports}>
            {
              reports.length === 0 ?
                <span>沒有檢舉記錄</span>
              : <span>共 {reports.length} 個檢舉：</span>
            }
            {
              reports.map(({ reason_category: reasonCategory, reason }, i) => (
                <div key={i} className={styles.report}>
                  <h2 className="pMBold">{reasonCategory}</h2>
                  <span className="pM">{reason}</span>
                </div>
              ))
            }
          </div>
        )}
        {status === fetchingStatus.ERROR && (
          <div>
            <Warning />
            <div>Oops! 發生錯誤</div>
          </div>
        )}
      </Modal>
    );
  }
}

export default ReportInspectModal;
