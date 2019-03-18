import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { InfoButton } from 'common/Modal';
import Table from 'common/table/Table';
import InfoSalaryModal from '../common/InfoSalaryModal';
import InfoTimeModal from '../common/InfoTimeModal';
import styles from '../common/WorkingHourTable.module.css';
import {
  getName,
  getEmploymentType,
  getWorkingHour,
  getYear,
  getFrequency,
  getSalary,
  getWeekWorkTime,
  formatWage,
  formatDate,
} from '../common/formatter';
import injectHideContentBlock from '../common/injectHideContentBlock';

const columnProps = [
  {
    className: styles.colPosition,
    title: '公司名稱',
    dataField: 'company',
    dataFormatter: getName,
    renderChildren: () => '公司名稱',
  },
  {
    className: styles.colType,
    title: '職務型態',
    dataField: 'employment_type',
    dataFormatter: getEmploymentType,
    renderChildren: () => '職務型態',
  },
  {
    className: styles.colDayTime,
    title: '表訂 / 實際工時',
    dataField: 'day_promised_work_time',
    dataFormatter: getWorkingHour,
    renderChildren: () => '表訂 / 實際工時',
  },
  {
    className: styles.colWeekTime,
    title: '一週總工時',
    dataField: getWeekWorkTime,
    renderChildren: () => '一週總工時',
  },
  {
    className: styles.colFrequency,
    title: '加班頻率',
    dataField: getFrequency,
    renderChildren: () => '加班頻率',
  },
  {
    className: styles.colExperience,
    title: '業界工作經歷',
    dataField: 'experience_in_year',
    dataFormatter: getYear,
    renderChildren: () => '業界工作經歷',
  },
  {
    className: styles.colSalary,
    title: '薪資',
    dataField: getSalary,
    alignRight: true,
    renderChildren: () => '薪資',
    permissionRequiredStart: true,
  },
  {
    className: styles.colHourly,
    title: '估計時薪',
    dataField: R.compose(
      formatWage,
      R.prop('estimated_hourly_wage'),
    ),
    alignRight: true,
    renderChildren: context => (
      <React.Fragment>
        <InfoSalaryModal
          isOpen={context.state.infoSalaryModal.isOpen}
          close={context.toggleInfoSalaryModal}
        />
        <InfoButton onClick={context.toggleInfoSalaryModal}>
          估計時薪
        </InfoButton>
      </React.Fragment>
    ),
    permissionRequiredEnd: true,
  },
  {
    className: styles.colDataTime,
    title: '參考時間',
    dataField: R.compose(
      formatDate,
      R.prop('data_time'),
    ),
    renderChildren: context => (
      <React.Fragment>
        <InfoTimeModal
          isOpen={context.state.infoTimeModal.isOpen}
          close={context.toggleInfoTimeModal}
        />
        <InfoButton onClick={context.toggleInfoTimeModal}>參考時間</InfoButton>
      </React.Fragment>
    ),
  },
];

class WorkingHourTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
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

  postProcessRows = rows => {
    if (this.props.hideContent) {
      const hideRange = [
        R.findIndex(R.propEq('permissionRequiredStart', true))(columnProps),
        R.findIndex(R.propEq('permissionRequiredEnd', true))(columnProps),
      ];
      injectHideContentBlock(hideRange)(rows);
    }
    return rows;
  };

  render() {
    const { data } = this.props;

    return (
      <Table
        className={styles.companyTable}
        data={data}
        primaryKey="created_at"
        postProcessRows={this.postProcessRows}
      >
        {columnProps.map(({ renderChildren, ...props }) => (
          <Table.Column
            key={props.title}
            {...props}
            children={renderChildren(this)}
          />
        ))}
      </Table>
    );
  }
}

export default WorkingHourTable;
