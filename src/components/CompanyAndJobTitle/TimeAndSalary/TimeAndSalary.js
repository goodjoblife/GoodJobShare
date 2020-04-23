import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { compose } from 'recompose';
import { withPermission } from 'common/permission-context';
import Pagination from 'common/Pagination';
import { Section } from 'common/base';
import { ViewSalaryWorkTimeModule } from 'utils/eventBasedTracking';

import EmptyView from '../EmptyView';
import WorkingHourBlock from './WorkingHourBlock';
import ViewLog from './ViewLog';

const TimeAndSalary = ({
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  pageType,
  pageName,
  tabType,
  page,
  queryParams,

  // from withPermission
  canView,
  permissionFetched,
  fetchPermission,
}) => {
  useEffect(() => {
    fetchPermission();
  }, [fetchPermission]);

  // Send event to Amplitude
  useEffect(() => {
    if (permissionFetched) {
      if (pageType === 'COMPANY') {
        ViewSalaryWorkTimeModule.sendEvent({
          company: pageName,
          page: page,
          nTotalData: salaryWorkTimeStatistics.count,
          hasPermission: canView,
        });
      } else if (pageType === 'JOB_TITLE') {
        ViewSalaryWorkTimeModule.sendEvent({
          jobTitle: pageName,
          page: page,
          nTotalData: salaryWorkTimeStatistics.count,
          hasPermission: canView,
        });
      }
    }
  }, [permissionFetched, pageName, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const pageSize = 10;
  const currentData = salaryWorkTimes.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <Section Tag="main" paddingBottom>
      {(salaryWorkTimes.length > 0 && (
        <React.Fragment>
          <WorkingHourBlock
            data={currentData}
            statistics={salaryWorkTimeStatistics}
            pageType={pageType}
            pageName={pageName}
            hideContent={!canView}
          />
          <Pagination
            totalCount={salaryWorkTimes.length}
            unit={pageSize}
            currentPage={page}
            createPageLinkTo={toPage =>
              qs.stringify(
                { ...queryParams, p: toPage },
                { addQueryPrefix: true },
              )
            }
          />
        </React.Fragment>
      )) || <EmptyView pageName={pageName} tabType={tabType} />}
      <ViewLog
        pageName={pageName}
        page={page}
        contentIds={currentData.map(i => i.id)}
      />
    </Section>
  );
};

TimeAndSalary.propTypes = {
  salaryWorkTimes: PropTypes.array,
  salaryWorkTimeStatistics: PropTypes.shape({
    count: PropTypes.number,
    average_estimated_hourly_wage: PropTypes.number,
    average_week_work_time: PropTypes.number,
  }),
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
  page: PropTypes.number,

  // from withPermission
  canView: PropTypes.bool.isRequired,
  permissionFetched: PropTypes.bool.isRequired,
  fetchPermission: PropTypes.func.isRequired,
};

const hoc = compose(withPermission);

export default hoc(TimeAndSalary);
