import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { push } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';

import Select from 'common/form/Select';
import Loading from 'common/Loader';
import { P } from 'common/base';
import WorkingHourBlock from '../common/WorkingHourBlock';
import { queryCompany } from '../../../actions/timeAndSalaryCompany';
import { isFetching, isFetched } from '../../../constants/status';

import styles from '../views/view.module.css';

const pathnameMapping = {
  '/time-and-salary/company/:keyword/work-time-dashboard': {
    title: '工時排行榜',
    label: '一週平均總工時（高到低）',
    groupSortBy: 'week_work_time',
    order: 'descending',
  },
  '/time-and-salary/company/:keyword/sort/work-time-asc': {
    title: '工時排行榜（由低到高）',
    label: '一週平均總工時（低到高）',
    groupSortBy: 'week_work_time',
    order: 'ascending',
  },
  '/time-and-salary/company/:keyword/salary-dashboard': {
    title: '估算時薪排行榜',
    label: '估算時薪（高到低）',
    groupSortBy: 'estimated_hourly_wage',
    order: 'descending',
  },
  '/time-and-salary/company/:keyword/sort/salary-asc': {
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

const pathSelector = R.path(['match', 'path']);
const keywordSelector = R.path(['match', 'params', 'keyword']);
const pathParameterSelector = R.compose(path => pathnameMapping[path], pathSelector);

export default class TimeAndSalaryCompany extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    status: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
    }),
    queryCompany: PropTypes.func,
    switchPath: PropTypes.func,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchMyPermission: PropTypes.func.isRequired,
  }

  static fetchData({ store: { dispatch }, ...props }) {
    const { groupSortBy, order } = pathParameterSelector(props);
    const company = keywordSelector(props);

    return dispatch(queryCompany({ groupSortBy, order, company }));
  }

  componentDidMount() {
    const { groupSortBy, order } = pathParameterSelector(this.props);
    const company = keywordSelector(this.props);
    this.props.queryCompany({ groupSortBy, order, company });
    this.props.fetchMyPermission();
  }

  componentWillReceiveProps(nextProps) {
    if (pathSelector(this.props) !== pathSelector(nextProps) || keywordSelector(this.props) !== keywordSelector(nextProps)) {
      const { groupSortBy, order } = pathParameterSelector(nextProps);
      const company = keywordSelector(nextProps);
      this.props.queryCompany({ groupSortBy, order, company });
      this.props.fetchMyPermission();
    }
  }

  render() {
    const { switchPath, status, canViewTimeAndSalary } = this.props;
    const path = pathSelector(this.props);
    const { title, groupSortBy } = pathParameterSelector(this.props);
    const company = keywordSelector(this.props);
    const raw = this.props.data.toJS();

    const substituteKeyword =
      R.invoker(2, 'replace')(/:keyword/, encodeURIComponent(company));

    return (
      <section className={styles.searchResult}>
        <h2 className={styles.heading}>搜尋 “{company}” 的 {title}</h2>
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
        { isFetching(status) && (<Loading size="s" />) }
        { isFetched(status) && raw.length === 0 &&
          <P
            size="l"
            bold
            className={styles.searchNoResult}
          >
              尚未有公司「{company}」的薪時資訊
          </P>
        }
        {raw.map((o, i) => (
          <WorkingHourBlock
            key={o.company.id || i}
            data={o}
            groupSortBy={groupSortBy}
            isExpanded={(i === 0) && (raw.length === 1)}
            hideContent={!canViewTimeAndSalary}
          />
        ))}
      </section>
    );
  }
}
