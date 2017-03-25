import React from 'react';

const style = {
    'position': 'relative',
    'margin-top': '67px',
    'padding-top': '38px',
    'text-align': 'center',
};

const Desktop = ({ children }) => (
    <div style={style}>
        {children}
    </div>
);

export default Desktop;
