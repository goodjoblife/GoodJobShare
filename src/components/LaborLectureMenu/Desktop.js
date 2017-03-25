import React from 'react';

const style = {
    'position': 'relative',
    'margin-top': '67px',
    'padding-top': '38px',
    'text-align': 'center',
    'margin-bottom': '57.5px',
};

const Desktop = ({ children }) => (
    <div style={style}>
        {children}
    </div>
);

export default Desktop;
