import React from 'react';
import styles from './LectureMenu.module.css';

const Lecture = ({ title, cover }) => (
  <button className={styles.lecture_entry} onClick={() => {}}>
    {
        cover && (
          <img alt={title} src={cover} className={styles.lecture_cover} />
        )
    }
    <div className={styles.lecture_title}>
      {title}
    </div>
  </button>
);

Lecture.propTypes = {
  title: React.PropTypes.string,
  cover: React.PropTypes.string,
};

export default Lecture;
