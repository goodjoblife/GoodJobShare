import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import i from 'common/icons';
import { P } from 'common/base';
import styles from './BackToList.module.css';
import cn from 'classnames';

const backOrPush = (backable, history, experience) => {
  if (backable) {
    history.push(`/job-titles/${experience.job_title.name}/overview`);
  }
  return history.push(`/job-titles/${experience.job_title.name}/overview`);
};

const BackToList = ({ backable, history, className, experience }) => (
  <button
    onClick={() => backOrPush(backable, history, experience)}
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
