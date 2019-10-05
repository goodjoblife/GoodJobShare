import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose, setStatic } from 'recompose';
import qs from 'qs';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import {
  querySelector,
  pathSelector,
  pathnameSelector,
  searchSelector,
} from 'common/routing/selectors';
import Pagination from 'common/Pagination';
import {
  queryKeyword,
  keywordMinLength,
} from '../../../actions/timeAndSalarySearch';
import { isFetching, isFetched } from '../../../constants/status';
import {
  searchCriteriaSelector,
  searchKeywordSelector,
  pageSelector,
} from '../common/selectors';
import { validatePage, validateSearchKeyword } from '../common/validators';
import WorkingHourBlock from './WorkingHourBlock';
import renderHelmet from './helmet';
import styles from './SearchScreen.module.css';

const firstDataNameSelector = props => props.data.get(0).get('name');

function getTitle(keyword) {
  if (keyword) {
    if (keyword.length < keywordMinLength) {
      return '請輸入更長的搜尋關鍵字';
    } else {
      return `查詢「${keyword}」的結果`;
    }
  } else {
    return '請輸入搜尋條件！';
  }
}

class SearchScreen extends Component {
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
    const searchBy = 'company'; // TODO
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
      const searchBy = 'company'; // TODO
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
          `/companies/${encodeURIComponent(companyName)}/overview${
            this.props.location.search
          }`,
        );
      } else if (searchBy === 'job_title') {
        const jobTitle = firstDataNameSelector(this.props);
        this.props.history.replace(
          `/job-titles/${encodeURIComponent(jobTitle)}/overview${
            this.props.location.search
          }`,
        );
      }
    }
  }

  getLinkForData(data) {
    const searchBy = searchCriteriaSelector(this.props);
    if (searchBy === 'company') {
      return `/companies/${encodeURIComponent(
        data.name,
      )}/overview${qs.stringify(
        { ...querySelector(this.props), p: 1 },
        { addQueryPrefix: true },
      )}`;
    } else if (searchBy === 'job_title') {
      return `/job-titles/${encodeURIComponent(
        data.name,
      )}/overview${qs.stringify(
        { ...querySelector(this.props), p: 1 },
        { addQueryPrefix: true },
      )}`;
    }
    return '';
  }

  render() {
    const { status } = this.props;
    const pathname = pathnameSelector(this.props);
    const search = searchSelector(this.props);
    const page = validatePage(pageSelector(this.props));
    const pageSize = 10;
    const totalNum = this.props.data.size;

    const keyword = validateSearchKeyword(searchKeywordSelector(this.props));
    const title = getTitle(keyword);

    const queryParams = querySelector(this.props);

    const raw = this.props.data
      .slice((page - 1) * pageSize, page * pageSize)
      .toJS();

    return (
      <section className={styles.searchResult}>
        {renderHelmet({ title, pathname, search, page, keyword })}
        <h2 className={styles.heading}>{title}</h2>
        {isFetching(status) && <Loading size="s" />}
        {isFetched(status) && raw.length === 0 && (
          <P size="l" bold className={styles.searchNoResult}>
            尚未有 「{keyword}
            」的訊
          </P>
        )}
        {raw.map((o, i) => (
          <WorkingHourBlock key={i} data={o} to={this.getLinkForData(o)} />
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
  const searchBy = 'company'; // TODO
  const keyword = validateSearchKeyword(searchKeywordSelector(props));

  return dispatch(queryKeyword({ searchBy, keyword }));
});

const hoc = compose(ssr);

export default hoc(SearchScreen);
