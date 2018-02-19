import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import Table from 'common/table/Table';
import { InfoButton } from 'common/Modal';
import styles from '../TimeAndSalaryBoard/TimeAndSalaryBoard.module.css';

import {
  getCompany,
  getJobTitle,
  getFrequency,
  getWeekWorkTime,
  getSalary,
  formatWage,
  formatDate,
} from './formatter';

const DashBoardTable = ({
  data,
  postProcessRows,
  toggleInfoSalaryModal,
  toggleInfoTimeModal,
}) => (
  <Table
    className={styles.latestTable}
    data={data}
    primaryKey="_id"
    postProcessRows={postProcessRows}
  >
    <Table.Column
      className={styles.colCompany}
      title="公司名稱"
      dataField={getCompany}
    >
      公司名稱
    </Table.Column>
    <Table.Column
      className={styles.colCompany}
      title="職稱"
      dataField={getJobTitle}
    >
      職稱
      <span className="table-sector">廠區/門市/分公司</span>
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
      dataField={R.compose(formatWage, R.prop('estimated_hourly_wage'))}
      alignRight
    >
      <InfoButton onClick={toggleInfoSalaryModal}>
        估計時薪
      </InfoButton>
    </Table.Column>
    <Table.Column
      className={styles.colDataTime}
      title="參考時間"
      dataField={R.compose(formatDate, R.prop('data_time'))}
    >
      <InfoButton onClick={toggleInfoTimeModal}>
        參考時間
      </InfoButton>
    </Table.Column>
  </Table>
);

DashBoardTable.propTypes = {
  data: PropTypes.array.isRequired,
  postProcessRows: PropTypes.func.isRequired,
  toggleInfoSalaryModal: PropTypes.func.isRequired,
  toggleInfoTimeModal: PropTypes.func.isRequired,
};

export default DashBoardTable;
