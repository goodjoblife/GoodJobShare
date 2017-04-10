import React from 'react';
import styles from './Columns.module.css';

const Columns = ({
  Item,
  items,
}) => {
  if (items.length % 3 !== 0) {
    for (let i = 0; i < items.length % 3; i += 1) {
      items.push({ title: '' });
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
};

Columns.propTypes = {
  Item: React.PropTypes.node,
  items: React.PropTypes.array,
};

export default Columns;
