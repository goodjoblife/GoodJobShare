import React from 'react';
import styles from './LectureMenu.module.css';

const Lecture = ({title, cover}) => (
    <div className={styles.lecture_entry} onClick={e => { alert('Link') }}>
        {cover && <img src={cover} className={styles.lecture_cover} /> }
        <div className={styles.lecture_title}>
            {title}
        </div>
    </div>
);

export default Lecture;
