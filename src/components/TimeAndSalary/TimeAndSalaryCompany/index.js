import React, { Component, PropTypes } from 'react';
// import { push } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';

import Select from 'common/form/Select';
import Loading from 'common/Loader';
import WorkingHourBlock from '../common/WorkingHourBlock';
import { queryCompany } from '../../../actions/timeAndSalaryCompany';
import fetchingStatus from '../../../constants/status';

import styles from '../views/view.module.css';

const pathnameMapping = {
  'company/:keyword/work-time-dashboard': {
    title: '工時排行榜',
    label: '一週平均總工時（高到低）',
    groupSortBy: 'week_work_time',
    order: 'descending',
  },
  'company/:keyword/sort/work-time-asc': {
    title: '工時排行榜（由低到高）',
    label: '一週平均總工時（低到高）',
    groupSortBy: 'week_work_time',
    order: 'ascending',
  },
  'company/:keyword/salary-dashboard': {
    title: '估算時薪排行榜',
    label: '估算時薪（高到低）',
    groupSortBy: 'estimated_hourly_wage',
    order: 'descending',
  },
  'company/:keyword/sort/salary-asc': {
    title: '估算時薪排行榜（由低到高）',
    label: '估算時薪（低到高）',
    groupSortBy: 'estimated_hourly_wage',
    order: 'ascending',
  },
};

const selectOptions = R.pipe(
  R.toPairs,
  R.map(([path, { label }]) => ({ value: path, label }))
);

export default class TimeAndSalaryCompany extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    status: PropTypes.string,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    queryCompany: PropTypes.func,
    switchPath: PropTypes.func,
  }

  static fetchData({ routes, params, store: { dispatch } }) {
    console.log(routes);
    console.log(params);
    const { path } = R.last(routes);
    const { groupSortBy, order } = pathnameMapping[path];
    const company = params.keyword;

    return dispatch(queryCompany({ groupSortBy, order, company }));
  }

  componentDidMount() {
    const { path } = this.props.route;
    const { groupSortBy, order } = pathnameMapping[path];
    const company = this.props.params.keyword;
    this.props.queryCompany({ groupSortBy, order, company });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route.path !== nextProps.route.path || this.props.params.keyword !== nextProps.params.keyword) {
      const { path } = nextProps.route;
      const { groupSortBy, order } = pathnameMapping[path];
      const company = nextProps.params.keyword;
      this.props.queryCompany({ groupSortBy, order, company });
    }
  }

  render() {
    const { route: { path }, switchPath, status } = this.props;
    const { groupSortBy } = pathnameMapping[path];
    const company = this.props.params.keyword;
    const raw = this.props.data.toJS();

    const substituteKeyword =
      R.invoker(2, 'replace')(/:keyword/, encodeURIComponent(company));

    return (
      <section className={styles.searchResult}>
        <h2 className={styles.heading}>搜尋 “{company}” 的薪時資訊</h2>
        <div className={styles.result}>
          <div className={styles.sort}>
            <div className={styles.label}> 排序：</div>
            <div className={styles.select}>
              <Select
                options={selectOptions(pathnameMapping)}
                value={path}
                onChange={e => switchPath(substituteKeyword(e.target.value))}
                hasNullOption={false}
              />
            </div>
          </div>
        </div>
        { status === fetchingStatus.FETCHING && (<Loading size="s" />) }
        {raw.map((o, i) => (
          <WorkingHourBlock key={o.company.id || i} data={o} groupSortBy={groupSortBy} isExpanded={(i === 0) && (raw.length === 1)} />
        ))}
      </section>
    );
  }
}
