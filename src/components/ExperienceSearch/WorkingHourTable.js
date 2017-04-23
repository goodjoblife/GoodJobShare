import React, { Component, PropTypes } from 'react';

import Table from '../common/table/Table';
import Column from '../common/table/Column';
import styles from './WorkingHourTable.module.css';

class WorkingHourTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  }
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
      <Table data={data} primaryKey="_id">
        <Column dataField="company.name">公司名稱</Column>
        <Column dataField="job_title">職稱</Column>
        {/* <Column dataField="name">表訂 / 實際工時</Column> */}
        <Column
          dataField="week_work_time"
          dataFormatter={WorkingHourTable.getWorkingTime}
        >
          一週總工時
        </Column>
        <Column
          dataField="overtime_frequency"
          dataFormatter={WorkingHourTable.getFrequency}
        >
          加班頻率
        </Column>
        {/* <Column dataField="name">業界工作經歷</Column> */}
        <Column dataField="salary" dataFormatter={WorkingHourTable.getSalary}>
          薪資
        </Column>
        <Column
          dataField="estimated_hourly_wage"
          dataFormatter={WorkingHourTable.getWage}
        >
          估計時薪
        </Column>
        <Column dataField="data_time" dataFormatter={WorkingHourTable.getDate}>
          參考時間
        </Column>
      </Table>
    );
  }
}

export default WorkingHourTable;
