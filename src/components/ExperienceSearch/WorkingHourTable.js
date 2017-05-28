import React, { Component, PropTypes } from 'react';

import Table from '../common/table/Table';
import styles from './WorkingHourTable.module.css';

class WorkingHourTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  }
  static getTitle = (val, row) => (
    <div>
      {val}
      {' '}
      <span className={`pM ${styles.sector}`}>
        {row.sector}
      </span>
    </div>
  )
  static getWorkingTime = val => (
    <div
      className={styles.bar}
      style={{ width: `${val >= 100 ? 100 : val}%` }}
    >
      {val}
    </div>
  )
  static getFrequency = val => {
    let text;
    let style;
    switch (val) {
      case 0:
        text = '幾乎不';
        style = styles.hardly;
        break;
      case 1:
        text = '偶爾';
        style = styles.sometimes;
        break;
      case 2:
        text = '經常';
        style = styles.usually;
        break;
      case 3:
        text = '幾乎每天';
        style = styles.always;
        break;
      default:
        text = '幾乎不';
        style = styles.hardly;
    }
    return (
      <div>
        <div className={`${styles.dot} ${style}`} />
        {text}
      </div>
    );
  }
  static getSalary = val => {
    const amount = val.amount.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let type;
    switch (val.type) {
      case 'year':
        type = '年';
        break;
      case 'month':
        type = '月';
        break;
      case 'hour':
        type = '小時';
        break;
      default:
        type = '月';
    }
    return [amount, type].join(' / ');
  }
  static getWage = val => Math.round(val)
  static getDate = val => {
    const month = (val.month >= 10 ? '' : '0') + val.month;
    return [val.year, month].join('.');
  }

  render() {
    const { data } = this.props;

    return (
      <Table data={data} primaryKey="created_at">
        <Table.Column
          dataField="job_title"
          dataFormatter={WorkingHourTable.getTitle}
        >
          職稱
        </Table.Column>
        {/* <Column dataField="name">表訂 / 實際工時</Column> */}

        <Table.Column
          dataField="week_work_time"
          dataFormatter={WorkingHourTable.getWorkingTime}
        >
          一週總工時
        </Table.Column>

        <Table.Column
          dataField="overtime_frequency"
          dataFormatter={WorkingHourTable.getFrequency}
        >
          加班頻率
        </Table.Column>
        {/* <Column dataField="name">業界工作經歷</Column> */}

        <Table.Column
          dataField="salary"
          dataFormatter={WorkingHourTable.getSalary}
        >
          薪資
        </Table.Column>

        <Table.Column
          dataField="estimated_hourly_wage"
          dataFormatter={WorkingHourTable.getWage}
        >
          估計時薪
        </Table.Column>

        <Table.Column
          dataField="data_time"
          dataFormatter={WorkingHourTable.getDate}
        >
          參考時間
        </Table.Column>
      </Table>
    );
  }
}

export default WorkingHourTable;
