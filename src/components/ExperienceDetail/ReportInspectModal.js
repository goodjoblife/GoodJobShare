import React, { PropTypes } from 'react';
import Modal from 'common/Modal';
import styles from './ReportInspectModal.module.css';

class ReportInspectModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleReportInspectModal: PropTypes.func.isRequired,
  }

  state = {
    reports: [
      {
        reason: '這篇文章內容不實',
        detail: '封測大廠日月光公司營運長吳田玉在日月光併購矽品期間涉嫌內線交易，違反證券交易法，2日被高雄地檢署偵結起訴。',
      },
      {
        reason: '這篇文章涉及人身攻擊、誹謗',
        detail: '吳田玉、吳的友人張女、吳田玉的秘書吳女、秘書的老公林男，在日月光併購矽品期間發布的三次重大交易訊息前後，大量買賣股票，金管會查覺有異後。',
      },
      {
        reason: '這是廣告或垃圾訊息',
      },
      {
        reason: '這是廣告或垃圾訊息',
      },
    ],
  }

  render() {
    const { isOpen, toggleReportInspectModal } = this.props;
    const { reports } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        close={() => toggleReportInspectModal(false)}
        hasClose
      >
        <h2
          style={{
            fontSize: '2rem',
            margin: '35px 0',
          }}
        >
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
