import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { Wrapper } from 'common/base';
import X from 'common/icons/X';
import entryStyles from 'components/ShareExperience/Entry.module.css';
import styles from './InboxPage.module.css';
import InboxContent from 'components/App/Header/InboxContent';
import { useIsLoggedIn } from 'hooks/auth';
import LoginModal from 'common/LoginModal';

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
