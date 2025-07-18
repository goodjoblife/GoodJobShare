import React from 'react';
import { useHistory } from 'react-router';

import { Wrapper } from 'common/base';
import X from 'common/icons/X';
import styles from 'components/ShareExperience/Entry.module.css';
import InboxContent from 'components/App/Header/InboxContent';

const InboxPage = () => {
  const history = useHistory();

  return (
    <Wrapper size="l" className={styles.wrapper}>
      <button onClick={() => history.goBack()} className={styles.closeBtn}>
        <X />
      </button>
      <InboxContent />
    </Wrapper>
  );
};

export default InboxPage;
