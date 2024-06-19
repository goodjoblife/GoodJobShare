import React from 'react';
import { useHistory } from 'react-router';
import { Wrapper } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import X from 'common/icons/X';
import styles from './Entry.module.css';
import StaticHelmet from 'common/StaticHelmet';

const Entry = () => {
  const history = useHistory();

  return (
    <div>
      <StaticHelmet.Share />
      <Wrapper size="l" className={styles.wrapper}>
        <button onClick={() => history.goBack()} className={styles.closeBtn}>
          <X />
        </button>
      </Wrapper>
      <ShareExpSection />
    </div>
  );
};

export default Entry;
