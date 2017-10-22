import React, { Component, PropTypes } from 'react';
// import { push } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import WorkingHourBlock from '../common/WorkingHourBlock';
// import Select from 'common/form/Select';

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

export default class TimeAndSalaryJobTitle extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    queryJobTitle: PropTypes.func,
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
    const { path } = this.props.route;
    const { title, viewParams: { groupSortBy } } = pathnameMapping[path];
    const jobTitle = this.props.params.keyword;
    const raw = this.props.data.toJS();
    return (
      <section className={styles.searchResult}>
        <h2 className={styles.heading}>“{jobTitle}” 的 {title}</h2>
        <div className={styles.result}>
          <div className={styles.sort}>
            <div className={styles.label}> 排序：</div>
            <div className={styles.select}>
              { /* <Select
                options={pathOptions.map(({ path: value, label }) => ({ value, label }))}
                value={path}
                onChange={e => push(`/time-and-salary/${e.target.value.replace(':keyword', encodeURIComponent(keyword))}`)}
              />*/ }
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
