import React, { PropTypes } from 'react';
import cn from 'classnames';
import MarkdownParser from './MarkdownParser';
import styles from './Body.module.css';

const Body = ({ title, seoText, description, content }) => (
  <div className="wrapperM">
    <h1 className={cn('headingLBold', styles.heading)}>
      {title}
    </h1>
    <div className={cn('subheadingM', styles.description)}>
      {description}
    </div>
    <MarkdownParser content={content} />
    {seoText && <div className={styles.seoText}>
      {seoText}
    </div>}
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
