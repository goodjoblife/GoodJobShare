import PropTypes from 'prop-types';
import React from 'react';

import { Section } from 'common/base';
import BoxRenderer from 'common/StatusRenderer';
import {
  Aspect,
  generateTabURL,
  TabType,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
} from 'constants/companyJobTitle';
import usePermission from 'hooks/usePermission';
import useCompanyName from 'pages/Company/useCompanyName';
import { fetchBoxPropType } from 'utils/fetchBox';

import AspectScoreCard, { useAspectsData } from './AspectScoreCard';
import SnippetBlock from './SnippetBlock';
import SummaryBlock from './SummaryBlock';
import InterviewExperienceEntry from '../InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../WorkExperiences/ExperienceEntry';

const GenderAspectSnippetBlock = () => {
  const companyName = useCompanyName();
  const aspectModels = useAspectsData(companyName, [Aspect.GENDER]);
  if (aspectModels.length === 0) return null;

  return (
    <SnippetBlock title="性別友善">
      {aspectModels.map(aspectModel => (
        <AspectScoreCard key={aspectModel.aspect} aspect={aspectModel.aspect} />
      ))}
    </SnippetBlock>
  );
};

const OverviewSection = ({
  pageType,
  pageName,
  interviewExperiences,
  interviewExperiencesCount,
  workExperiences,
  workExperiencesCount,
  salaryWorkTimesCount,
  statisticsBox,
}) => {
  const [, , canViewPublishId] = usePermission();

  return (
    <Section Tag="main" paddingBottom>
      <SnippetBlock
        title={TAB_TYPE_DETAIL_TRANSLATION[TabType.TIME_AND_SALARY]}
        linkText={`查看 ${salaryWorkTimesCount} 筆完整的薪水、加班數據資料 >>`}
        linkTo={generateTabURL({
          pageType,
          pageName,
          tabType: TabType.TIME_AND_SALARY,
        })}
        isEmpty={salaryWorkTimesCount === 0}
        pageType={pageType}
        pageName={pageName}
        tabType={TabType.TIME_AND_SALARY}
      >
        <BoxRenderer
          box={statisticsBox}
          render={({
            salaryDistribution,
            jobAverageSalaries,
            averageWeekWorkTime,
            overtimeFrequencyCount,
          }) => (
            <SummaryBlock
              salaryDistribution={salaryDistribution}
              jobAverageSalaries={jobAverageSalaries}
              averageWeekWorkTime={averageWeekWorkTime}
              overtimeFrequencyCount={overtimeFrequencyCount}
            />
          )}
        />
      </SnippetBlock>
      <GenderAspectSnippetBlock />
      <SnippetBlock
        title={TAB_TYPE_DETAIL_TRANSLATION[TabType.WORK_EXPERIENCE]}
        linkText={`查看 ${workExperiencesCount} 篇完整的 ${
          TAB_TYPE_DETAIL_TRANSLATION[TabType.WORK_EXPERIENCE]
        } >>`}
        linkTo={generateTabURL({
          pageType,
          pageName,
          tabType: TabType.WORK_EXPERIENCE,
        })}
        isEmpty={workExperiencesCount === 0}
        pageType={pageType}
        pageName={pageName}
        tabType={TabType.WORK_EXPERIENCE}
      >
        {workExperiences.map(d => (
          <WorkExperienceEntry
            key={d.id}
            pageType={pageType}
            data={d}
            canView={canViewPublishId(d.id)}
          />
        ))}
      </SnippetBlock>
      <SnippetBlock
        title={TAB_TYPE_DETAIL_TRANSLATION[TabType.INTERVIEW_EXPERIENCE]}
        linkText={`查看 ${interviewExperiencesCount} 篇完整的${
          TAB_TYPE_DETAIL_TRANSLATION[TabType.INTERVIEW_EXPERIENCE]
        } >>`}
        linkTo={generateTabURL({
          pageType,
          pageName,
          tabType: TabType.INTERVIEW_EXPERIENCE,
        })}
        isEmpty={interviewExperiencesCount === 0}
        pageType={pageType}
        pageName={pageName}
        tabType={TabType.INTERVIEW_EXPERIENCE}
      >
        {interviewExperiences.map(d => (
          <InterviewExperienceEntry
            key={d.id}
            pageType={pageType}
            data={d}
            canView={canViewPublishId(d.id)}
          />
        ))}
      </SnippetBlock>
    </Section>
  );
};

OverviewSection.propTypes = {
  interviewExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
  interviewExperiencesCount: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  salaryWorkTimesCount: PropTypes.number.isRequired,
  statisticsBox: fetchBoxPropType.isRequired,
  workExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
  workExperiencesCount: PropTypes.number.isRequired,
};

export default OverviewSection;
