import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import styles from './SectionBlock.module.css';

const SectionBlock = ({ subtitle, content }) => (
  <section>
    {subtitle && (
      <P size="l" bold className={styles.heading}>
        {subtitle}
      </P>
    )}
    <P size="l" className={styles.content}>
      {content}
    </P>
  </section>
);

SectionBlock.propTypes = {
  content: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionBlock;
