import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Pagination from 'common/Pagination';
import { Section } from 'common/base';
import NotFoundStatus from 'common/routing/NotFound';
import usePermission from 'hooks/usePermission';
import EmptyView from '../EmptyView';
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
  onCloseReport,
}) => {
  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [fetchPermission]);

  const queryParams = useQuery();

  const [sectionY, setSectionY] = useState(null);
  const handleSectionRef = useCallback(el => {
    if (el) {
      const rect = el.getBoundingClientRect();
      const sectionY = rect.top + window.scrollY;
      setSectionY(sectionY);
    }
  }, []);

  const createPageLinkTo = useCallback(
    page => {
      const search = qs.stringify(
        { ...queryParams, p: page },
        { addQueryPrefix: true },
      );
      return {
        search,
        state: { y: sectionY - 50 /* nav height */ },
      };
    },
    [sectionY, queryParams],
  );

  return (
    <Section ref={handleSectionRef} Tag="main" paddingBottom>
      {(salaryWorkTimes.length > 0 && (
        <React.Fragment>
          <WorkingHourBlock
            data={salaryWorkTimes}
            pageType={pageType}
            onCloseReport={onCloseReport}
          />
          <Pagination
            totalCount={totalCount}
            unit={pageSize}
            currentPage={page}
            createPageLinkTo={createPageLinkTo}
          />
        </React.Fragment>
      )) || (
        <NotFoundStatus>
          <EmptyView pageName={pageName} tabType={tabType} />
        </NotFoundStatus>
      )}
      <ViewLog
        pageName={pageName}
        page={page}
        contentIds={salaryWorkTimes.map(i => i.id)}
      />
    </Section>
  );
};

TimeAndSalary.propTypes = {
  onCloseReport: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageName: PropTypes.string,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string,
  salaryWorkTimes: PropTypes.array,
  tabType: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
};

export default TimeAndSalary;
