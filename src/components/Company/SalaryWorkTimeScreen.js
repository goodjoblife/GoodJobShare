import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import qs from 'qs';
import { compose, setStatic } from 'recompose';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import Pagination from 'common/Pagination';
import {
  querySelector,
  pathnameSelector,
  paramsSelector,
} from 'common/routing/selectors';
import { queryCompany } from '../../actions/timeAndSalaryCompany';
import { isFetching, isFetched } from '../../constants/status';
import WorkingHourBlock from './WorkingHourBlock';
import renderHelmet from './helmet';
import ViewLog from '../../containers/Company/ViewLog';
import withRouteParameter from './withRouteParameter';
import styles from './SalaryWorkTimeScreen.module.css';

const companyNameSelector = R.compose(
  decodeURIComponent,
  params => params.companyName,
  paramsSelector,
);

class SalaryWorkTimeScreen extends Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    status: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
    }),
    queryCompany: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchPermission: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const companyName = this.props.companyName;
    this.props.queryCompany({ companyName });
    this.props.fetchPermission();
  }

  componentDidUpdate(prevProps) {
    const prevCompanyName = prevProps.companyName;
    const companyName = this.props.companyName;

    if (prevCompanyName !== companyName) {
      this.props.queryCompany({ companyName });
      this.props.fetchPermission();
    }
  }

  render() {
    const {
      data,
      status,
      canViewTimeAndSalary,
      companyName,
      page,
    } = this.props;
    const pathname = pathnameSelector(this.props);
    const pageSize = 10;

    const title = `${companyName}薪水`;
    const statistics = data
      ? data.get('salary_work_time_statistics').toJS()
      : null;
    const dataNum = R.propOr(0, 'count', statistics);
    const avgWeekWorkTime = R.propOr(0, 'average_week_work_time', statistics);
    const avgHourWage = R.propOr(
      0,
      'average_estimated_hourly_wage',
      statistics,
    );

    const currentSalaryWorkTimes = data
      ? data
          .get('salary_work_times')
          .slice((page - 1) * pageSize, page * pageSize)
          .toJS()
      : [];

    const queryParams = querySelector(this.props);

    return (
      <section className={styles.searchResult}>
        {renderHelmet({
          title,
          pathname,
          page,
          companyName,
          dataNum,
          avgWeekWorkTime: Math.round(avgWeekWorkTime),
          avgHourWage: Math.round(avgHourWage),
        })}
        <h2 className={styles.heading}>{title}</h2>
        {isFetching(status) && <Loading size="s" />}
        {isFetched(status) &&
          ((data && (
            <React.Fragment>
              <WorkingHourBlock
                data={data
                  // pagination over time_and_salary
                  .update('salary_work_times', list =>
                    list.slice((page - 1) * pageSize, page * pageSize),
                  )
                  .toJS()}
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
              {companyName}
              」的薪時資訊
            </P>
          ))}
        {isFetched(status) && (
          <ViewLog
            companyName={companyName}
            page={page}
            salaryWorkTimes={currentSalaryWorkTimes}
          />
        )}
        <FanPageBlock className={styles.fanPageBlock} />
      </section>
    );
  }
}

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const companyName = companyNameSelector(props);

  return dispatch(queryCompany({ companyName }));
});

const hoc = compose(
  ssr,
  withPermission,
  withRouteParameter,
);

export default hoc(SalaryWorkTimeScreen);
