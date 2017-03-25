import React from 'react';
import styles from './Lecture.module.css';

const Pagers = () => (
    <div className={styles.pages}>
        <div style={{'float':'left','text-align':'left'}}>
            <div className={styles.pager_text}>
                {'\u003C '}前一課
            </div>
            <div className={styles.pager_image}>
            </div>
        </div>
        <div style={{'float':'right','text-align':'right'}}>
            <div className={styles.pager_text}>
                下一課{' \u003E'}
            </div>
            <div className={styles.pager_image}>
            </div>
        </div>
        <div style={{'clear':'both'}} />
    </div>
);

export default Pagers;
