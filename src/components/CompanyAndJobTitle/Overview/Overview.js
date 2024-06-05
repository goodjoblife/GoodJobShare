import React from 'react';
import PropTypes from 'prop-types';

import { Section } from 'common/base';

import SnippetBlock from './SnippetBlock';
import WorkingHourTable from '../TimeAndSalary/WorkingHourTable';
import WorkExperienceEntry from '../WorkExperiences/ExperienceEntry';
import InterviewExperienceEntry from '../InterviewExperiences/ExperienceEntry';
import { tabType as TAB_TYPE, generateTabURL } from 'constants/companyJobTitle';
import SummaryBlock from './SummaryBlock';

const Overview = ({
  pageType,
  pageName,
  interviewExperiences,
  interviewExperiencesCount,
  workExperiences,
  workExperiencesCount,
  salaryWorkTimes,
  salaryWorkTimesCount,
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  canView,
}) => {
  return (
    <Section Tag="main" paddingBottom>
      <SnippetBlock
        title="薪水&加班狀況"
        linkText={`查看 ${salaryWorkTimesCount} 筆完整的薪水、加班數據資料 >>`}
        linkTo={generateTabURL({
          pageType,
          pageName,
          tabType: TAB_TYPE.TIME_AND_SALARY,
        })}
        isEmpty={salaryWorkTimesCount === 0}
        pageType={pageType}
        pageName={pageName}
        tabType={TAB_TYPE.TIME_AND_SALARY}
      >
        <SummaryBlock
          salaryDistribution={salaryDistribution}
          jobAverageSalaries={jobAverageSalaries}
          averageWeekWorkTime={averageWeekWorkTime}
          overtimeFrequencyCount={overtimeFrequencyCount}
        />
        <WorkingHourTable
          data={salaryWorkTimes}
          hideContent={!canView}
          pageType={pageType}
        />
      </SnippetBlock>
      <SnippetBlock
        title="工作心得"
        linkText={`查看 ${workExperiencesCount} 篇完整的工作心得 >>`}
        linkTo={generateTabURL({
          pageType,
          pageName,
          tabType: TAB_TYPE.WORK_EXPERIENCE,
        })}
        isEmpty={workExperiencesCount === 0}
        pageType={pageType}
        pageName={pageName}
        tabType={TAB_TYPE.WORK_EXPERIENCE}
      >
        {workExperiences.map(d => (
          <WorkExperienceEntry
            key={d.id}
            pageType={pageType}
            data={d}
            canView={canView}
          />
        ))}
      </SnippetBlock>
      <SnippetBlock
        title="面試心得"
        linkText={`查看 ${interviewExperiencesCount} 篇完整的面試心得 >>`}
        linkTo={generateTabURL({
          pageType,
          pageName,
          tabType: TAB_TYPE.INTERVIEW_EXPERIENCE,
        })}
        isEmpty={interviewExperiencesCount === 0}
        pageType={pageType}
        pageName={pageName}
        tabType={TAB_TYPE.INTERVIEW_EXPERIENCE}
      >
        {interviewExperiences.map(d => (
          <InterviewExperienceEntry
            key={d.id}
            pageType={pageType}
            data={d}
            canView={canView}
          />
        ))}
      </SnippetBlock>
    </Section>
  );
};

Overview.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  interviewExperiencesCount: PropTypes.number.isRequired,
  workExperiences: PropTypes.arrayOf(PropTypes.object),
  workExperiencesCount: PropTypes.number.isRequired,
  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimesCount: PropTypes.number.isRequired,
  salaryDistribution: PropTypes.array,
  jobAverageSalaries: PropTypes.array,
  averageWeekWorkTime: PropTypes.number.isRequired,
  overtimeFrequencyCount: PropTypes.object.isRequired,
  canView: PropTypes.bool.isRequired,
};

export default Overview;
