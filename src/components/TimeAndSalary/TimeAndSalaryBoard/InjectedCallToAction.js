import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './InjectedCallToAction.module.css';
import headerStyles from '../../Layout/Header/Header.module.css';

const GoButton = () => (
  <div className={styles.go}>
    <Link to="/share" className={headerStyles.leaveDataBtn}>
      GO!
    </Link>
  </div>
);

const InjectedCallToAction = ({ interval }) => (
  <tr className={styles.row}>
    <td colSpan="7" className={styles.col}>
      <img className={styles.eye} src="https://image.goodjob.life/banners/eyes.png" role="presentation" />
      你已經看了 {interval} 筆了，該留下你的了拔  (´_ゝ`)
      <GoButton />
    </td>
  </tr>
);

InjectedCallToAction.propTypes = {
  interval: PropTypes.number.isRequired,
};

export default InjectedCallToAction;
