import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withPermission } from 'common/permission-context';

import SnippetBlock from './SnippetBlock';
import WorkingHourTable from '../TimeAndSalary/WorkingHourTable';
import WorkExperienceEntry from '../WorkExperiences/ExperienceEntry';
import InterviewExperienceEntry from '../InterviewExperiences/ExperienceEntry';
import styles from './Overview.module.css';

const SALARY_WORK_TIMES_LIMIT = 5;
const WORK_EXPERIENCES_LIMIT = 3;
const INTERVIEW_EXPERIENCES_LIMIT = 3;

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
      isEmpty={salaryWorkTimes.length === 0}
    >
      <WorkingHourTable
        data={salaryWorkTimes.slice(0, SALARY_WORK_TIMES_LIMIT)}
        hideContent={!canViewTimeAndSalary}
        pageType={pageType}
      />
    </SnippetBlock>
    <SnippetBlock
      title="工作心得"
      linkText={`查看 ${workExperiences.length} 篇完整的工作心得 >>`}
      linkTo="work-experiences"
      isEmpty={workExperiences.length === 0}
    >
      {workExperiences.slice(0, WORK_EXPERIENCES_LIMIT).map(d => (
        <WorkExperienceEntry key={d.id} pageType={pageType} data={d} />
      ))}
    </SnippetBlock>
    <SnippetBlock
      title="面試心得"
      linkText={`查看 ${interviewExperiences.length} 篇完整的面試心得 >>`}
      linkTo="interview-experiences"
      isEmpty={interviewExperiences.length === 0}
    >
      {interviewExperiences.slice(0, INTERVIEW_EXPERIENCES_LIMIT).map(d => (
        <InterviewExperienceEntry key={d.id} pageType={pageType} data={d} />
      ))}
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
