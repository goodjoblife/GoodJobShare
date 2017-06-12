import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper, Heading } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import HomeBanner from './HomeBanner';

const LandingPage = () => (
  <main>
    <Helmet
      title="首頁"
    />
    <HomeBanner />
    <Section padding bg="white">
      <Wrapper size="l">
        <Heading size="l" center marginBottom>勞動知識小教室</Heading>
      </Wrapper>
    </Section>
    <ShareExpSection heading="現在就留下你的資料吧！" />
  </main>
);

export default LandingPage;
