import React, { PropTypes } from 'react';
import styles from './QABlock.module.css';

const QABlock = ({ qa }) => (
  <section className={styles.container}>
    <div className={styles.question}>
      <div className={styles.q}>Q</div>
      <div className={`${styles.content} pMBold`}>
        {qa.question}
      </div>
    </div>
    <div className={styles.answer}>
      <div className={styles.a}>A</div>
      <div className={`${styles.content} pM`}>
        {qa.answer}
      </div>
    </div>
  </section>
);

QABlock.propTypes = {
  qa: PropTypes.object.isRequired,
};

export default QABlock;
