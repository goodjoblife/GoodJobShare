import React from 'react';
import { Section, P } from 'common/base';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import styles from './InterviewExperiences.module.css';

const InterviewExperiences = ({ pageType, pageName, tabName }) => (
  <CompanyAndJobTitleWrapper>
    <Section Tag="main" paddingBottom>
      <P size="l" bold className={styles.searchNoResult}>
        尚未有「聯發科股份有限公司」的經驗分享
        <br />
        搜尋看看其他？
      </P>
    </Section>
  </CompanyAndJobTitleWrapper>
);

export default InterviewExperiences;
