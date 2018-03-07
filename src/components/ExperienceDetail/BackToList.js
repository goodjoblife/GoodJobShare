import React from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import i from 'common/icons';
import { P } from 'common/base';
import styles from './BackToList.module.css';

const backOrPush = backable => {
  if (backable) {
    return createHistory().goBack();
  }

  return createHistory().push('/experiences/search');
};

const BackToList = ({ backable }) => (
  <button onClick={() => backOrPush(backable)} className={styles.backBtn}>
    <i.ArrowGo /><P size="m" bold>返回列表</P>
  </button>
);

BackToList.propTypes = {
  backable: PropTypes.bool,
};

export default BackToList;
