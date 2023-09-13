import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { querySelector } from 'common/routing/selectors';
import Pagination from 'common/Pagination';
import { isFetching, isFetched, isUnfetched } from 'constants/status';
import { pageType } from 'constants/companyJobTitle';
import { useQuery } from 'hooks/routing';
import { queryKeyword, keywordMinLength } from 'actions/timeAndSalarySearch';
import {
  keywordSelector,
  pageSelector,
  dataSelector,
  statusSelector,
} from './selectors';
import * as urlBuilder from './urlBuilder';
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
    return urlBuilder.companyPageOverview(data.name, 1, query);
  } else if (data.pageType === pageType.JOB_TITLE) {
    return urlBuilder.jobTitlePageOverview(data.name, 1, query);
  }
  return '';
}

const SearchScreen = () => {
  const history = useHistory();
  const dispath = useDispatch();
  const query = useQuery();
  const keyword = useMemo(() => keywordSelector(query), [query]);
  const page = useMemo(() => pageSelector(query), [query]);
  const data = useSelector(dataSelector(keyword));
  const status = useSelector(statusSelector(keyword));

  useEffect(() => {
    if (isUnfetched(status)) {
      dispath(queryKeyword({ keyword }));
    }
  }, [dispath, keyword, status]);

  const pageSize = 10;
  const totalNum = data.size;
  const title = getTitle(keyword);
  const raw = data.slice((page - 1) * pageSize, page * pageSize).toJS();

  if (data.size === 1) {
    const firstData = data.get(0).toJS();
    history.replace(getLinkForData(query, firstData));
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
