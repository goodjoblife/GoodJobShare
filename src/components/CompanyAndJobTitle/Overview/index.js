import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import EmptyView from '../EmptyView';
import OverviewSection from './Overview';
import Helmet from './Helmet';
import NotFoundStatus from 'common/routing/NotFound';

const Overview = ({
  pageType,
  pageName,
  tabType,
  overviewBox,
  page,
  canView,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <StatusRenderer
      status={overviewBox.status}
      render={() => {
        const data = overviewBox.data;

        if (data == null) {
          return (
            <NotFoundStatus status={404}>
              <EmptyView pageName={pageName} />
            </NotFoundStatus>
          );
        }

        return (
          <Fragment>
            <Helmet
              pageType={pageType}
              pageName={pageName}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
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
              salaryDistribution={data.salaryDistribution}
              jobAverageSalaries={data.jobAverageSalaries}
              averageWeekWorkTime={data.averageWeekWorkTime}
              overtimeFrequencyCount={data.overtimeFrequencyCount}
              page={page}
              canView={canView}
            />
          </Fragment>
        );
      }}
    ></StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

Overview.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  overviewBox: PropTypes.shape({
    status: PropTypes.string.isRequired,
    data: PropTypes.shape({
      interviewExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
      interviewExperiencesCount: PropTypes.number.isRequired,
      workExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
      workExperiencesCount: PropTypes.number.isRequired,
      salaryWorkTimes: PropTypes.arrayOf(PropTypes.object).isRequired,
      salaryWorkTimesCount: PropTypes.number.isRequired,
      salaryDistribution: PropTypes.array,
      jobAverageSalaries: PropTypes.array,
      averageWeekWorkTime: PropTypes.number.isRequired,
      overtimeFrequencyCount: PropTypes.object.isRequired,
    }),
    error: PropTypes.any,
  }).isRequired,
  page: PropTypes.number.isRequired,
  canView: PropTypes.bool.isRequired,
};

export default Overview;
