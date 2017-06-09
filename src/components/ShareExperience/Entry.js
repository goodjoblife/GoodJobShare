import React from 'react';
import { browserHistory } from 'react-router';
import Wrapper from 'common/Wrapper';
import ShareExpSection from 'common/ShareExpSection';
import i from 'common/icons';
import styles from './Entry.module.css';

const Entry = () => (
  <div>
    <Wrapper size="l" className={styles.wrapper}>
      <button onClick={browserHistory.goBack} className={styles.closeBtn}><i.X /></button>
    </Wrapper>
    <ShareExpSection />
  </div>
);

export default Entry;
