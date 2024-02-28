import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { compose } from 'recompose';
import { withPermission } from 'common/permission-context';
import Pagination from 'common/Pagination';
import { Section } from 'common/base';

import EmptyView from '../EmptyView';
import WorkingHourBlock from './WorkingHourBlock';
import ViewLog from './ViewLog';
import OvertimeSection from './OvertimeSection';
import useSearchbar from '../useSearchbar';

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

  const { Searchbar, matchesFilter } = useSearchbar({
    pageType,
    tabType,
  });

  const pageSize = 10;
  salaryWorkTimes = useMemo(() => salaryWorkTimes.filter(matchesFilter), [
    matchesFilter,
    salaryWorkTimes,
  ]);
  const currentData = salaryWorkTimes.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <Section Tag="main" paddingBottom>
      {(salaryWorkTimes.length > 0 && (
        <React.Fragment>
          <OvertimeSection statistics={salaryWorkTimeStatistics} />
          <Searchbar />
          <WorkingHourBlock
            data={currentData}
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
