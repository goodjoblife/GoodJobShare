import React from 'react'
import styles from './LectureMenu.module.css';

const Columns = ({
    Item,
    items,
}) => {
    if(items.length % 3 != 0) {
        for(let i=0;i<items.length%3;i++) {
            items.push({title: ''});
        }
    }
    return (
        <div className={styles.columns}>
        {
            items.map((props, i) => (
                <Item key={i} {...props} />
            ))
        }
        </div>
    );
}

export default Columns;
