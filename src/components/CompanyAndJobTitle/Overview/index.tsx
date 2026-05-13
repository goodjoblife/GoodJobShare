import React from 'react';
import { RootState } from 'reducers';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import PageBoxRenderer from '../PageBoxRenderer';
import OverviewSection from './Overview';
import Helmet from './Helmet';
import FetchBox from 'utils/fetchBox';
import { Wrapper } from 'common/base';
import { PageType, TabType } from 'constants/companyJobTitle';
import { CompanyOverview } from 'reducers/companyIndex';
import { JobTitleOverview } from 'reducers/jobTitleIndex';

type OverviewProps = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  boxSelector: (
    state: RootState,
  ) => FetchBox<CompanyOverview | JobTitleOverview | null>;
  statisticsBox: FetchBox<unknown>;
  topNJobTitles?: { name: string }[];
  onCloseReport: () => void;
};

const Overview: React.FC<OverviewProps> = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  statisticsBox,
  topNJobTitles,
  onCloseReport,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Wrapper size="l">
      <PageBoxRenderer
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        boxSelector={boxSelector}
        render={(data): React.ReactNode => (
          <>
            <Helmet
              pageType={pageType}
              pageName={pageName}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
              topNJobTitles={topNJobTitles}
            />
            <OverviewSection
              pageType={pageType}
              pageName={pageName}
              interviewExperiences={data.interviewExperiences}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiences={data.workExperiences}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimes={data.salaryWorkTimes}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
              statisticsBox={statisticsBox}
              onCloseReport={onCloseReport}
            />
          </>
        )}
      />
    </Wrapper>
  </CompanyAndJobTitleWrapper>
);

export default Overview;
