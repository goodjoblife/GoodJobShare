import React from 'react';

const style = {
    'margin-top': '67px',
    'padding-top': '38px',
    'text-align': 'center',
};

const h3_style = {
    'font-family': '"Microsoft JhengHei"',
    'font-size': '36px',
    'font-weight': 'normal',
    'line-height': '41px',
    'letter-spacing': '2px',
    'color': '#000000',
};

const Desktop = ({ children }) => (
    <div style={style}>
        <h3 style={h3_style}>勞動小教室</h3>
        {children}
    </div>
);

export default Desktop;
