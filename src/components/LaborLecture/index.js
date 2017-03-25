import React from 'react';
import Helmet from 'react-helmet';

import Desktop from './Desktop';
import BackButton from './BackButton';
import Content from './Content';
import Feedback from './Feedback';
import Pagers from './Pagers';
import Footer from './Footer';
import Seperator from './Seperator';
import styles from './Lecture.module.css';

const Lecture = ({title, content}) => (
    <main>
        <Helmet title="勞動小教室" />
        <Desktop>
            <BackButton />
            <h3 className={styles.header}>{title}</h3>
            <Content>
                {
                    content.map(({type, data},i) => (
                        <p key={i} className={styles.content_para}>
                        {
                            type == 'text' && (
                                data=='' && '\u00A0' || data
                            ) || type == 'image' && (
                                <img className={styles.content_image}/>
                            )
                        }
                        </p>
                    ))
                }
                <Feedback />
                <Seperator />
                <Pagers />
            </Content>
            <Footer />
        </Desktop>
    </main>
);

export default Lecture;
