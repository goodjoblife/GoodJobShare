import React, { Component, PropTypes } from 'react';
// import { push } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';

import Select from 'common/form/Select';
import WorkingHourBlock from '../common/WorkingHourBlock';

import styles from '../views/view.module.css';

const pathnameMapping = {
  'job-title/:keyword/work-time-dashboard': {
    title: '工時排行榜',
    label: '一週平均總工時（高到低）',
    viewParams: {
      groupSortBy: 'week_work_time',
      order: 'descending',
    },
  },
  'job-title/:keyword/sort/work-time-asc': {
    title: '工時排行榜（由低到高）',
    label: '一週平均總工時（低到高）',
    viewParams: {
      groupSortBy: 'week_work_time',
      order: 'ascending',
    },
  },
  'job-title/:keyword/salary-dashboard': {
    title: '估算時薪排行榜',
    label: '估算時薪（高到低）',
    viewParams: {
      groupSortBy: 'estimated_hourly_wage',
      order: 'descending',
    },
  },
  'job-title/:keyword/sort/salary-asc': {
    title: '估算時薪排行榜（由低到高）',
    label: '估算時薪（低到高）',
    viewParams: {
      groupSortBy: 'estimated_hourly_wage',
      order: 'ascending',
    },
  },
};

const selectOptions = R.pipe(
  R.toPairs,
  R.map(([path, { label }]) => ({ value: path, label }))
);

export default class TimeAndSalaryJobTitle extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    queryJobTitle: PropTypes.func,
    switchPath: PropTypes.func,
  }

  componentDidMount() {
    const { path } = this.props.route;
    const { viewParams: { sortBy, order } } = pathnameMapping[path];
    const jobTitle = this.props.params.keyword;
    this.props.queryJobTitle({ sortBy, order, jobTitle });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route.path !== nextProps.route.path || this.props.params.keyword !== nextProps.params.keyword) {
      const { path } = nextProps.route;
      const { viewParams: { sortBy, order } } = pathnameMapping[path];
      const jobTitle = nextProps.params.keyword;
      this.props.queryJobTitle({ sortBy, order, jobTitle });
    }
  }

  render() {
    const { route: { path }, switchPath } = this.props;
    const { title, viewParams: { groupSortBy } } = pathnameMapping[path];
    const jobTitle = this.props.params.keyword;
    const raw = this.props.data.toJS();

    const substituteKeyword =
      R.invoker(2, 'replace')(/:keyword/, jobTitle);

    return (
      <section className={styles.searchResult}>
        <h2 className={styles.heading}>“{jobTitle}” 的 {title}</h2>
        <div className={styles.result}>
          <div className={styles.sort}>
            <div className={styles.label}> 排序：</div>
            <div className={styles.select}>
              <Select
                options={selectOptions(pathnameMapping)}
                value={path}
                onChange={e => switchPath(substituteKeyword(e.target.value, jobTitle))}
              />
            </div>
          </div>
        </div>
        {raw.map((o, i) => (
          <WorkingHourBlock key={o.company.id || i} data={o} groupSortBy={groupSortBy} />
        ))}
      </section>
    );
  }
}
