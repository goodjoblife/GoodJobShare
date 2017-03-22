import React from 'react';
import Helmet from 'react-helmet';

import Desktop from './Desktop';

const style = {
    'display': 'inline-block',
    'max-width': '900px',
    'font-family': '"Microsoft JhengHei"',
    'font-size': '18px',
    'font-weight': 'bold',
    'line-height': '24px',
    'color': '#000000',
    'text-align': 'left',
};

export default class Lecture extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const content = [
            "「今天又要加班了⋯ 重點是，根本沒有加班費😭」",
            "「主管要我們打卡下班後，再繼續加班耶😠」",
            "「拜託，我們連個打卡機都沒有好不好👻」",
            "", 
            "【「雇主（好像）違法怎麼辦❓❗】 遇到職場上常見的各種違法現象，我們身為公司的一名小小螺絲釘，應該如何保護自己呢？ 　 第二堂勞動知識小教室，要教你如何 滿滿的 維護自身工作權益哦！",
        ];
        return (
            <main>
                <Helmet title="勞動小教室" />
                <Desktop>
                    <div style={style}>
                        {
                            content.map((line,i) => (
                                <p key={i}>{line}</p>
                            ))
                        }
                        {this.props.lecture}
                    </div>
                </Desktop>
            </main>
        );
    }
}
