import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Columns.module.css';

const Columns = ({ Item, items, gutter }) => (
  <div className={styles.columns}>
    {items.map((props, i) => (
      <div key={i} className={cn(styles.column, styles[`gutter-${gutter}`])}>
        <Item {...props} />
      </div>
    ))}
  </div>
);

Columns.propTypes = {
  Item: PropTypes.func.isRequired,
  gutter: PropTypes.oneOf(['s', 'm', 'l']),
  items: PropTypes.array.isRequired,
};
Columns.defaultProps = {
  gutter: 'm',
};

export default Columns;
