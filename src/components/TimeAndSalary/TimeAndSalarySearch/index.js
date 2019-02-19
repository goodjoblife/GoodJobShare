import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import { compose, setStatic } from 'recompose';
import qs from 'qs';

import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import WorkingHourBlock from '../common/WorkingHourBlock';
import { queryKeyword } from '../../../actions/timeAndSalarySearch';
import { isFetching, isFetched } from '../../../constants/status';
import renderHelmet from './helmet';

import {
  pathSelector,
  pathnameSelector,
  searchSelector,
} from 'common/routing/selectors';

import styles from '../views/view.module.css';

// TODO: remove these after API is ready
const groupSortBy = 'week_work_time';
const order = 'descending';

const pathParameterSelector = R.compose(
  query => qs.parse(query, { ignoreQueryPrefix: true }),
  searchSelector,
);

const keywordSelector = R.compose(
  params => params.q,
  pathParameterSelector,
);

const searchCriteriaSelector = R.compose(
  params => params.s_by,
  pathParameterSelector,
);

const searchCriteriaText = searchBy =>
  searchBy === 'company' ? '公司' : searchBy === 'job_title' ? '職稱' : '??';

class TimeAndSalarySearch extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    status: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
    }),
    queryKeyword: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchPermission: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const searchBy = searchCriteriaSelector(this.props);
    const keyword = keywordSelector(this.props);
    this.props.queryKeyword({ groupSortBy, order, searchBy, keyword });
    this.props.fetchPermission();
  }

  componentDidUpdate(prevProps) {
    if (
      pathSelector(prevProps) !== pathSelector(this.props) ||
      searchCriteriaSelector(prevProps) !==
        searchCriteriaSelector(this.props) ||
      keywordSelector(prevProps) !== keywordSelector(this.props)
    ) {
      const searchBy = searchCriteriaSelector(this.props);
      const keyword = keywordSelector(this.props);
      this.props.queryKeyword({ groupSortBy, order, searchBy, keyword });
      this.props.fetchPermission();
    }
  }

  render() {
    const { status, canViewTimeAndSalary } = this.props;
    const pathname = pathnameSelector(this.props);

    const keyword = keywordSelector(this.props);
    const title = `查詢「${keyword}」的結果`;

    const raw = this.props.data.toJS();

    return (
      <section className={styles.searchResult}>
        {renderHelmet({ title, pathname, keyword })}
        <h2 className={styles.heading}>{title}</h2>
        {isFetching(status) && <Loading size="s" />}
        {isFetched(status) &&
          raw.length === 0 && (
            <P size="l" bold className={styles.searchNoResult}>
              尚未有
              {searchCriteriaText(searchCriteriaSelector(this.props))}「
              {keyword}
              」的薪時資訊
            </P>
          )}
        {raw.map((o, i) => (
          <WorkingHourBlock
            key={o.company.id || i}
            data={o}
            groupSortBy={groupSortBy}
            isExpanded={i === 0 && raw.length === 1}
            hideContent={!canViewTimeAndSalary}
          />
        ))}
        <FanPageBlock className={styles.fanPageBlock} />
      </section>
    );
  }
}

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const searchBy = searchCriteriaSelector(props);
  const keyword = keywordSelector(props);

  return dispatch(queryKeyword({ groupSortBy, order, searchBy, keyword }));
});

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(TimeAndSalarySearch);
