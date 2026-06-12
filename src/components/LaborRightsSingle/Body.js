import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';

import { Heading, Section, Wrapper } from 'common/base';
import GradientMask from 'common/GradientMask';

import LeftBanner from './Banners/Banner1';
import styles from './Body.module.css';
import MarkdownParser from './MarkdownParser';

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
  content: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  permissionBlock: PropTypes.element,
  seoText: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Body.defaultProps = {
  permissionBlock: null,
};

export default Body;
