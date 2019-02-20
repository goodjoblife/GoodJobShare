import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose, setStatic } from 'recompose';
import R from 'ramda';

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
  searchCriteriaSelector,
  searchKeywordSelector,
} from 'common/routing/selectors';

import styles from '../views/view.module.css';
import { searchOptions } from '../SearchBar';

// TODO: remove these after API is ready
const groupSortBy = 'week_work_time';
const order = 'descending';

const searchCriteriaText = searchBy =>
  R.compose(
    R.prop('label'),
    R.head,
    R.filter(R.propEq('value', searchBy)),
  )(searchOptions);

const castValidSearchCriteria = R.when(
  searchBy => !searchOptions.some(R.propEq('value', searchBy)),
  R.always(R.head(searchOptions).value),
);

const castValidSearchKeyword = R.when(
  keyword => typeof keyword !== 'string',
  R.always(''),
);

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
    const searchBy = castValidSearchCriteria(
      searchCriteriaSelector(this.props),
    );
    const keyword = castValidSearchKeyword(searchKeywordSelector(this.props));
    this.props.queryKeyword({ groupSortBy, order, searchBy, keyword });
    this.props.fetchPermission();
  }

  componentDidUpdate(prevProps) {
    if (
      pathSelector(prevProps) !== pathSelector(this.props) ||
      searchCriteriaSelector(prevProps) !==
        searchCriteriaSelector(this.props) ||
      searchKeywordSelector(prevProps) !== searchKeywordSelector(this.props)
    ) {
      const searchBy = castValidSearchCriteria(
        searchCriteriaSelector(this.props),
      );
      const keyword = castValidSearchKeyword(searchKeywordSelector(this.props));
      this.props.queryKeyword({ groupSortBy, order, searchBy, keyword });
      this.props.fetchPermission();
    }
  }

  render() {
    const { status, canViewTimeAndSalary } = this.props;
    const pathname = pathnameSelector(this.props);

    const keyword = castValidSearchKeyword(searchKeywordSelector(this.props));
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
              {searchCriteriaText(
                castValidSearchCriteria(searchCriteriaSelector(this.props)),
              )}
              「{keyword}
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
  const searchBy = castValidSearchCriteria(searchCriteriaSelector(props));
  const keyword = castValidSearchKeyword(searchKeywordSelector(props));

  return dispatch(queryKeyword({ groupSortBy, order, searchBy, keyword }));
});

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(TimeAndSalarySearch);
