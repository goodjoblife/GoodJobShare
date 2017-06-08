import React from 'react';
import { Link } from 'react-router';
import styles from './Entry.module.css';


const Entry = () => (
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
        <a href="/time-and-salary/share" className={styles.link}>
          <div className={styles.image} />
          <p>留下工時或薪資</p>
        </a>
        <Link to="/share/interview" className={styles.link}>
          <div className={styles.image} />
          <p>分享面試經驗</p>
        </Link>
        <Link to="/share/work-experiences" className={styles.link}>
          <div className={styles.image} />
          <p>分享工作經驗</p>
        </Link>
      </div>
    </div>
  </div>
);

export default Entry;
