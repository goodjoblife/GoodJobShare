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

const LaborLecture = () => (
    <main>
        <Helmet title="勞動小教室" />
        <Desktop>
            <h3 style={h3_style}>勞動小教室</h3>
            <Columns
            Item={LectureEntry}
            items={[
                {
                    title: '勞工保險',
                    cover: 'cover',
                },
                {
                    title: '權益受損時的救濟方式',
                    cover: 'cover',
                },
                {
                    title: '變形工時條款',
                    cover: 'cover',
                },
                {
                    title: '勞工保險',
                    cover: 'cover',
                },
                {
                    title: '勞工休假制度',
                    cover: 'cover',
                },
                {
                    title: '勞基法84-1條責任制',
                    cover: 'cover',
                },
                {
                    title: '正常及延長工時',
                    cover: 'cover',
                },
            ]}
            />
        </Desktop>
    </main>
);

export default LaborLecture;
