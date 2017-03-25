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
    'padding-bottom': '87px',
};

const title_style = {
    'font-family': '"Microsoft JhengHei"',
    'font-weight': 'normal',
    'font-size': '36px',
    'text-align': 'center',
    'line-height': '41px',
    'letter-spacing': '2px',
    'color': '#000000',
};

const para_style = {
    'font-family': '"Microsoft JhengHei"',
    'font-size': '18px',
    'font-weight': 'bold',
    'line-height': '29px',
    'color': '#000000',
    'white-space': 'pre-wrap',
};

const img_style = {
   'width': '900px',
   'height': '640px',
};

const content_style = {
    'padding-bottom': '93px',
};

const line_style = {
    'box-sizing': 'border-box',
    'width': '900px',
    'height': '3px',
    'border': '1px solid #DADADA',
    'margin': '18px 0px',
};

const pager_style = {
    'display': 'inline-block',
   'box-sizing': 'border-box',
   'width': '288px',
   'height': '207px',
   'border': '8px solid black',
   'background-color': 'pink',
};

const pager_text_style = {
    'width': '331px',
    'height': '24px',
    'font-family': '"Microsoft JhengHei"',
    'font-size': '18px',
    'font-weight': 'bold',
    'line-height': '24px',
    'color': '#000000',
    'margin-bottom': '16px',
};

const footer_style = {
    'background-color': '#FFFFFF',
    'padding-top': '128px',
    'padding-bottom': '98px',
    'font-family': '"Microsoft JhengHei"',
    'font-size': '22px',
    'font-weight': 'bold',
    'line-height': '30px',
    'color': '#000000',
};

const back_style = {
    'position': 'absolute',
    'top': '33px',
    'left': '37px',
    'width': '77px',
    'height': '24px',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'font-family': '"Microsoft JhengHei"',
    'font-size': '18px',
    'font-weight': 'bold',
    'line-height': '24px',
    'color': '#969696',
};

const arrow_style = {
    'background-color': 'gray',
    'display': 'inline-block',
    'width': '28px',
    'height': '21px',
    'margin-right': '11px',
};

export default class Lecture extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = "權益受損時的救濟方式";
        return (
            <main>
                <Helmet title="勞動小教室" />
                <Desktop>
                    <div style={back_style}>
                        <span style={arrow_style} />
                        返回
                    </div>
                    <div style={style}>
                        <div style={content_style}>
                            <p style={title_style}>{title}</p>
                            {
                                this.props.content.map(({type, data},i) => (
                                    <p key={i} style={para_style}>
                                    {
                                        type == 'text' && (
                                            data=='' && '\u00A0' || data
                                        ) || type == 'image' && (
                                            <img style={img_style}/>
                                        )
                                    }
                                    </p>
                                ))
                            }
                        </div>
                        <div style={{
                            'width': '97px',
                            'height': '25px',
                            'float':'left',
                            'display':'inline-block',
                            'font-family': '"Microsoft JhengHei"',
                            'font-size': '16px',
                            'line-height': '24px',
                            'color': '#333333',
                            'display': 'flex',
                            'align-items': 'center',
                        }}>
                            <span style={{
                                'display': 'inline-block',
                                'width': '24px',
                                'height': '24px',
                                'background-color': 'yellow',
                                'margin-right': '9px',
                            }}/>
                            <span style={{
                                'margin-right': '10px',
                            }}>
                                好
                            </span>
                            <span style={{}}>
                                108
                            </span>
                        </div>
                        <div style={{
                           'width': '7.73px',
                           'height': '16.48px',
                            'float':'right',
                            'display':'inline-block',
                            'margin': '0px 14px',
                        }}>
                            t
                        </div>
                        <div style={{
                           'width': '19px',
                           'height': '14.97px',
                            'float':'right',
                            'display':'inline-block',
                            'margin': '0px 14px',
                        }}>
                            f
                        </div>
                        <div style={{
                           'width': '32px',
                           'height': '24px',
                           'font-family': '"Microsoft JhengHei"',
                           'font-size': '16px',
                           'line-height': '24px',
                           'color': '#333333',
                           'float':'right',
                            'display':'inline-block',
                            'margin': '0px 14px',
                        }}>
                            分享
                        </div>
                        <div style={{'clear':'both'}} />
                        <div style={line_style}/>
                        <div style={{'margin-top': '25px'}}>
                            <div style={{'float':'left','text-align':'left'}}>
                                <div style={pager_text_style}>
                                    {'\u003C '}前一課
                                </div>
                                <div style={pager_style}>
                                </div>
                            </div>
                            <div style={{'float':'right','text-align':'right'}}>
                                <div style={pager_text_style}>
                                    下一課{' \u003E'}
                                </div>
                                <div style={pager_style}>
                                </div>
                            </div>
                            <div style={{'clear':'both'}} />
                        </div>
                    </div>
                    <div style={footer_style}>
                        覺得很有用嗎？現在就留下你的資訊吧！
                    </div>
                </Desktop>
            </main>
        );
    }
}
