import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Wrapper } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import i from 'common/icons';
import styles from './Entry.module.css';
import helmetData from '../../constants/helmetData';

const Entry = () => (
  <div>
    <Helmet {...helmetData.SHARE} />
    <Wrapper size="l" className={styles.wrapper}>
      <button onClick={() => browserHistory.goBack()} className={styles.closeBtn}><i.X /></button>
    </Wrapper>
    <ShareExpSection />
  </div>
);

export default Entry;
