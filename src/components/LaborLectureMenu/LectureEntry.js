import React from 'react';
import { IndexLink } from 'react-router';
import styles from './LectureMenu.module.css';

const Lecture = ({ title, cover }) => (
  <IndexLink to={'/labor-lecture/'+title}>
    <div className={styles.lecture_entry}>
      {
        cover && (
          <img alt={title} src={cover} className={styles.lecture_cover} />
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
  cover: React.PropTypes.string,
};

export default Lecture;
