import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InfoButton } from 'common/Modal';
import Table from 'common/table/Table';
import InfoSalaryModal from './InfoSalaryModal';
import InfoTimeModal from './InfoTimeModal';
import styles from './WorkingHourTable.module.css';
import commonStyles from '../views/view.module.css';
import employmentType from '../../../constants/employmentType';

class WorkingHourTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  }
  static getTitle = (val, row) => (
    <div>
      {val}
      {' '}
      <span className={`pM ${commonStyles.sector}`}>
        {row.sector}
      </span>
    </div>
  )
  static getEmploymentType = type => (type ? employmentType[type] : '')
  static getWorkingHour = (val, row) => (
    <div>{`${val} / ${row.day_real_work_time}`}</div>
  )
  static getWorkingTime = val => (
    <div
      className={commonStyles.bar}
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
        style = commonStyles.hardly;
        break;
      case 1:
        text = '偶爾';
        style = commonStyles.sometimes;
        break;
      case 2:
        text = '經常';
        style = commonStyles.usually;
        break;
      case 3:
        text = '幾乎每天';
        style = commonStyles.always;
        break;
      default:
        text = '幾乎不';
        style = commonStyles.hardly;
    }
    return (
      <div>
        <div className={`${commonStyles.dot} ${style}`} />
        {text}
      </div>
    );
  }
  static getSalary = val => {
    if (!val) {
      return '-';
    }
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
  static getYear = val => {
    if (typeof val === 'number') {
      if (!val) return '-';
      return `${Math.round(val)} 年`;
    }
    return '';
  }
  static getWage = val => {
    if (typeof val === 'number') {
      if (!val) return '-';
      return `${Math.round(val)} 元`;
    }
    return '';
  }
  static getDate = val => {
    const month = (val.month >= 10 ? '' : '0') + val.month;
    return [val.year, month].join('.');
  }

  constructor(props) {
    super(props);
    this.toggleInfoSalaryModal = this.toggleInfoSalaryModal.bind(this);
    this.toggleInfoTimeModal = this.toggleInfoTimeModal.bind(this);
    this.state = {
      infoSalaryModal: {
        isOpen: false,
      },
      infoTimeModal: {
        isOpen: false,
      },
    };
  }

  toggleInfoSalaryModal() {
    const state = this.state;
    state.infoSalaryModal.isOpen = !state.infoSalaryModal.isOpen;
    this.setState(state);
  }

  toggleInfoTimeModal() {
    const state = this.state;
    state.infoTimeModal.isOpen = !state.infoTimeModal.isOpen;
    this.setState(state);
  }

  render() {
    const { data } = this.props;

    return (
      <Table className={styles.companyTable} data={data} primaryKey="created_at">
        <Table.Column
          className={styles.colPosition}
          title="職稱"
          dataField="job_title"
          dataFormatter={WorkingHourTable.getTitle}
        >
          職稱
        </Table.Column>

        <Table.Column
          className={styles.colType}
          title="職務型態"
          dataField="employment_type"
          dataFormatter={WorkingHourTable.getEmploymentType}
        >
          職務型態
        </Table.Column>

        <Table.Column
          className={styles.colDayTime}
          title="表訂 / 實際工時"
          dataField="day_promised_work_time"
          dataFormatter={WorkingHourTable.getWorkingHour}
        >
          表訂 / 實際工時
        </Table.Column>

        <Table.Column
          className={styles.colWeekTime}
          title="一週總工時"
          dataField="week_work_time"
          dataFormatter={WorkingHourTable.getWorkingTime}
        >
          一週總工時
        </Table.Column>

        <Table.Column
          className={styles.colFrequency}
          title="加班頻率"
          dataField="overtime_frequency"
          dataFormatter={WorkingHourTable.getFrequency}
        >
          加班頻率
        </Table.Column>

        <Table.Column
          className={styles.colExperience}
          title="業界工作經歷"
          dataField="experience_in_year"
          dataFormatter={WorkingHourTable.getYear}
        >
          業界工作經歷
        </Table.Column>

        <Table.Column
          className={styles.colSalary}
          title="薪資"
          dataField="salary"
          dataFormatter={WorkingHourTable.getSalary}
          alignRight
        >
          薪資
        </Table.Column>

        <Table.Column
          className={styles.colHourly}
          title="估計時薪"
          dataField="estimated_hourly_wage"
          dataFormatter={WorkingHourTable.getWage}
          alignRight
        >
          <InfoSalaryModal
            isOpen={this.state.infoSalaryModal.isOpen}
            close={this.toggleInfoSalaryModal}
          />
          <InfoButton onClick={this.toggleInfoSalaryModal}>
            估計時薪
          </InfoButton>
        </Table.Column>

        <Table.Column
          className={styles.colDataTime}
          title="參考時間"
          dataField="data_time"
          dataFormatter={WorkingHourTable.getDate}
        >
          <InfoTimeModal
            isOpen={this.state.infoTimeModal.isOpen}
            close={this.toggleInfoTimeModal}
          />
          <InfoButton onClick={this.toggleInfoTimeModal}>
            參考時間
          </InfoButton>
        </Table.Column>
      </Table>
    );
  }
}

export default WorkingHourTable;
