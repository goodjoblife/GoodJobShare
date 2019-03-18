import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose, setStatic } from 'recompose';
import R from 'ramda';
import qs from 'qs';

import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import WorkingHourBlock from './WorkingHourBlock';
import { queryKeyword } from '../../../actions/timeAndSalarySearch';
import { isFetching, isFetched } from '../../../constants/status';
import renderHelmet from './helmet';

import {
  querySelector,
  pathSelector,
  pathnameSelector,
} from 'common/routing/selectors';
import {
  searchCriteriaSelector,
  searchKeywordSelector,
  pageSelector,
} from '../common/selectors';
import {
  validatePage,
  validateSearchCriteria,
  validateSearchKeyword,
} from '../common/validators';

import styles from '../views/view.module.css';
import { searchOptions } from '../SearchBar';
import Pagination from '../../common/Pagination/Pagination';

const firstDataNameSelector = props => props.data.get(0).get('name');

const searchCriteriaText = searchBy =>
  R.compose(
    R.prop('label'),
    R.head,
    R.filter(R.propEq('value', searchBy)),
  )(searchOptions);

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
  };

  componentDidMount() {
    const searchBy = validateSearchCriteria(searchCriteriaSelector(this.props));
    const keyword = validateSearchKeyword(searchKeywordSelector(this.props));
    this.props
      .queryKeyword({ searchBy, keyword })
      .then(() => this.redirectOnSingleResult());
  }

  componentDidUpdate(prevProps) {
    if (
      pathSelector(prevProps) !== pathSelector(this.props) ||
      searchCriteriaSelector(prevProps) !==
        searchCriteriaSelector(this.props) ||
      searchKeywordSelector(prevProps) !== searchKeywordSelector(this.props)
    ) {
      const searchBy = validateSearchCriteria(
        searchCriteriaSelector(this.props),
      );
      const keyword = validateSearchKeyword(searchKeywordSelector(this.props));
      this.props
        .queryKeyword({ searchBy, keyword })
        .then(() => this.redirectOnSingleResult());
    }
  }

  redirectOnSingleResult() {
    if (this.props.data.size === 1) {
      const searchBy = this.props.searchBy;
      if (searchBy === 'company') {
        const companyName = firstDataNameSelector(this.props);
        this.props.history.replace(
          `/companies/${companyName}/salary-work-times${
            this.props.location.search
          }`,
        );
      } else if (searchBy === 'job_title') {
        const jobTitle = firstDataNameSelector(this.props);
        this.props.history.replace(
          `/job-titles/${jobTitle}/salary-work-times${
            this.props.location.search
          }`,
        );
      }
    }
  }

  render() {
    const { status, history } = this.props;
    const pathname = pathnameSelector(this.props);
    const page = validatePage(pageSelector(this.props));
    const pageSize = 10;
    const totalNum = this.props.data.size;

    const searchBy = searchCriteriaSelector(this.props);
    const keyword = validateSearchKeyword(searchKeywordSelector(this.props));
    const title = keyword ? `查詢「${keyword}」的結果` : '請輸入搜尋條件！';

    const queryParams = querySelector(this.props);

    const raw = this.props.data
      .slice((page - 1) * pageSize, page * pageSize)
      .toJS();

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
                validateSearchCriteria(searchCriteriaSelector(this.props)),
              )}
              「{keyword}
              」的薪時資訊
            </P>
          )}
        {raw.map((o, i) => (
          <WorkingHourBlock
            key={i}
            data={o}
            onClickHeader={() => {
              if (searchBy === 'company') {
                history.push(
                  `/companies/${o.name}/salary-work-times${
                    this.props.location.search
                  }`,
                );
              } else if (searchBy === 'job_title') {
                history.push(
                  `/job-titles/${o.name}/salary-work-times${
                    this.props.location.search
                  }`,
                );
              }
            }}
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
  const searchBy = validateSearchCriteria(searchCriteriaSelector(props));
  const keyword = validateSearchKeyword(searchKeywordSelector(props));

  return dispatch(queryKeyword({ searchBy, keyword }));
});

const hoc = compose(ssr);

export default hoc(TimeAndSalarySearch);
