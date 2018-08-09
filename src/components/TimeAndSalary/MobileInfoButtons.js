import React from 'react';
import PropTypes from 'prop-types';

import { InfoButton } from 'common/Modal';
import styles from './MobileInfoButtons.module.css';

const MobileInfoButtons = ({ toggleInfoSalaryModal, toggleInfoTimeModal }) => (
  <div className={styles.mobileInfoButtons}>
    <div className={styles.infoButton}>
      <InfoButton onClick={toggleInfoSalaryModal}>估計時薪</InfoButton>
    </div>
    <div className={styles.infoButton}>
      <InfoButton onClick={toggleInfoTimeModal}>參考時間</InfoButton>
    </div>
  </div>
);

MobileInfoButtons.propTypes = {
  toggleInfoSalaryModal: PropTypes.func.isRequired,
  toggleInfoTimeModal: PropTypes.func.isRequired,
};

export default MobileInfoButtons;
