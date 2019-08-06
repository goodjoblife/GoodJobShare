import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withPermission } from 'common/permission-context';

import SnippetBlock from './SnippetBlock';
import WorkingHourTable from '../TimeAndSalary/WorkingHourTable';
import styles from './Overview.module.css';

const SALARY_WORK_TIMES_LIMIT = 5;

const Overview = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  canViewTimeAndSalary,
}) => (
  <div className={styles.container}>
    <SnippetBlock
      title="薪水&加班狀況"
      linkText={`查看 ${salaryWorkTimes.length} 筆完整的薪水、加班數據資料 >>`}
      linkTo="salary-work-times"
    >
      <WorkingHourTable
        data={salaryWorkTimes.slice(0, SALARY_WORK_TIMES_LIMIT)}
        hideContent={!canViewTimeAndSalary}
        pageType={pageType}
      />
    </SnippetBlock>
  </div>
);

Overview.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  workExperiences: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object),
  canViewTimeAndSalary: PropTypes.bool.isRequired,
};

const hoc = compose(withPermission);

export default hoc(Overview);
