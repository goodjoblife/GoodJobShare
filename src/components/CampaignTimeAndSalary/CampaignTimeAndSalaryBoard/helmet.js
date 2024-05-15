import React from 'react';
import Helmet from 'react-helmet';
import qs from 'qs';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';

export default ({ title, campaignInfo, pathname, page }) => {
  const search = qs.stringify(page === 1 ? null : { p: page }, {
    addQueryPrefix: true,
  });
  const url = `${formatCanonicalPath(pathname)}${search}`;
  const { title: campaignTitle, ogImgUrl } = campaignInfo;
  const newTitle = `${campaignTitle}的${title}`;
  const description = `馬上查看${campaignTitle}的薪資、工時資訊以及加班狀況，協助您找到更好的工作！`;

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(newTitle, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImgUrl} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
