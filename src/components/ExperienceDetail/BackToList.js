import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import i from 'common/icons';
import { P } from 'common/base';
import styles from './BackToList.module.css';
import cn from 'classnames';

const backOrPush = (backable, history) => {
  if (backable) {
    return history.goBack();
  }

  return history.push('/experiences/search');
};

const BackToList = ({ backable, history, className }) => (
  <button
    onClick={() => backOrPush(backable, history)}
    className={cn(styles.backBtn, className)}
  >
    <i.ArrowGo />
    <P size="m" bold>
      返回列表
    </P>
  </button>
);

BackToList.propTypes = {
  backable: PropTypes.bool,
  history: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withRouter(BackToList);
