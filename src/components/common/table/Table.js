import React, { Component, PropTypes } from 'react';

import Column from './Column';

class Table extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
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
    const { data, primaryKey, children } = this.props;
    const records = [];
    let record;
    let value;

    data.forEach((d, i) => {
      record = [];
      children.forEach((col, idx) => {
        value = Table.getValue(d, col.props.dataField);
        if (col.props.dataFormatter) {
          value = col.props.dataFormatter(value, d);
        }
        record.push(<td key={idx}>{value}</td>);
      });
      records.push(<tr key={d[primaryKey] || i}>{record}</tr>);
    });

    return (
      <table>
        <thead><tr>{children}</tr></thead>
        <tbody>{records}</tbody>
      </table>
    );
  }
}

export default Table;
