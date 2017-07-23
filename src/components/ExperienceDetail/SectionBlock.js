import React, { PropTypes } from 'react';
import { P } from 'common/base';
import styles from './SectionBlock.module.css';

const SectionBlock = ({ subtitle, content }) => (
  <section>
    <P size="l" bold className={styles.heading}>{subtitle}</P>
    <P size="l" className={styles.content}>{content}</P>
  </section>
);

SectionBlock.propTypes = {
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default SectionBlock;
