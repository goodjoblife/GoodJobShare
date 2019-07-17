import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { compose } from 'recompose';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import Pagination from 'common/Pagination';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { isFetching, isFetched } from '../../../constants/status';
import WorkingHourBlock from './WorkingHourBlock';
import renderHelmet from './timeAndSalaryHelmet';
import ViewLog from './ViewLog';
import styles from './TimeAndSalary.module.css';

class TimeAndSalary extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    statistics: PropTypes.shape({
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
      data,
      status,
      canViewTimeAndSalary,
      page,
      pathname,
      queryParams,
      statistics: {
        count: dataNum,
        average_estimated_hourly_wage: avgHourWage,
        average_week_work_time: avgWeekWorkTime,
      },
      pageType,
      pageName,
      tabType,
    } = this.props;
    const pageSize = 10;

    const title = `${pageName}薪水`;

    const currentData = data.slice((page - 1) * pageSize, page * pageSize);

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
          <h2 className={styles.heading}>{title}</h2>
          {isFetching(status) && <Loading size="s" />}
          {isFetched(status) &&
            ((data.length > 0 && (
              <React.Fragment>
                <WorkingHourBlock
                  data={currentData}
                  hideContent={!canViewTimeAndSalary}
                />
                <Pagination
                  totalCount={data.get('salary_work_times').size}
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
                尚未有公司「
                {pageName}
                」的薪時資訊
              </P>
            ))}
          {isFetched(status) && (
            <ViewLog
              pageName={pageName}
              page={page}
              contentIds={currentData.map(i => i.id)}
            />
          )}
          <FanPageBlock className={styles.fanPageBlock} />
        </section>
      </CompanyAndJobTitleWrapper>
    );
  }
}

const hoc = compose(withPermission);

export default hoc(TimeAndSalary);
