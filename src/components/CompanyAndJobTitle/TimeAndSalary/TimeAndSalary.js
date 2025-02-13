import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Pagination from 'common/Pagination';
import { Section } from 'common/base';
import usePermission from 'hooks/usePermission';

import WorkingHourBlock from './WorkingHourBlock';
import ViewLog from './ViewLog';
import { useQuery } from 'hooks/routing';

const TimeAndSalary = ({
  salaryWorkTimes,
  pageType,
  pageName,
  tabType,
  page,
  pageSize,
  totalCount,
}) => {
  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [fetchPermission]);

  const queryParams = useQuery();

  return (
    <Section Tag="main" paddingBottom>
      <WorkingHourBlock data={salaryWorkTimes} pageType={pageType} />
      <Pagination
        totalCount={totalCount}
        unit={pageSize}
        currentPage={page}
        createPageLinkTo={toPage =>
          qs.stringify({ ...queryParams, p: toPage }, { addQueryPrefix: true })
        }
      />
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
  salaryWorkTimes: PropTypes.array,
  tabType: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
};

export default TimeAndSalary;
