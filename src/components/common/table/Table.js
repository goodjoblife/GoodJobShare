import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';
import styles from './Table.module.css';
import Column from './Column';

class Table extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    postProcessRows: PropTypes.func,
  }

  static defaultProps = {
    postProcessRows: x => x,
  }

  static Column = Column

  render() {
    const { data, primaryKey, children, className, postProcessRows } = this.props;
    const records = data.map((d, i) => {
      const record = Children.map(children, (col, idx) => {
        if (!col) return null;

        let value;
        if (typeof col.props.dataField === 'function') {
          value = col.props.dataField(d, i);
        } else {
          value = R.path(col.props.dataField.split('.'), d);
          if (col.props.dataFormatter) {
            value = col.props.dataFormatter(value, d);
          }
        }

        return (
          <td
            key={idx}
            data-th={col.props.title}
            className={cn({ [styles.alignRight]: col.props.alignRight })}
          >
            {value}
          </td>
        );
      }).filter(td => td !== null);

      return (<tr key={d[primaryKey] || i}>{record}</tr>);
    });

    const postRecords = postProcessRows(records);

    return (
      <table className={cn([styles.rwdTable, className])}>
        <thead><tr>{children}</tr></thead>
        <tbody>{postRecords}</tbody>
      </table>
    );
  }
}

export default Table;
