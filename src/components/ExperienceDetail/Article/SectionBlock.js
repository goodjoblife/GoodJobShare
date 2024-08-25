import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import styles from './SectionBlock.module.css';
import OverallRating from 'common/OverallRating';

const SectionBlock = ({ subtitle, content, rating }) => (
  <section>
    {subtitle && (
      <P size="l" bold className={styles.heading}>
        <div>{subtitle}</div>
        {rating && <OverallRating rating={rating} />}
      </P>
    )}
    <P size="l" className={styles.content}>
      {content}
    </P>
  </section>
);

SectionBlock.propTypes = {
  content: PropTypes.string.isRequired,
  rating: PropTypes.number,
  subtitle: PropTypes.string,
};

export default SectionBlock;
