import React from 'react'

const Columns = ({
    Item,
    items,
    n_col,
}) => {
    return (
        <div>
        {
            items.map(({ title }) => (
                <div>
                    <Item title={title}/>
                </div>
            ))
        }
        </div>
    );
}

export default Columns;
