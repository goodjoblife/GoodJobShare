import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose, setStatic } from 'recompose';
import R from 'ramda';
import qs from 'qs';

import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import WorkingHourBlock from './WorkingHourBlock';
import { queryKeyword } from '../../../actions/timeAndSalarySearch';
import { isFetching, isFetched } from '../../../constants/status';
import renderHelmet from './helmet';

import {
  querySelector,
  pathSelector,
  pathnameSelector,
  searchCriteriaSelector,
  searchKeywordSelector,
  pageSelector,
} from 'common/routing/selectors';

import styles from '../views/view.module.css';
import { searchOptions } from '../SearchBar';
import Pagination from '../../common/Pagination/Pagination';

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

const castValidPage = R.compose(
  R.when(Number.isNaN, R.always(1)),
  p => parseInt(p, 10),
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
    fetchPermission: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const searchBy = castValidSearchCriteria(
      searchCriteriaSelector(this.props),
    );
    const keyword = castValidSearchKeyword(searchKeywordSelector(this.props));
    const page = castValidPage(pageSelector(this.props));
    const pageSize = this.props.pageSize;
    this.props
      .queryKeyword({ groupSortBy, order, searchBy, keyword, page, pageSize })
      .then(() => this.redirectOnSingleResult());
    this.props.fetchPermission();
  }

  componentDidUpdate(prevProps) {
    if (
      pageSelector(prevProps) !== pageSelector(this.props) ||
      pathSelector(prevProps) !== pathSelector(this.props) ||
      searchCriteriaSelector(prevProps) !==
        searchCriteriaSelector(this.props) ||
      searchKeywordSelector(prevProps) !== searchKeywordSelector(this.props)
    ) {
      const searchBy = castValidSearchCriteria(
        searchCriteriaSelector(this.props),
      );
      const keyword = castValidSearchKeyword(searchKeywordSelector(this.props));
      const page = castValidPage(pageSelector(this.props));
      const pageSize = this.props.pageSize;
      this.props
        .queryKeyword({ groupSortBy, order, searchBy, keyword, page, pageSize })
        .then(() => this.redirectOnSingleResult());
      this.props.fetchPermission();
    }
  }

  redirectOnSingleResult() {
    if (this.props.data.size === 1) {
      const searchBy = this.props.searchBy;
      if (searchBy === 'company') {
        const companyName = this.props.data.get(0).getIn(['company', 'name']);
        this.props.history.replace(
          `/companies/${companyName}/salary-work-times${
            this.props.location.search
          }`,
        );
      } else if (searchBy === 'job_title') {
        const jobTitle = this.props.data.get(0).getIn(['company', 'name']);
        this.props.history.replace(
          `/job-titles/${jobTitle}/salary-work-times${
            this.props.location.search
          }`,
        );
      }
    }
  }

  render() {
    const { status, history, page, pageSize, totalNum } = this.props;
    const pathname = pathnameSelector(this.props);

    const searchBy = searchCriteriaSelector(this.props);
    const keyword = castValidSearchKeyword(searchKeywordSelector(this.props));
    const title = keyword ? `查詢「${keyword}」的結果` : '請輸入搜尋條件！';

    const queryParams = querySelector(this.props);

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
            onClickHeader={() => {
              if (searchBy === 'company') {
                history.push(
                  `/companies/${o.company.name}/salary-work-times${
                    this.props.location.search
                  }`,
                );
              } else if (searchBy === 'job_title') {
                history.push(
                  `/job-titles/${
                    o.time_and_salary[0].job_title
                  }/salary-work-times${this.props.location.search}`,
                );
              }
            }}
            groupSortBy={groupSortBy}
          />
        ))}
        <Pagination
          totalCount={totalNum}
          unit={pageSize}
          currentPage={page}
          createPageLinkTo={toPage =>
            qs.stringify(
              { ...queryParams, p: toPage },
              { addQueryPrefix: true },
            )
          }
        />
        <FanPageBlock className={styles.fanPageBlock} />
      </section>
    );
  }
}

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const searchBy = castValidSearchCriteria(searchCriteriaSelector(props));
  const keyword = castValidSearchKeyword(searchKeywordSelector(props));
  const page = castValidPage(pageSelector(props));
  const pageSize = props.pageSize;

  return dispatch(
    queryKeyword({ groupSortBy, order, searchBy, keyword, page, pageSize }),
  );
});

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(TimeAndSalarySearch);
