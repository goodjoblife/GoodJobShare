import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { Section } from 'common/base';
import Pagination from 'common/Pagination';
import NotFoundStatus from 'common/routing/NotFound';
import usePermission from 'hooks/usePermission';

import EmptyView from '../EmptyView';
import ViewLog from './ViewLog';
import WorkingHourBlock from './WorkingHourBlock';

const SalaryWorkTimeSection = ({
  salaryWorkTimes,
  pageType,
  pageName,
  tabType,
  page,
  pageSize,
  totalCount,
  onCloseReport,
  createPageLinkTo,
}) => {
  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [fetchPermission]);

  return (
    <Section Tag="main" paddingBottom>
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

SalaryWorkTimeSection.propTypes = {
  createPageLinkTo: PropTypes.func.isRequired,
  onCloseReport: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageName: PropTypes.string,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string,
  salaryWorkTimes: PropTypes.array,
  tabType: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
};

export default SalaryWorkTimeSection;
