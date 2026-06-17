import React from 'react';

import { Wrapper } from 'common/base';
import { PageType, TabType } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import { CompanyOverview } from 'reducers/companyIndex';
import { JobTitleOverview } from 'reducers/jobTitleIndex';
import FetchBox from 'utils/fetchBox';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import PageBoxRenderer from '../PageBoxRenderer';
import { CompanyOverviewHelmet, JobTitleOverviewHelmet } from './Helmet';
import OverviewSection from './OverviewSection';

type OverviewProps = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  boxSelector: (
    state: RootState,
  ) => FetchBox<CompanyOverview | JobTitleOverview | null>;
  statisticsBox: FetchBox<unknown>;
};

const Overview: React.FC<OverviewProps> = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  statisticsBox,
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
            {pageType === PageType.COMPANY ? (
              <CompanyOverviewHelmet
                companyName={pageName}
                interviewExperiencesCount={data.interviewExperiencesCount}
                workExperiencesCount={data.workExperiencesCount}
                salaryWorkTimesCount={data.salaryWorkTimesCount}
              />
            ) : pageType === PageType.JOB_TITLE ? (
              <JobTitleOverviewHelmet
                jobTitle={pageName}
                interviewExperiencesCount={data.interviewExperiencesCount}
                workExperiencesCount={data.workExperiencesCount}
                salaryWorkTimesCount={data.salaryWorkTimesCount}
              />
            ) : null}
            <OverviewSection
              pageType={pageType}
              pageName={pageName}
              interviewExperiences={data.interviewExperiences}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiences={data.workExperiences}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
              statisticsBox={statisticsBox}
            />
          </>
        )}
      />
    </Wrapper>
  </CompanyAndJobTitleWrapper>
);

export default Overview;
