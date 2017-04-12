import React from 'react';
import styles from './Columns.module.css';

const Columns = ({
  Item,
  items,
}) => (
  <div className={styles.columns}>
    {
      items.map((props, i) => (
        <div className={styles.column}>
          <Item key={i} {...props} />
        </div>
      ))
    }
  </div>
);

Columns.propTypes = {
  Item: React.PropTypes.node,
  items: React.PropTypes.array,
};

export default Columns;
