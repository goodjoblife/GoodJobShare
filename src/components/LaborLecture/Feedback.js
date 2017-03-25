import React from 'react';
import styles from './Lecture.module.css';

const Feedback = () => (
    <div>
        <div className={styles.goodjob}>
            <span className={styles.goodjob_icon} />
            <span className={styles.goodjob_text} />
            <span className={styles.goodjob_count}>
                108
            </span>
        </div>
        <div className={styles.share}>
            分享
            <div className={styles.share_icon}>f</div>
            <div className={styles.share_icon}>t</div>
        </div>
        <div style={{'clear':'both'}} />
    </div>
);

export default Feedback;
