import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from '../../../constants/helmetData';

const SearchScreenHelmet = ({ keyword, page }) => {
  const title = `查詢${keyword}的結果 - 第${page}頁`;
  const description = `查看${keyword}的薪水、加班狀況、面試心得，以及工作心得，協助您找到更好的工作！`;

  let url = formatCanonicalPath(`/salary-work-times?q=${keyword}`);
  if (page > 1) {
    url = formatCanonicalPath(`/salary-work-times?q=${keyword}&p=${page}`);
  }

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

export default SearchScreenHelmet;
