import React from 'react';

import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
import { Section } from 'common/base';
import BoxRenderer from 'common/StatusRenderer';
import {
  Aspect,
  generateTabURL,
  PageType,
  TabType,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
} from 'constants/companyJobTitle';
import usePermission from 'hooks/usePermission';
import { CompanyOverviewStatistics } from 'reducers/companyIndex';
import { JobTitleOverviewStatistics } from 'reducers/jobTitleIndex';
import FetchBox from 'utils/fetchBox';

import AspectScoreCard, { useAspectsData } from '../AspectScoreCard';
import SnippetBlock from '../SnippetBlock';
import SummaryBlock from './SummaryBlock';
import InterviewExperienceEntryJS from '../InterviewExperiences/ExperienceEntry';
import { useCompanyName } from '../PageContextProvider';
import WorkExperienceEntryJS from '../WorkExperiences/ExperienceEntry';

type ExperienceEntryProps<Data> = {
  pageType: PageType;
  data: Data;
  canView: boolean;
};

// 兩個 ExperienceEntry 還是 JS，TS 會從它們的參數解構樣式推導 props
// （`sections: [section]` 推成 tuple、解構到的 week_work_time 被當成必填），
// 與 apis/overview 的實際型別不符。等它們轉 TS 後即可移除這兩個 cast。
const WorkExperienceEntry = (WorkExperienceEntryJS as unknown) as React.FC<
  ExperienceEntryProps<WorkExperienceInOverview>
>;
const InterviewExperienceEntry = (InterviewExperienceEntryJS as unknown) as React.FC<
  ExperienceEntryProps<InterviewExperienceInOverview>
>;

// 面向評分只有公司才有，抽成獨立元件讓 useAspectsData 與 useCompanyName
// 只在公司頁執行
const GenderAspectSnippetBlock: React.FC = () => {
  const companyName = useCompanyName();
  const aspectModels = useAspectsData(companyName, [Aspect.GENDER]);
  if (aspectModels.length === 0) return null;

  return (
    <SnippetBlock title="性別友善" pageName={companyName}>
      {aspectModels.map(aspectModel => (
        <AspectScoreCard
          key={aspectModel.aspect}
          aspect={aspectModel.aspect as Aspect}
        />
      ))}
    </SnippetBlock>
  );
};

type OverviewSectionProps = {
  pageType: PageType;
  pageName: string;
  interviewExperiences: InterviewExperienceInOverview[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperienceInOverview[];
  workExperiencesCount: number;
  salaryWorkTimesCount: number;
  statisticsBox: FetchBox<
    CompanyOverviewStatistics | JobTitleOverviewStatistics | null
  >;
};

const OverviewSection: React.FC<OverviewSectionProps> = ({
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
        pageName={pageName}
        tabType={TabType.TIME_AND_SALARY}
      >
        <BoxRenderer
          box={statisticsBox}
          render={(statistics): React.ReactNode =>
            statistics ? <SummaryBlock {...statistics} /> : null
          }
        />
      </SnippetBlock>
      {pageType === PageType.COMPANY && <GenderAspectSnippetBlock />}
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

export default OverviewSection;
