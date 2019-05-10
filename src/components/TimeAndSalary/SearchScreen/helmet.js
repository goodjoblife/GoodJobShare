import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { IMG_HOST, SITE_NAME } from '../../../constants/helmetData';

export default ({ title, pathname, search, page, keyword }) => {
  const helmetTitle = `${title} - 第${page}頁`;
  const url = `${formatCanonicalPath(pathname)}${search}`;
  const description = `馬上查看${keyword}的薪水、工時資訊以及加班狀況，協助您找到更好的工作！`;

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {helmetTitle}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(helmetTitle, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${IMG_HOST}/og/time-and-salary.jpg`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
