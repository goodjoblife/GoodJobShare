import React, { useEffect, useMemo } from 'react';
import { slice, head } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { querySelector } from 'common/routing/selectors';
import Pagination from 'common/Pagination';
import Wrapper from 'common/base/Wrapper';
import Redirect from 'common/routing/Redirect';
import { isFetched, isUnfetched, isFetching } from 'utils/fetchBox';
import { generatePageURL } from 'constants/companyJobTitle';
import { useQuery } from 'hooks/routing';
import { usePage } from 'hooks/routing/page';
import { queryKeyword } from 'actions/search';
import { keywordFromQuerySelector } from 'selectors/routing/keyword';
import { searchByKeywordSelector } from 'selectors/search';
import WorkingHourBlock from './WorkingHourBlock';
import Helmet from './Helmet';
import styles from './SearchScreen.module.css';

const keywordMinLength = 2;

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
  const dispath = useDispatch();
  const query = useQuery();
  const keyword = useMemo(() => keywordFromQuerySelector(query), [query]);
  const page = usePage();
  const box = useSelector(searchByKeywordSelector(keyword));

  useEffect(() => {
    // Do not query if keyword is too short
    if (isUnfetched(box) && keyword && keyword.length >= keywordMinLength) {
      dispath(queryKeyword({ keyword }));
    }
  }, [dispath, keyword, box]);

  const pageSize = 10;
  const title = getTitle(keyword);

  if (isFetched(box)) {
    const data = box.data;
    if (data.length === 1) {
      const firstData = head(data);
      return <Redirect status={302} to={getLinkForData(query, firstData)} />;
    }
  }

  return (
    <Wrapper size="l" className={styles.subRouteWrapper}>
      <section className={styles.searchResult}>
        <Helmet keyword={keyword} page={page} />
        <h2 className={styles.heading}>{title}</h2>
        {isFetching(box) && <Loading size="s" />}
        {isFetched(box) && box.data.length === 0 && (
          <P size="l" bold className={styles.searchNoResult}>
            尚未有 「{keyword}」的資料
          </P>
        )}
        {isFetched(box) && (
          <>
            {slice((page - 1) * pageSize, page * pageSize)(box.data).map(
              (o, i) => (
                <WorkingHourBlock
                  key={i}
                  pageType={o.pageType}
                  name={o.name}
                  businessNumber={o.businessNumber}
                  to={getLinkForData(query, o)}
                  dataCount={o.dataCount}
                />
              ),
            )}
            <Pagination
              totalCount={box.data.length}
              unit={pageSize}
              currentPage={page}
              createPageLinkTo={toPage =>
                qs.stringify({ ...query, p: toPage }, { addQueryPrefix: true })
              }
            />
          </>
        )}
        <FanPageBlock className={styles.fanPageBlock} />
      </section>
    </Wrapper>
  );
};

SearchScreen.fetchData = ({ store: { dispatch }, ...props }) => {
  const query = querySelector(props);
  const keyword = keywordFromQuerySelector(query);
  return dispatch(queryKeyword({ keyword }));
};

export default SearchScreen;
