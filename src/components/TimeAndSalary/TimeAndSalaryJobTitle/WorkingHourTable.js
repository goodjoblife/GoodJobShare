import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { InfoButton } from 'common/Modal';
import Table from 'common/table/Table';
import InfoSalaryModal from '../common/InfoSalaryModal';
import InfoTimeModal from '../common/InfoTimeModal';
import styles from '../common/WorkingHourTable.module.css';
import commonStyles from '../views/view.module.css';
import employmentType from '../../../constants/employmentType';
import {
  getFrequency,
  getSalary,
  getWeekWorkTime,
  formatWage,
  formatDate,
} from '../common/formatter';

class WorkingHourTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  static getTitle = (val, row) => (
    <div>
      {val} <span className={`pM ${commonStyles.sector}`}>{row.sector}</span>
    </div>
  );

  static getEmploymentType = type => (type ? employmentType[type] : '');

  static getWorkingHour = (val, row) => (
    <div>{`${typeof val === 'undefined' ? '-' : val} / ${
      typeof row.day_real_work_time === 'undefined'
        ? '-'
        : row.day_real_work_time
    }`}</div>
  );

  static getYear = val => {
    if (typeof val === 'number') {
      if (!val) return '-';
      return `${Math.round(val)} 年`;
    }
    return '-';
  };

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
      <Table
        className={styles.companyTable}
        data={data}
        primaryKey="created_at"
      >
        <Table.Column
          className={styles.colPosition}
          title="職稱"
          dataField="job_title"
          dataFormatter={WorkingHourTable.getTitle}
        >
          公司名稱
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
          dataField={getWeekWorkTime}
        >
          一週總工時
        </Table.Column>
        <Table.Column
          className={styles.colFrequency}
          title="加班頻率"
          dataField={getFrequency}
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
          dataField={getSalary}
          alignRight
        >
          薪資
        </Table.Column>
        <Table.Column
          className={styles.colHourly}
          title="估計時薪"
          dataField={R.compose(
            formatWage,
            R.prop('estimated_hourly_wage'),
          )}
          alignRight
        >
          <InfoSalaryModal
            isOpen={this.state.infoSalaryModal.isOpen}
            close={this.toggleInfoSalaryModal}
          />
          <InfoButton onClick={this.toggleInfoSalaryModal}>估計時薪</InfoButton>
        </Table.Column>
        <Table.Column
          className={styles.colDataTime}
          title="參考時間"
          dataField={R.compose(
            formatDate,
            R.prop('data_time'),
          )}
        >
          <InfoTimeModal
            isOpen={this.state.infoTimeModal.isOpen}
            close={this.toggleInfoTimeModal}
          />
          <InfoButton onClick={this.toggleInfoTimeModal}>參考時間</InfoButton>
        </Table.Column>
      </Table>
    );
  }
}

export default WorkingHourTable;
