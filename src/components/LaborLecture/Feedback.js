import React from 'react';
import styles from './Lecture.module.css';

const Feedback = () => (
    <div className={styles.feedback}>
        <div className={styles.goodjob}>
            <span className={styles.goodjob_count}>
                108
            </span>
        </div>
        <div className={styles.share}>
            <div className={styles.share_icon}>f</div>
            <div className={styles.share_icon}>t</div>
        </div>
        <div style={{'clear':'both'}} />
    </div>
);

export default Feedback;
