import React, { PropTypes } from 'react';
import cn from 'classnames';
import HidingText from './HidingText';
import Description from './Description';
import MarkdownParser from './MarkdownParser';
import styles from './LaborRightsSingle.module.css';

const Body = ({ title, seoText, description, content }) => (
  <div className="wrapperM">
    <h1 className={cn('headingL', styles.heading)}>
      {title}
    </h1>
    <HidingText content={seoText} />
    <Description content={description} />
    <MarkdownParser content={content} />
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
