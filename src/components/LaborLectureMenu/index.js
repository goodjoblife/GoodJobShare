import React from 'react';
import Helmet from 'react-helmet';

import Desktop from './Desktop';
import Columns from './Columns';
import LectureEntry from './LectureEntry';

import styles from './LectureMenu.module.css';

const LaborLecture = ({ items }) => (
    <main>
        <Helmet title="勞動小教室" />
        <Desktop>
            <h3 className={styles.header}>勞動小教室</h3>
            <Columns
                Item={LectureEntry}
                items={items}
            />
        </Desktop>
    </main>
);

export default LaborLecture;
