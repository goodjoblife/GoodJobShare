import React, { useEffect, useMemo } from 'react';
import { slice, head } from 'ramda';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { querySelector } from 'common/routing/selectors';
import Pagination from 'common/Pagination';
import { isFetching, isFetched, isUnfetched } from 'constants/status';
import { generatePageURL } from 'constants/companyJobTitle';
import { useQuery } from 'hooks/routing';
import { usePage } from 'hooks/routing/page';
import { queryKeyword, keywordMinLength } from 'actions/timeAndSalarySearch';
import { keywordFromQuerySelector } from 'selectors/routing/keyword';
import { dataSelector, statusSelector } from './selectors';
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
  const path = generatePageURL({
    pageType: data.pageType,
    pageName: data.name,
  });
  const search = qs.stringify({ ...query, p: 1 }, { addQueryPrefix: true });
  return `${path}${search}`;
}

const SearchScreen = () => {
  const history = useHistory();
  const dispath = useDispatch();
  const query = useQuery();
  const keyword = useMemo(() => keywordFromQuerySelector(query), [query]);
  const page = usePage();
  const data = useSelector(dataSelector(keyword));
  const status = useSelector(statusSelector(keyword));

  useEffect(() => {
    if (isUnfetched(status)) {
      dispath(queryKeyword({ keyword }));
    }
  }, [dispath, keyword, status]);

  const pageSize = 10;
  const totalNum = data.length;
  const title = getTitle(keyword);
  const raw = slice((page - 1) * pageSize, page * pageSize)(data);

  if (data.length === 1) {
    const firstData = head(data);
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
          businessNumber={o.businessNumber}
          to={getLinkForData(query, o)}
          dataCount={o.dataCount}
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
  const keyword = keywordFromQuerySelector(query);
  return dispatch(queryKeyword({ keyword }));
};

export default SearchScreen;
