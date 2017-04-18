import React from 'react';
import styles from './Columns.module.css';

const Columns = ({
  Item,
  items,
}) => (
  <div className={styles.columns}>
    {
      items.map((props, i) => (
        <div key={i} className={styles.column}>
          <Item {...props} />
        </div>
      ))
    }
  </div>
);

Columns.propTypes = {
  Item: React.PropTypes.func,
  items: React.PropTypes.array,
};

export default Columns;
