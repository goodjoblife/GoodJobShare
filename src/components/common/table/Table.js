import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
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

  static getValue = (data, path) => {
    const parts = path.split('.');
    const len = parts.length;
    if (len > 1) {
      let d = data;
      for (let i = 0; i < len; i += 1) {
        d = d[parts[i]];
      }
      return d;
    }
    return data[parts[0]];
  }

  render() {
    const { data, primaryKey, children, className, postProcessRows } = this.props;
    const records = [];
    let record;
    let value;

    data.forEach((d, i) => {
      record = [];
      Children.forEach(children, (col, idx) => {
        value = Table.getValue(d, col.props.dataField);
        if (col.props.dataFormatter) {
          value = col.props.dataFormatter(value, d);
        }
        record.push(
          <td
            key={idx}
            data-th={col.props.title}
            className={cn({ [styles.alignRight]: col.props.alignRight })}
          >
            {value}
          </td>
        );
      });
      records.push(<tr key={d[primaryKey] || i}>{record}</tr>);
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
