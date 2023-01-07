import React, { Component, useEffect, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { isFetching, isFetched } from 'constants/status';
import { pageType } from 'constants/companyJobTitle';
import {
  searchCriteriaSelector,
  searchKeywordSelector,
  pageSelector,
} from '../common/selectors';

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

function getLinkForData(props, data) {
  if (data.pageType === pageType.COMPANY) {
    return `/companies/${encodeURIComponent(data.name)}/overview${qs.stringify(
      { ...querySelector(props), p: 1 },
      { addQueryPrefix: true },
    )}`;
  } else if (data.pageType === pageType.JOB_TITLE) {
    return `/job-titles/${encodeURIComponent(data.name)}/overview${qs.stringify(
      { ...querySelector(props), p: 1 },
      { addQueryPrefix: true },
    )}`;
  }
  return '';
}

const useSearch = () => {
  const location = useLocation();
  return location.search;
};

const useQuery = () => {
  const search = useSearch();
  return useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search]);
};

const useKeyword = () => {
  const query = useQuery();
  return useMemo(() => validateSearchKeyword(query.q), [query]);
};

const usePage = () => {
  const query = useQuery();
  return useMemo(() => validatePage(query.p), [query]);
};

const SearchScreen = () => {
  const keyword = useKeyword();
  const page = usePage();
  const query = useQuery();

  const dispath = useDispatch();

  const data = useSelector(state => state.timeAndSalarySearch.get('data'));
  const status = useSelector(state => state.timeAndSalarySearch.get('status'));

  console.log(query, keyword, page);

  const history = useHistory();
  const location = useLocation();

  const redirectOnSingleResult = () => {
    if (data.size === 1) {
      const firstData = data.get(0).toJS();
      history.replace(getLinkForData({ location }, firstData));
    }
  };

  useEffect(() => {
    dispath(queryKeyword({ keyword })).then(() => redirectOnSingleResult());
  }, [keyword]);

  const pageSize = 10;
  const totalNum = data.size;

  const title = getTitle(keyword);

  const raw = data.slice((page - 1) * pageSize, page * pageSize).toJS();

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
          to={getLinkForData({ location }, o)}
          dataCount={o.salary_work_time_statistics.count}
        />
      ))}
      <Pagination
        totalCount={totalNum}
        unit={pageSize}
        currentPage={page}
        createPageLinkTo={toPage =>
          qs.stringify({ ...query, p: toPage }, { addQueryPrefix: true })
        }
      />
      <FanPageBlock className={styles.fanPageBlock} />
    </section>
  );
};

SearchScreen.propTypes = {
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

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const keyword = validateSearchKeyword(searchKeywordSelector(props));

  return dispatch(queryKeyword({ keyword }));
});

const hoc = compose(ssr);

export default hoc(SearchScreen);
