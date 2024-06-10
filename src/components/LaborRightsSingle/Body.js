import React from 'react';
import PropTypes from 'prop-types';
import { StickyContainer, Sticky } from 'react-sticky';
import cn from 'classnames';
import { Section, Wrapper, Heading } from 'common/base';
import GradientMask from 'common/GradientMask';
import MarkdownParser from './MarkdownParser';
import styles from './Body.module.css';
import LeftBanner from './Banners/Banner1';

const Body = ({ title, seoText, description, content, permissionBlock }) => (
  <Section Tag="main" pageTop>
    <Wrapper size="m">
      <Heading size="l" bold marginBottom>
        {title}
      </Heading>
      <div className={cn('subheadingM', styles.description)}>{description}</div>
    </Wrapper>
    <Wrapper size="l">
      <div className={styles.contentWrapper}>
        <StickyContainer className={cn(styles.leftBanner)}>
          <Sticky disableCompensation>
            {({ style }) => (
              <div style={style}>
                <LeftBanner />
              </div>
            )}
          </Sticky>
        </StickyContainer>
        <div className={styles.content}>
          <GradientMask show={permissionBlock !== null}>
            <MarkdownParser content={content} />
          </GradientMask>
          {permissionBlock}
        </div>
      </div>
      {seoText && <div className={styles.seoText}>{seoText}</div>}
    </Wrapper>
  </Section>
);

Body.propTypes = {
  title: PropTypes.string,
  seoText: PropTypes.string,
  description: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  permissionBlock: PropTypes.element,
};
Body.defaultProps = {
  title: '',
  description: '',
  content: '',
  permissionBlock: null,
};

export default Body;
