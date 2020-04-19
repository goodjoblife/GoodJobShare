import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { compose } from 'recompose';
import { withPermission } from 'common/permission-context';
import Pagination from 'common/Pagination';
import { Section } from 'common/base';

import EmptyView from '../EmptyView';
import WorkingHourBlock from './WorkingHourBlock';
import ViewLog from './ViewLog';

class TimeAndSalary extends Component {
  static propTypes = {
    salaryWorkTimes: PropTypes.array,
    salaryWorkTimeStatistics: PropTypes.shape({
      count: PropTypes.number,
      average_estimated_hourly_wage: PropTypes.number,
      average_week_work_time: PropTypes.number,
    }),
    canView: PropTypes.bool.isRequired,
    fetchPermission: PropTypes.func.isRequired,
    pageType: PropTypes.string,
    pageName: PropTypes.string,
    tabType: PropTypes.string,
  };

  componentDidMount() {
    this.props.fetchPermission();
  }

  componentDidUpdate(prevProps) {
    const prevCompanyName = prevProps.companyName;
    const companyName = this.props.companyName;

    if (prevCompanyName !== companyName) {
      this.props.fetchPermission();
    }
  }

  render() {
    const {
      salaryWorkTimes,
      salaryWorkTimeStatistics,
      canView,
      page,
      queryParams,
      pageType,
      pageName,
      tabType,
    } = this.props;

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
  }
}

const hoc = compose(withPermission);

export default hoc(TimeAndSalary);
