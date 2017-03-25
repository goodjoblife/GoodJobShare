import React from 'react';

const style = {
    'width': '349px',
    'height': '300px',
    'flex': '0 0 auto',
    'margin-left': '26.5px',
    'margin-right': '26.5px',
    'margin-top': '36.5px',
    'margin-bottom': '36.5px',
    'cursor': 'pointer',
};

const img_style = {
    'width': '349px',
    'height': '249px',
};

const title_style = {
    'margin-top': '19px',
    'width': '331px',
    'height': '32px',
    'font-family': '"Microsoft JhengHei"',
    'font-size': '24px',
    'font-weight': 'bold',
    'line-height': '32px',
    'text-align': 'left',
    'color': '#000000',
};

const Lecture = ({title, cover}) => (
    <div style={style} onClick={e => { alert('Link') }}>
        {cover && <img src={cover} style={img_style} /> }
        <div style={title_style}>
            {title}
        </div>
    </div>
);

export default Lecture;
