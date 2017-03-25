import React from 'react';
import Helmet from 'react-helmet';

import Desktop from './Desktop';
import Columns from './Columns';
import LectureEntry from './LectureEntry';

const h3_style = {
    'font-family': '"Microsoft JhengHei"',
    'font-size': '36px',
    'font-weight': 'normal',
    'line-height': '41px',
    'letter-spacing': '2px',
    'color': '#000000',
};

const LaborLecture = ({ items }) => (
    <main>
        <Helmet title="勞動小教室" />
        <Desktop>
            <h3 style={h3_style}>勞動小教室</h3>
            <Columns
            Item={LectureEntry}
            items={items}
            />
        </Desktop>
    </main>
);

export default LaborLecture;
