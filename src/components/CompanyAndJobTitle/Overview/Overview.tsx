import React from 'react';

import { Wrapper } from 'common/base';
import { PageType } from 'constants/companyJobTitle';
import {
  CompanyOverview,
  CompanyOverviewStatistics,
} from 'reducers/companyIndex';
import {
  JobTitleOverview,
  JobTitleOverviewStatistics,
} from 'reducers/jobTitleIndex';
import FetchBox from 'utils/fetchBox';

import PageBoxRenderer from '../PageBoxRenderer';
import { usePageContext } from '../PageContextProvider';
import { CompanyOverviewHelmet, JobTitleOverviewHelmet } from './Helmet';
import OverviewSection from './OverviewSection';

type OverviewProps = {
  box: FetchBox<CompanyOverview | JobTitleOverview | null>;
  statisticsBox: FetchBox<
    CompanyOverviewStatistics | JobTitleOverviewStatistics | null
  >;
};

const Overview: React.FC<OverviewProps> = ({ box, statisticsBox }) => {
  const { pageType, pageName, tabType } = usePageContext();

  return (
    <Wrapper size="l">
      <PageBoxRenderer
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        box={box}
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
  );
};

export default Overview;
