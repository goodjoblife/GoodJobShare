import React from 'react';
import Helmet from 'react-helmet';

import Desktop from './desktop';
import Columns from './columns';
import Lecture from './lecture';

const LaborLecture = () => (
    <main>
        <Helmet title="勞動小教室" />
        <Desktop>
            <Columns
            Item={Lecture}
            items={[
                {
                    title: '勞工保險',
                },
                {
                    title: '權益受損時的救濟方式',
                },
                {
                    title: '變形工時條款',
                },
                {
                    title: '勞工保險',
                },
            ]}
            n_cols={3}
            />
        </Desktop>
    </main>
);

export default LaborLecture;
