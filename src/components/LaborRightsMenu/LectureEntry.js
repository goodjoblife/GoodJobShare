import React from 'react';
import { IndexLink } from 'react-router';
import styles from './LectureEntry.module.css';

const Lecture = ({ id, title, cover_photo: coverPhoto }) => (
  <IndexLink to={`/labor-rights/${id}`}>
    <div className={styles.lectureEntry}>
      {
        coverPhoto && (
          <img alt={title} src={coverPhoto} className={styles.cover} />
        )
      }
      <div className={`subheadingL ${styles.title}`}>
        {title}
      </div>
    </div>
  </IndexLink>
);

Lecture.propTypes = {
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  cover_photo: React.PropTypes.string,
};

export default Lecture;
