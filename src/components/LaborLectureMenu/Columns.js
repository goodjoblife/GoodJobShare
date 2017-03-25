import React from 'react'

const style = {
    'margin-top': '34px',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
};

const Columns = ({
    Item,
    items,
    n_col,
}) => {
    if(items.length % 3 != 0) {
        for(let i=0;i<items.length%3;i++) {
            items.push({title: ''});
        }
    }
    return (
        <div style={style}>
        {
            items.map((props, i) => (
                <Item key={i} {...props} />
            ))
        }
        </div>
    );
}

export default Columns;
