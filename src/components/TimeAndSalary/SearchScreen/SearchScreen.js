import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import qs from 'qs';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { querySelector } from 'common/routing/selectors';
import Pagination from 'common/Pagination';
import { isFetching, isFetched } from 'constants/status';
import { pageType } from 'constants/companyJobTitle';
import { useQuery } from 'hooks/routing';
import {
  queryKeyword,
  keywordMinLength,
} from '../../../actions/timeAndSalarySearch';
import { validatePage, validateSearchKeyword } from '../common/validators';
import {
  keywordFromQuerySelector,
  pageFromQuerySelector,
} from '../common/selectors';
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

function getLinkForData(query, data) {
  if (data.pageType === pageType.COMPANY) {
    return `/companies/${encodeURIComponent(data.name)}/overview${qs.stringify(
      { ...query, p: 1 },
      { addQueryPrefix: true },
    )}`;
  } else if (data.pageType === pageType.JOB_TITLE) {
    return `/job-titles/${encodeURIComponent(data.name)}/overview${qs.stringify(
      { ...query, p: 1 },
      { addQueryPrefix: true },
    )}`;
  }
  return '';
}

const keywordSelector = compose(
  validateSearchKeyword,
  keywordFromQuerySelector,
);

const pageSelector = compose(
  validatePage,
  pageFromQuerySelector,
);

const SearchScreen = () => {
  const query = useQuery();
  const keyword = useMemo(() => keywordSelector(query), [query]);
  const page = useMemo(() => pageSelector(query), [query]);

  const dispath = useDispatch();

  const keywordFromRedux = useSelector(state =>
    state.timeAndSalarySearch.get('keyword'),
  );
  const data = useSelector(state => state.timeAndSalarySearch.get('data'));
  const status = useSelector(state => state.timeAndSalarySearch.get('status'));

  const history = useHistory();

  useEffect(() => {
    dispath(queryKeyword({ keyword }));
  }, [dispath, keyword]);

  const pageSize = 10;
  const totalNum = data.size;

  const title = getTitle(keyword);

  const raw = data.slice((page - 1) * pageSize, page * pageSize).toJS();

  if (isFetched(status) && data.size === 1 && keyword === keywordFromRedux) {
    const firstData = data.get(0).toJS();
    history.replace(getLinkForData(query, firstData));
    console.log('push!?');
    return null;
  }

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
          to={getLinkForData(query, o)}
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

SearchScreen.fetchData = ({ store: { dispatch }, ...props }) => {
  const query = querySelector(props);
  const keyword = keywordSelector(query);
  return dispatch(queryKeyword({ keyword }));
};

export default SearchScreen;
