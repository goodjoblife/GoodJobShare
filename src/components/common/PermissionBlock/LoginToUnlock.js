import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Heading, P } from 'common/base';
import { useExperienceCount, useSalaryWorkTimeCount } from 'hooks/useCount';
import styles from './PermissionBlock.module.css';
import linkStyles from 'common/base/Link.module.css';
import CallToLoginShareButton from './CallToLoginShareButton';
import { useLogin } from 'hooks/login';
import useUnlockedDescriptionBySubmission from './useUnlockedDescriptionBySubmission';

const LoginToUnlock = ({ to, onAuthenticatedClick }) => {
  const experienceCount = useExperienceCount();
  const timeAndSalaryCount = useSalaryWorkTimeCount();
  const [isLoggedIn, login] = useLogin();
  const unlockedDescription = useUnlockedDescriptionBySubmission();

  return (
    <React.Fragment>
      <div className={styles.headingContainer}>
        <Heading size="sl" Tag="h3" center>
          留下一筆資料，馬上{unlockedDescription}
        </Heading>
      </div>
      <P size="l" className={styles.ctaText}>
        解鎖全站共 {timeAndSalaryCount + experienceCount} 筆薪資、面試資料
      </P>
      {!isLoggedIn && (
        <P
          size="l"
          className={cn(linkStyles.link, styles.ctaText)}
          bold
          onClick={login}
        >
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
  onAuthenticatedClick: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default LoginToUnlock;
