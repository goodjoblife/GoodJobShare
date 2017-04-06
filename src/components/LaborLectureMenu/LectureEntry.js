import React from 'react';
import { IndexLink } from 'react-router';
import styles from './LectureMenu.module.css';

const Lecture = ({ title, cover_photo: coverPhoto }) => (
  <IndexLink to={`/labor-lecture/${title}`}>
    <div className={styles.lecture_entry}>
      {
        coverPhoto && (
          <img alt={title} src={coverPhoto} className={styles.lecture_cover} />
        )
      }
      <div className={styles.lecture_title}>
        {title}
      </div>
    </div>
  </IndexLink>
);

Lecture.propTypes = {
  title: React.PropTypes.string,
  cover_photo: React.PropTypes.string,
};

export default Lecture;
