import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import styles from './QABlock.module.css';

const QABlock = ({ question, answer }) => (
  <section className={styles.container}>
    <div className={styles.qItem}>
      <div className={styles.qLabel}>Q</div>
      <P size="m" bold className={styles.content}>
        {question}
      </P>
    </div>
    {answer && (
      <div className={styles.aItem}>
        <div bold className={styles.aLabel}>
          A
        </div>
        <P size="m" className={styles.content}>
          {answer}
        </P>
      </div>
    )}
  </section>
);

QABlock.propTypes = {
  answer: PropTypes.string,
  question: PropTypes.string.isRequired,
};

export default QABlock;
