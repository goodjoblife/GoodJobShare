import React from 'react';
import styles from './QABlock.module.css';

const QABlock = () => (
  <section className={styles.container}>
    <div className={styles.question}>
      <div className={styles.q}>Q</div>
      <div className={`${styles.content} pMBold`}>
        寫 func：print 出以下圖形<br />
        *<br />
        **
      </div>
    </div>
    <div className={styles.answer}>
      <div className={styles.a}>A</div>
      <div className={`${styles.content} pM`}>
        console.log();
      </div>
    </div>
  </section>
);

export default QABlock;
