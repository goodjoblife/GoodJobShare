import React, { PropTypes } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import cn from 'classnames';
import { Section, Wrapper, Heading } from 'common/base';
import MarkdownParser from './MarkdownParser';
import styles from './Body.module.css';
import LeftBanner from '../ExperienceSearch/Banners/Banner1';

const Body = ({ title, seoText, description, content }) => (
  <Section Tag="main" pageTop>
    <Wrapper size="m">
      <Heading size="l" bold marginBottom>{title}</Heading>
      <div className={cn('subheadingM', styles.description)}>
        {description}
      </div>
      <div className={styles.contentWrapper}>
        <StickyContainer className={cn(styles.leftBanner, styles.leftBannerWrapper)}>
          <Sticky disableCompensation>
            {({ style }) => (
              <div className={styles.leftBanner} style={style}>
                <LeftBanner />
              </div>
            )}
          </Sticky>
        </StickyContainer>
        <div className={styles.content}>
          <MarkdownParser content={content} />
        </div>
      </div>
      {seoText && <div className={styles.seoText}>
        {seoText}
      </div>}
    </Wrapper>
  </Section>
);

Body.propTypes = {
  title: PropTypes.string,
  seoText: PropTypes.string,
  description: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
Body.defaultProps = {
  title: '',
  description: '',
  content: '',
};

export default Body;
