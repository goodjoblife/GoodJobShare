import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { compose } from 'recompose';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import Pagination from 'common/Pagination';
import { isNil } from 'ramda';

import EmptyView from '../EmptyView';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import {
  isFetched,
  isUnfetched,
  isFetching,
  isError,
} from '../../../constants/status';
import { pageTypeTranslation } from '../../../constants/companyJobTitle';
import WorkingHourBlock from './WorkingHourBlock';
import renderHelmet from './timeAndSalaryHelmet';
import ViewLog from './ViewLog';
import styles from './TimeAndSalary.module.css';

const shouldEmptyView = ({ salaryWorkTimes, status }) =>
  isError(status) ||
  (isFetched(status) &&
    (isNil(salaryWorkTimes) || salaryWorkTimes.length === 0));

class TimeAndSalary extends Component {
  static propTypes = {
    salaryWorkTimes: PropTypes.array,
    salaryWorkTimeStatistics: PropTypes.shape({
      count: PropTypes.number,
      average_estimated_hourly_wage: PropTypes.number,
      average_week_work_time: PropTypes.number,
    }),
    status: PropTypes.string,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
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
      status,
      canViewTimeAndSalary,
      page,
      pathname,
      queryParams,
      pageType,
      pageName,
      tabType,
    } = this.props;
    if (shouldEmptyView({ salaryWorkTimes, status })) {
      return (
        <CompanyAndJobTitleWrapper
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
        >
          <EmptyView tabType={tabType} pageName={pageName} />
        </CompanyAndJobTitleWrapper>
      );
    }

    if (isUnfetched(status) || isFetching(status)) {
      return (
        <CompanyAndJobTitleWrapper
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
        >
          <Loading size="s" />
        </CompanyAndJobTitleWrapper>
      );
    }

    const pageSize = 10;
    const title = `${pageName}薪水`;

    const {
      count: dataNum,
      average_estimated_hourly_wage: avgHourWage,
      average_week_work_time: avgWeekWorkTime,
    } = salaryWorkTimeStatistics;

    const currentData = salaryWorkTimes.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return (
      <CompanyAndJobTitleWrapper
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
      >
        <section className={styles.searchResult}>
          {renderHelmet({
            title,
            pathname,
            page,
            pageName,
            dataNum,
            avgWeekWorkTime: Math.round(avgWeekWorkTime),
            avgHourWage: Math.round(avgHourWage),
          })}
          {(salaryWorkTimes.length > 0 && (
            <React.Fragment>
              <WorkingHourBlock
                data={currentData}
                statistics={salaryWorkTimeStatistics}
                pageType={pageType}
                pageName={pageName}
                hideContent={!canViewTimeAndSalary}
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
          )) || (
            <P size="l" bold className={styles.searchNoResult}>
              {`尚未有${pageTypeTranslation[pageType]}「
                {pageName}
                」的薪時資訊`}
            </P>
          )}
          <ViewLog
            pageName={pageName}
            page={page}
            contentIds={currentData.map(i => i.id)}
          />
          <FanPageBlock className={styles.fanPageBlock} />
        </section>
      </CompanyAndJobTitleWrapper>
    );
  }
}

const hoc = compose(withPermission);

export default hoc(TimeAndSalary);
