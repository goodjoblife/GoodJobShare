import React from 'react';
import styles from './TypeFormFooter.module.css';

const getNumberNext = dataNum => {
  if (dataNum > 10000) {
    return ` ${Math.floor(dataNum / 10000)} 萬多筆`;
  } else if (dataNum > 1000) {
    return ` ${Math.floor(dataNum / 1000)} 千多筆`;
  } else if (dataNum > 0) {
    return ` ${dataNum} 筆`;
  } else {
    return '';
  }
};

const TypeFormFooter = ({ dataNum }) => (
  <div className={styles.footer}>
    完成可解鎖全站{getNumberNext(dataNum)}資訊{' '}
    <span className={styles.unlockDuration}></span>
  </div>
);

export default TypeFormFooter;
