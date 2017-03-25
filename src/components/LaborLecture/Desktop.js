import React from 'react';
import styles from './Lecture.module.css';

const Desktop = ({ children }) => (
    <div style={{'text-align': 'center','width':'100%'}}>
        <div className={styles.desktop}>
            {children}
        </div>
    </div>
);

export default Desktop;
