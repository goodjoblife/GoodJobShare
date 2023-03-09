import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Heading, P, Link } from 'common/base';
import {
  experienceCountSelector,
  timeAndSalaryCountSelector,
} from 'selectors/countSelector';
import { queryExperienceCountIfUnfetched } from 'actions/experiences';
import { queryTimeAndSalaryCountIfUnfetched } from 'actions/timeAndSalary';
import styles from './PermissionBlock.module.css';
import CallToLoginShareButton from './CallToLoginShareButton';
import { useIsLoggedIn } from 'hooks/auth';

const LoginToUnlock = ({ to, onAuthenticatedClick }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperienceCountIfUnfetched());
    dispatch(queryTimeAndSalaryCountIfUnfetched());
  }, [dispatch]);

  const experienceCount = useSelector(experienceCountSelector);
  const timeAndSalaryCount = useSelector(timeAndSalaryCountSelector);

  const isLoggedIn = useIsLoggedIn();

  return (
    <React.Fragment>
      <div className={styles.headingContainer}>
        <Heading size="sl" Tag="h3">
          留下一筆資料，馬上解鎖全站資料 7 天
        </Heading>
      </div>
      <P size="l" className={styles.ctaText}>
        解鎖全站共 {timeAndSalaryCount + experienceCount} 筆薪資、面試資料
      </P>
      {!isLoggedIn && (
        <P Tag={Link} size="l" className={styles.ctaText} bold>
          若已有權限，登入即可查看全文
        </P>
      )}
      <div className={styles.ctaButtonContainer}>
        <CallToLoginShareButton
          to={to}
          onAuthenticatedClick={onAuthenticatedClick}
        />
      </div>
    </React.Fragment>
  );
};

LoginToUnlock.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onAuthenticatedClick: PropTypes.func,
};

export default LoginToUnlock;
