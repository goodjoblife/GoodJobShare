import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, P, Link } from 'common/base';
import { useExperienceCount, useSalaryWorkTimeCount } from 'hooks/useCount';
import styles from './PermissionBlock.module.css';
import CallToLoginShareButton from './CallToLoginShareButton';
import { useIsLoggedIn } from 'hooks/auth';
import LoginModal from './LoginModal';
import useUnlockedDescriptionBySubmission from './useUnlockedDescriptionBySubmission';

const LoginToUnlock = ({ to, onAuthenticatedClick }) => {
  const experienceCount = useExperienceCount();
  const timeAndSalaryCount = useSalaryWorkTimeCount();

  const isLoggedIn = useIsLoggedIn();
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModalOpen = useCallback(() => setModalOpen(!isModalOpen), [
    isModalOpen,
  ]);

  useEffect(() => {
    if (isLoggedIn && isModalOpen) {
      // Close the login modal on logged in
      setModalOpen(false);
    }
  }, [isLoggedIn, isModalOpen]);

  const unlockedDescription = useUnlockedDescriptionBySubmission();

  return (
    <React.Fragment>
      <LoginModal isOpen={isModalOpen} close={toggleModalOpen} />
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
          Tag={Link}
          size="l"
          className={styles.ctaText}
          bold
          onClick={toggleModalOpen}
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
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onAuthenticatedClick: PropTypes.func,
};

export default LoginToUnlock;
