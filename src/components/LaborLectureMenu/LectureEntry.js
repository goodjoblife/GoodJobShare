import React from 'react';
import { IndexLink } from 'react-router';
import styles from './LectureMenu.module.css';

const Lecture = ({ id, title, cover_photo: coverPhoto }) => (
  <IndexLink to={`/labor-lecture/${id}`}>
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
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  cover_photo: React.PropTypes.string,
};

export default Lecture;
