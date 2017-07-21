import React from 'react';
import { browserHistory } from 'react-router';
import i from 'common/icons';
import { P } from 'common/base';
import styles from './BackToList.module.css';

const BackToList = () => (
  <button onClick={() => browserHistory.goBack()} className={styles.backBtn}>
    <i.ArrowGo /><P size="m" bold>返回列表</P>
  </button>
);

export default BackToList;
