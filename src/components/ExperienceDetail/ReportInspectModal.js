import React, { PropTypes } from 'react';
import Modal from 'common/Modal';
import Loader from 'common/Loader';
import { Heading, P } from 'common/base';

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
        <Heading size="l" marginBottomS center>
          查看檢舉
        </Heading>
        { status === fetchingStatus.FETCHING && <Loader size="s" /> }
        { status === fetchingStatus.FETCHED && (
          <div>
            {
              reports.length === 0 ?
                <span>沒有檢舉記錄</span>
              : <span>共 {reports.length} 個檢舉：</span>
            }
            {
              reports.map(({ reason_category: reasonCategory, reason }, i) => (
                <div key={i} className={styles.reportItem}>
                  <P size="m" bold>{reasonCategory}</P>
                  <P size="m">{reason}</P>
                </div>
              ))
            }
          </div>
        )}
        {status === fetchingStatus.ERROR && (
          <div>
            <div>Oops! 發生錯誤</div>
          </div>
        )}
      </Modal>
    );
  }
}

export default ReportInspectModal;
