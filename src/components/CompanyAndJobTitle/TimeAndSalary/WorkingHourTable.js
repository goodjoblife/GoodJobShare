import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { InfoButton } from 'common/Modal';
import Table from 'common/table/Table';
import {
  PAGE_SIZE,
  pageType as pageTypeMapping,
} from 'constants/companyJobTitle';
import { InfoSalaryModal, InfoTimeModal } from './InfoModal';
import styles from './WorkingHourTable.module.css';
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
import usePermission from 'hooks/usePermission';
import ReportBadge from 'common/button/ReportBadge';
import ReportZone from 'components/ExperienceDetail/ReportZone';
import { REPORT_TYPE } from 'components/ExperienceDetail/ReportZone/ReportForm/constants';
import { useDispatch } from 'react-redux';
import {
  queryCompanyOverview,
  queryCompanyTimeAndSalary,
} from 'actions/company';
import { usePage } from 'hooks/routing/page';
import { useSearchTextFromQuery } from '../Searchbar';
import useCompanyName from 'pages/Company/useCompanyName';
import {
  queryJobTitleOverview,
  queryJobTitleTimeAndSalary,
} from 'actions/jobTitle';
import useJobTitle from 'pages/JobTitle/useJobTitle';
import { tabType as TAB_TYPE } from 'constants/companyJobTitle';

const SalaryHeader = ({ isInfoSalaryModalOpen, toggleInfoSalaryModal }) => (
  <React.Fragment>
    <InfoSalaryModal
      isOpen={isInfoSalaryModalOpen}
      close={toggleInfoSalaryModal}
    />
    <InfoButton onClick={toggleInfoSalaryModal}>估計時薪</InfoButton>
  </React.Fragment>
);

SalaryHeader.propTypes = {
  isInfoSalaryModalOpen: PropTypes.bool.isRequired,
  toggleInfoSalaryModal: PropTypes.func.isRequired,
};

const TimeHeader = ({ isInfoTimeModalOpen, toggleInfoTimeModal }) => (
  <React.Fragment>
    <InfoTimeModal isOpen={isInfoTimeModalOpen} close={toggleInfoTimeModal} />
    <InfoButton onClick={toggleInfoTimeModal}>參考時間</InfoButton>
  </React.Fragment>
);

TimeHeader.propTypes = {
  isInfoTimeModalOpen: PropTypes.bool.isRequired,
  toggleInfoTimeModal: PropTypes.func.isRequired,
};

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
    dataField: R.compose(formatWage, R.prop('estimated_hourly_wage')),
    alignRight: true,
    Children: SalaryHeader,
    permissionRequiredEnd: true,
  },
  {
    className: styles.colDataTime,
    title: '參考時間',
    dataField: R.compose(formatDate, R.prop('data_time')),
    Children: TimeHeader,
  },
  {
    className: styles.colDataTime,
    title: '回報',
    dataField: R.compose(({ id, reportCount, reports, handleCreateReport }) => {
      return (
        <ReportZone
          reportType={REPORT_TYPE.SALARY}
          id={id}
          reports={reports}
          reportCount={reportCount}
          onCreateReport={handleCreateReport}
        >
          <ReportBadge reportCount={reportCount} />
        </ReportZone>
      );
    }),
    Children: () => '回報',
  },
];

const WorkingHourTable = ({ data, pageType, tabType }) => {
  const [isInfoSalaryModalOpen, setInfoSalaryModalOpen] = useState(false);
  const [isInfoTimeModalOpen, setInfoTiimeModalOpen] = useState(false);
  const dispatch = useDispatch();
  const companyName = useCompanyName();
  const [searchText] = useSearchTextFromQuery();
  const page = usePage();
  const jobTitle = useJobTitle();

  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

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

  const [fromCol, toCol] = useMemo(
    () => [
      R.findIndex(R.propEq('permissionRequiredStart', true))(
        filteredColumnProps,
      ),
      R.findIndex(R.propEq('permissionRequiredEnd', true))(filteredColumnProps),
    ],
    [filteredColumnProps],
  );

  const [, , canViewPublishId] = usePermission();

  const postProcessRows = useCallback(
    (rows, data) => {
      injectHideContentBlock({
        rows,
        data,
        fromCol,
        toCol,
        canViewPublishId,
      });
      return rows;
    },
    [canViewPublishId, fromCol, toCol],
  );

  const handleCreateReport = () => {
    const force = true;
    const isCompanyPage = pageType === pageTypeMapping.COMPANY;
    const isJobTitlePage = pageType === pageTypeMapping.JOB_TITLE;
    const isTimeAndSalary = tabType === TAB_TYPE.TIME_AND_SALARY;

    if (isCompanyPage && isTimeAndSalary) {
      return dispatch(
        queryCompanyTimeAndSalary(
          {
            companyName,
            jobTitle: searchText || undefined,
            start,
            limit,
          },
          force,
        ),
      );
    }

    if (isCompanyPage) {
      return dispatch(queryCompanyOverview(companyName, force));
    }

    if (isJobTitlePage && isTimeAndSalary) {
      return dispatch(
        queryJobTitleTimeAndSalary(
          {
            jobTitle,
            companyName: searchText || undefined,
            start,
            limit,
          },
          force,
        ),
      );
    }

    if (isJobTitlePage) {
      return dispatch(queryJobTitleOverview(jobTitle, force));
    }
  };

  return (
    <Table
      className={styles.companyTable}
      data={data.map(row => ({ ...row, handleCreateReport }))}
      primaryKey="created_at"
      postProcessRows={postProcessRows}
    >
      {columnProps
        .filter(({ isEnabled }) => (isEnabled ? isEnabled({ pageType }) : true))
        .map(({ Children, ...props }) => (
          // eslint-disable-next-line react/prop-types
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
  pageType: PropTypes.oneOf([
    pageTypeMapping.COMPANY,
    pageTypeMapping.JOB_TITLE,
  ]),
  tabType: PropTypes.oneOf([TAB_TYPE.TIME_AND_SALARY]),
};

export default WorkingHourTable;
