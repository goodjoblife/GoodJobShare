import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import styles from './CallToActionRow.module.css';
import headerStyles from '../../Layout/Header/Header.module.css';

const GoButton = () => (
  <Link to="/share" className={cn(styles.go, headerStyles.leaveDataBtn)}>
    GO!
  </Link>
);

// position: start from 0
const InjectedCallToAction = ({ position }) => (
  <tr className={styles.row}>
    <td colSpan="7" className={styles.col}>
      <img className={styles.eye} src="https://image.goodjob.life/banners/eyes.png" role="presentation" />
      <span>
        你已經看了 {position + 1} 筆了，該留下你的了拔  (´_ゝ`)
        <GoButton />
      </span>
    </td>
  </tr>
);

InjectedCallToAction.propTypes = {
  position: PropTypes.number.isRequired,
};

export default InjectedCallToAction;
