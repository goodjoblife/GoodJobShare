import React, { PropTypes } from 'react';
import styles from './ReactionZone.module.css';

const ReactionZoneOtherOptions = ({ toggleReportInspectModal }) => (
  <ul className={styles.popoverItem}>
    <li onClick={toggleReportInspectModal}>查看檢舉數量</li>
  </ul>
);

ReactionZoneOtherOptions.propTypes = {
  toggleReportInspectModal: PropTypes.func.isRequired,
};

export default ReactionZoneOtherOptions;
