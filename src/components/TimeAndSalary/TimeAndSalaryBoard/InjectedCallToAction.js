import React from 'react';

import styles from './InjectedCallToAction.module.css';

export default () => (
  <tr className={styles.row}>
    <td colSpan="7" className={styles.col}>
      <img className={styles.eye} src="https://image.goodjob.life/banners/eyes.png" role="presentation" />
      你已經看了 100 筆了，該留下你的了拔  (´_ゝ`)
    </td>
  </tr>
);
