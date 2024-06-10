import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { InfoButton } from 'common/Modal';
import Table from 'common/table/Table';
import { pageType as pageTypeMapping } from 'constants/companyJobTitle';
import {
  InfoSalaryModal,
  InfoTimeModal,
} from '../../TimeAndSalary/common/InfoModal';
import styles from '../../TimeAndSalary/common/WorkingHourTable.module.css';
import {
  getNameAsJobTitle,
  getNameAsCompanyName,
  getEmploymentType,
  getWorkingHour,
  getYear,
  getFrequency,
  getSalary,
  getWeekWorkTime,
  formatWage,
  formatDate,
} from '../../TimeAndSalary/common/formatter';
import injectHideContentBlock from '../../TimeAndSalary/common/injectHideContentBlock';

const columnProps = [
  {
    className: styles.colPosition,
    title: '職稱',
    dataField: 'job_title',
    dataFormatter: getNameAsJobTitle,
    Children: () => '職稱',
    isEnabled: ({ pageType }) => pageType === pageTypeMapping.COMPANY,
  },
  {
    className: styles.colPosition,
    title: '公司名稱',
    dataField: 'company',
    dataFormatter: getNameAsCompanyName,
    Children: () => '公司名稱',
    isEnabled: ({ pageType }) => pageType === pageTypeMapping.JOB_TITLE,
  },
  {
    className: styles.colType,
    title: '職務型態',
    dataField: 'employment_type',
    dataFormatter: getEmploymentType,
    Children: () => '職務型態',
  },
  {
    className: styles.colDayTime,
    title: '表訂 / 實際工時',
    dataField: 'day_promised_work_time',
    dataFormatter: getWorkingHour,
    Children: () => '表訂 / 實際工時',
  },
  {
    className: styles.colWeekTime,
    title: '一週總工時',
    dataField: getWeekWorkTime,
    Children: () => '一週總工時',
  },
  {
    className: styles.colFrequency,
    title: '加班頻率',
    dataField: getFrequency,
    Children: () => '加班頻率',
  },
  {
    className: styles.colExperience,
    title: '業界工作經歷',
    dataField: 'experience_in_year',
    dataFormatter: getYear,
    Children: () => '業界工作經歷',
  },
  {
    className: styles.colSalary,
    title: '薪資',
    dataField: getSalary,
    alignRight: true,
    Children: () => '薪資',
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
    Children: ({ isInfoSalaryModalOpen, toggleInfoSalaryModal }) => (
      <React.Fragment>
        <InfoSalaryModal
          isOpen={isInfoSalaryModalOpen}
          close={toggleInfoSalaryModal}
        />
        <InfoButton onClick={toggleInfoSalaryModal}>估計時薪</InfoButton>
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
    Children: ({ isInfoTimeModalOpen, toggleInfoTimeModal }) => (
      <React.Fragment>
        <InfoTimeModal
          isOpen={isInfoTimeModalOpen}
          close={toggleInfoTimeModal}
        />
        <InfoButton onClick={toggleInfoTimeModal}>參考時間</InfoButton>
      </React.Fragment>
    ),
  },
];

const WorkingHourTable = ({ data, hideContent, pageType }) => {
  const [isInfoSalaryModalOpen, setInfoSalaryModalOpen] = useState(false);
  const [isInfoTimeModalOpen, setInfoTiimeModalOpen] = useState(false);

  const toggleInfoSalaryModal = useCallback(() => {
    setInfoSalaryModalOpen(!isInfoSalaryModalOpen);
  }, [isInfoSalaryModalOpen]);

  const toggleInfoTimeModal = useCallback(() => {
    setInfoTiimeModalOpen(!isInfoTimeModalOpen);
  }, [isInfoTimeModalOpen]);

  const filteredColumnProps = useMemo(
    () =>
      columnProps.filter(({ isEnabled }) =>
        isEnabled ? isEnabled({ pageType }) : true,
      ),
    [pageType],
  );

  const hideRange = useMemo(
    () => [
      R.findIndex(R.propEq('permissionRequiredStart', true))(
        filteredColumnProps,
      ),
      R.findIndex(R.propEq('permissionRequiredEnd', true))(filteredColumnProps),
    ],
    [filteredColumnProps],
  );

  const postProcessRows = useCallback(
    rows => {
      if (hideContent) {
        injectHideContentBlock(hideRange)(rows);
      }
      return rows;
    },
    [hideContent, hideRange],
  );

  return (
    <Table
      className={styles.companyTable}
      data={data}
      primaryKey="created_at"
      postProcessRows={postProcessRows}
    >
      {columnProps
        .filter(({ isEnabled }) => (isEnabled ? isEnabled({ pageType }) : true))
        .map(({ Children, ...props }) => (
          <Table.Column key={props.title} {...props}>
            <Children
              isInfoSalaryModalOpen={isInfoSalaryModalOpen}
              toggleInfoSalaryModal={toggleInfoSalaryModal}
              isInfoTimeModalOpen={isInfoTimeModalOpen}
              toggleInfoTimeModal={toggleInfoTimeModal}
            />
          </Table.Column>
        ))}
    </Table>
  );
};

WorkingHourTable.propTypes = {
  data: PropTypes.array.isRequired,
  hideContent: PropTypes.bool.isRequired,
  pageType: PropTypes.oneOf([
    pageTypeMapping.COMPANY,
    pageTypeMapping.JOB_TITLE,
  ]),
};

export default WorkingHourTable;
