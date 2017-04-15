import React from 'react';
import { IndexLink } from 'react-router';
import styles from './LectureEntry.module.css';

const LaborRightsEntry = ({ id, title, coverUrl }) => (
  <IndexLink to={`/labor-rights/${id}`}>
    <div className={styles.lectureEntry}>
      {
        coverUrl && (
          <img alt={title} src={coverUrl} className={styles.cover} />
        )
      }
      <div className={`subheadingL ${styles.title}`}>
        {title}
      </div>
    </div>
  </IndexLink>
);

LaborRightsEntry.propTypes = {
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  coverUrl: React.PropTypes.string,
};

export default LaborRightsEntry;
