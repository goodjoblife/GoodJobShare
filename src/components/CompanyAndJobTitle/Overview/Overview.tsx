import React from 'react';

import { Wrapper } from 'common/base';
import { PageType } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import { CompanyOverview } from 'reducers/companyIndex';
import { JobTitleOverview } from 'reducers/jobTitleIndex';
import FetchBox from 'utils/fetchBox';

import PageBoxRenderer from '../PageBoxRenderer';
import { usePageContext } from '../PageContextProvider';
import { CompanyOverviewHelmet, JobTitleOverviewHelmet } from './Helmet';
import OverviewSection from './OverviewSection';

type OverviewProps = {
  boxSelector: (
    state: RootState,
  ) => FetchBox<CompanyOverview | JobTitleOverview | null>;
  statisticsBox: FetchBox<unknown>;
};

const Overview: React.FC<OverviewProps> = ({ boxSelector, statisticsBox }) => {
  const { pageType, pageName, tabType } = usePageContext();

  return (
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
  );
};

export default Overview;
