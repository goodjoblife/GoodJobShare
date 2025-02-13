import React from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import TimeAndSalarySection from './TimeAndSalary';
import Helmet from './Helmet';
import OvertimeSection from './OvertimeSection';
import Searchbar from '../Searchbar';
import EmptyView from '../EmptyView';
import NotFoundStatus from 'common/routing/NotFound';

const TimeAndSalary = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  salaryWorkTimeStatistics,
  page,
  pageSize,
  topNJobTitles,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={({ salaryWorkTimes, salaryWorkTimesCount: totalCount }) => {
        if (salaryWorkTimes.length === 0) {
          return (
            <NotFoundStatus>
              <EmptyView pageName={pageName} tabType={tabType} />
            </NotFoundStatus>
          );
        }

        return (
          <>
            <OvertimeSection statistics={salaryWorkTimeStatistics} />
            <Searchbar pageType={pageType} tabType={tabType} />
            <Helmet
              pageType={pageType}
              pageName={pageName}
              totalCount={totalCount}
              page={page}
              topNJobTitles={topNJobTitles}
            />
            <TimeAndSalarySection
              pageType={pageType}
              pageName={pageName}
              tabType={tabType}
              salaryWorkTimes={salaryWorkTimes}
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
            />
          </>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

TimeAndSalary.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  salaryWorkTimeStatistics: PropTypes.object.isRequired,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TimeAndSalary;
