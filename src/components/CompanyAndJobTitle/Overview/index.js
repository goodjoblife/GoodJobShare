import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import EmptyView from '../EmptyView';
import OverviewSection from './Overview';
import Helmet from './Helmet';
import NotFoundStatus from 'common/routing/NotFound';

const Overview = ({ pageType, pageName, tabType, overviewBox, canView }) => (
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
              canView={canView}
            />
          </Fragment>
        );
      }}
    ></StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

Overview.propTypes = {
  canView: PropTypes.bool.isRequired,
  overviewBox: PropTypes.shape({
    data: PropTypes.shape({
      averageWeekWorkTime: PropTypes.number.isRequired,
      interviewExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
      interviewExperiencesCount: PropTypes.number.isRequired,
      jobAverageSalaries: PropTypes.array,
      overtimeFrequencyCount: PropTypes.object.isRequired,
      salaryDistribution: PropTypes.array,
      salaryWorkTimes: PropTypes.arrayOf(PropTypes.object).isRequired,
      salaryWorkTimesCount: PropTypes.number.isRequired,
      workExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
      workExperiencesCount: PropTypes.number.isRequired,
    }),
    error: PropTypes.any,
    status: PropTypes.string.isRequired,
  }).isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default Overview;
