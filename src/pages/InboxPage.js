import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { Wrapper } from 'common/base';
import LoginModal from 'common/LoginModal';
import X from 'common/icons/X';

import { useIsLoggedIn } from 'hooks/auth';

import styles from './InboxPage.module.css';
import entryStyles from 'components/ShareExperience/Entry.module.css';
import InboxContent from 'components/App/Header/InboxContent';

const InboxPage = () => {
  const isLoggedIn = useIsLoggedIn();

  const history = useHistory();
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <LoginModal onClose={goBack} inline />
      </div>
    );
  }

  return (
    <Wrapper size="l" className={entryStyles.wrapper}>
      <button onClick={goBack} className={entryStyles.closeBtn}>
        <X />
      </button>
      <InboxContent />
    </Wrapper>
  );
};

export default InboxPage;
