import qs from 'qs';
import { head, slice } from 'ramda';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryKeyword } from 'actions/search';
import { P } from 'common/base';
import Wrapper from 'common/base/Wrapper';
import FanPageBlock from 'common/FanPageBlock';
import Loading from 'common/Loader';
import Pagination from 'common/Pagination';
import Redirect from 'common/routing/Redirect';
import { querySelector } from 'common/routing/selectors';
import CompanyJobTitleBlock from 'components/CompanyAndJobTitle/CompanyJobTitleBlock';
import { generatePageURL } from 'constants/companyJobTitle';
import { useQuery } from 'hooks/routing';
import { usePage } from 'hooks/routing/page';
import { queryFromQuerySelector } from 'selectors/routing';
import { searchByKeywordSelector } from 'selectors/search';
import { isFetched, isFetching, isUnfetched } from 'utils/fetchBox';

import Helmet from './Helmet';
import styles from './SearchPage.module.css';

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

const SearchPage = () => {
  const dispath = useDispatch();
  const query = useQuery();
  const keyword = useMemo(() => queryFromQuerySelector(query), [query]);
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
                <CompanyJobTitleBlock
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

SearchPage.fetchData = ({ store: { dispatch }, ...props }) => {
  const query = querySelector(props);
  const keyword = queryFromQuerySelector(query);
  return dispatch(queryKeyword({ keyword }));
};

export default SearchPage;
