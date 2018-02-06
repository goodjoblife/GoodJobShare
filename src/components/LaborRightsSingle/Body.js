import React, { PropTypes } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import cn from 'classnames';
import { Section, Wrapper, Heading } from 'common/base';
import MarkdownParser from './MarkdownParser';
import styles from './Body.module.css';
import LeftBanner from '../ExperienceSearch/Banners/Banner1';
import LaborRightsPermissionBlock from '../../containers/PermissionBlock/LaborRightsPermissionBlockContainer';

const Body = ({ title, seoText, description, content, hideContent }) => (
  <Section Tag="main" pageTop>
    <Wrapper size="m">
      <Heading size="l" bold marginBottom>{title}</Heading>
      <div className={cn('subheadingM', styles.description)}>
        {description}
      </div>
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
          <MarkdownParser content={content} />
          {hideContent ?
            <LaborRightsPermissionBlock
              rootClassName={styles.permissionBlockLaborRights}
              description="- 123"
            /> : null
          }
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
  hideContent: PropTypes.bool.isRequired,
};
Body.defaultProps = {
  title: '',
  description: '',
  content: '',
};

export default Body;
