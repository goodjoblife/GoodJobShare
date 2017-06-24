import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Section, Wrapper, Heading } from 'common/base';
import MarkdownParser from './MarkdownParser';
import styles from './Body.module.css';

const Body = ({ title, seoText, description, content }) => (
  <Section Tag="main" pageTop>
    <Wrapper size="m">
      <Heading size="l" bold marginBottom>{title}</Heading>
      <div className={cn('subheadingM', styles.description)}>
        {description}
      </div>
      <MarkdownParser content={content} />
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
