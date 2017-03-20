import React from 'react';
import style from './LaborLecture.module.css';

const Desktop = ({ children }) => (
    <div className={style.desktop}>
        <h3>勞動小教室</h3>
        {children}
    </div>
);

export default Desktop;
