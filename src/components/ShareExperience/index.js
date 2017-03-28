import React, { PropTypes } from 'react';
import styles from './ShareExperience.module.css';


const ShareExperience = () => (
  <div className={styles.wrapper}>
    <div
      className={styles.container}
    >
      <p
        style={{
          marginBottom: '14px',
        }}
      >
        留下資料
      </p>
      <h1
        style={{
          fontSize: '2.25em',
          marginBottom: '81px',
        }}
      >
        你要分享何種經驗？
      </h1>
      <div className={styles.link__container}>
        <div className={styles.link}>
          <div className={styles.image} />
          <p>留下工時或薪資</p>
        </div>
        <div className={styles.link}>
          <div className={styles.image} />
          <p>分享面試經驗</p>
        </div>
        <div className={styles.link}>
          <div className={styles.image} />
          <p>分享工作經驗</p>
        </div>
      </div>
    </div>
  </div>
);

export default ShareExperience;
