import React, { PropTypes } from 'react';
import styles from './ReactionZone.module.css';

const ReactionZoneOtherOptions = ({ toggleReportInspectModal }) => (
  <ul className={styles.popoverItem}>
    <li><button onClick={toggleReportInspectModal}>查看檢舉</button></li>
  </ul>
);

ReactionZoneOtherOptions.propTypes = {
  toggleReportInspectModal: PropTypes.func.isRequired,
};

export default ReactionZoneOtherOptions;
