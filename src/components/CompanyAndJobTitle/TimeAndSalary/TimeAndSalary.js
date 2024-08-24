import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Pagination from 'common/Pagination';
import { Section } from 'common/base';
import usePermission from 'hooks/usePermission';

import EmptyView from '../EmptyView';
import WorkingHourBlock from './WorkingHourBlock';
import ViewLog from './ViewLog';
import OvertimeSection from './OvertimeSection';
import useSearchbar from '../useSearchbar';
import { useQuery } from 'hooks/routing';

const TimeAndSalary = ({
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  pageType,
  pageName,
  tabType,
  page,
  pageSize,
  totalCount,
}) => {
  const [, fetchPermission, canView] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [fetchPermission]);

  const Searchbar = useSearchbar({
    pageType,
    tabType,
  });

  const queryParams = useQuery();

  return (
    <Section Tag="main" paddingBottom>
      <OvertimeSection statistics={salaryWorkTimeStatistics} />
      <Searchbar />
      {(salaryWorkTimes.length > 0 && (
        <React.Fragment>
          <WorkingHourBlock
            data={salaryWorkTimes}
            pageType={pageType}
            pageName={pageName}
            hideContent={!canView}
          />
          <Pagination
            totalCount={totalCount}
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
        contentIds={salaryWorkTimes.map(i => i.id)}
      />
    </Section>
  );
};

TimeAndSalary.propTypes = {
  page: PropTypes.number,
  pageName: PropTypes.string,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string,
  salaryWorkTimeStatistics: PropTypes.shape({
    average_estimated_hourly_wage: PropTypes.number,
    average_week_work_time: PropTypes.number,
    count: PropTypes.number,
  }),
  salaryWorkTimes: PropTypes.array,
  tabType: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
};

export default TimeAndSalary;
