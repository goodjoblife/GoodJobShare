import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Section, Wrapper, Heading } from 'common/base';
import styles from './PageBanner.module.css';

const PageBanner = ({ heading }) => (
  <Section className={cn(styles.grayPattern, styles.pageBanner)}>
    <Wrapper size="l" className={styles.inner}>
      <Heading size="l">{heading}</Heading>
    </Wrapper>
  </Section>
);
PageBanner.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default PageBanner;
