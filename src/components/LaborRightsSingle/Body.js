import React, { PropTypes } from 'react';
import cn from 'classnames';
import MarkdownParser from './MarkdownParser';
import styles from './Body.module.css';

const Body = ({ title, seoText, description, content }) => (
  <div className="wrapperM">
    <h1 className={cn('headingL', styles.heading)}>
      {title}
    </h1>
    <div className={cn('pLBold', styles.description)}>{description}</div>
    <MarkdownParser content={content} />
    <div className={styles.seoText}>{seoText}</div>
  </div>
);

Body.propTypes = {
  title: PropTypes.title,
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
