import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import styles from './Timeline.module.css';

const Timeline = ({ year, data }) => (
  <div className={styles.wrapper}>
    <P size="l" bold className={styles.year}>
      {year}
    </P>
    <div className={styles.timeline}>
      {data.map(({ month, Content }, i) => (
        <div key={i} className={styles.item}>
          <P bold className={styles.month}>
            {month} 月
          </P>
          <P className={styles.content}>
            <Content />
          </P>
        </div>
      ))}
    </div>
  </div>
);
Timeline.propTypes = {
  year: PropTypes.number,
  data: PropTypes.shape({
    month: PropTypes.number.isRequired,
    Content: PropTypes.func.isRequired,
  }),
};

export default Timeline;
