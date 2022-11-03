import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose, setStatic } from 'recompose';
import qs from 'qs';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { querySelector, pathSelector } from 'common/routing/selectors';
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
import { pageType } from '../../../constants/companyJobTitle';
import { validatePage, validateSearchKeyword } from '../common/validators';
import WorkingHourBlock from './WorkingHourBlock';
import Helmet from './Helmet';
import styles from './SearchScreen.module.css';

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
    const keyword = validateSearchKeyword(searchKeywordSelector(this.props));
    this.props
      .queryKeyword({ keyword })
      .then(() => this.redirectOnSingleResult());
  }

  componentDidUpdate(prevProps) {
    if (
      pathSelector(prevProps) !== pathSelector(this.props) ||
      searchCriteriaSelector(prevProps) !==
        searchCriteriaSelector(this.props) ||
      searchKeywordSelector(prevProps) !== searchKeywordSelector(this.props)
    ) {
      const keyword = validateSearchKeyword(searchKeywordSelector(this.props));
      this.props
        .queryKeyword({ keyword })
        .then(() => this.redirectOnSingleResult());
    }
  }

  redirectOnSingleResult() {
    if (this.props.data.size === 1) {
      const firstData = this.props.data.get(0).toJS();
      this.props.history.replace(this.getLinkForData(firstData));
    }
  }

  getLinkForData(data) {
    if (data.pageType === pageType.COMPANY) {
      return `/companies/${encodeURIComponent(
        data.name,
      )}/overview${qs.stringify(
        { ...querySelector(this.props), p: 1 },
        { addQueryPrefix: true },
      )}`;
    } else if (data.pageType === pageType.JOB_TITLE) {
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
        <Helmet keyword={keyword} page={page} />
        <h2 className={styles.heading}>{title}</h2>
        {isFetching(status) && <Loading size="s" />}
        {isFetched(status) && raw.length === 0 && (
          <P size="l" bold className={styles.searchNoResult}>
            尚未有 「{keyword} 」的資料
          </P>
        )}
        {raw.map((o, i) => (
          <WorkingHourBlock
            key={i}
            pageType={o.pageType}
            name={o.name}
            to={this.getLinkForData(o)}
            dataCount={o.salary_work_time_statistics.count}
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
  const keyword = validateSearchKeyword(searchKeywordSelector(props));

  return dispatch(queryKeyword({ keyword }));
});

const hoc = compose(ssr);

export default hoc(SearchScreen);
