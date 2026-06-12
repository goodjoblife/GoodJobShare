import React from 'react';
import { useHistory } from 'react-router';

import { Wrapper } from 'common/base';
import X from 'common/icons/X';
import ShareExpSection from 'common/ShareExpSection';
import StaticHelmet from 'common/StaticHelmet';

import styles from './Entry.module.css';

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
