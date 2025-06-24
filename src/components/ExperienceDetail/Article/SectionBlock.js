import React from 'react';
import PropTypes from 'prop-types';
import { Heading, P } from 'common/base';
import styles from './SectionBlock.module.css';
import OverallRating from 'common/OverallRating';

const SectionBlock = ({ subtitle, content, rating, subTitleTag = 'h2' }) => (
  <section>
    {subtitle && (
      <Heading size="sm" bold Tag={subTitleTag} className={styles.heading}>
        {subtitle}
        {rating ? <OverallRating rating={rating} /> : null}
      </Heading>
    )}
    <P size="l" className={styles.content}>
      {content}
    </P>
  </section>
);

SectionBlock.propTypes = {
  content: PropTypes.string.isRequired,
  rating: PropTypes.number,
  subTitleTag: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SectionBlock;
