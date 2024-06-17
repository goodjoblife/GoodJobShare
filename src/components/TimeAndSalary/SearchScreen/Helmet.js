import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import qs from 'qs';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';

const SearchScreenHelmet = ({ keyword, page }) => {
  const title = `查詢${keyword}的結果 - 第${page}頁`;
  const description = `查詢${keyword}的薪水、加班狀況、面試心得、工作心得資料的結果`;

  const query = page > 1 ? { q: keyword, p: page } : { q: keyword };
  const url = formatCanonicalPath(
    `/search${qs.stringify(query, { addQueryPrefix: true })}`,
  );

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

SearchScreenHelmet.propTypes = {
  keyword: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default SearchScreenHelmet;
