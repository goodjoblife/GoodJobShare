import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from '../../../utils/helmetHelper';
import { SITE_NAME } from '../../../constants/helmetData';

export default ({ title, campaignInfo, pathname }) => {
  const url = formatCanonicalPath(pathname);
  const { title: campaignTitle, ogImgUrl } = campaignInfo;
  const newTitle = `${campaignTitle}的${title}`;
  const description = `馬上查看${campaignTitle}的薪資、工時資訊以及加班狀況，協助您找到更好的工作！`;

  return (
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: description },
        { property: 'og:title', content: formatTitle(newTitle, SITE_NAME) },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:image', content: ogImgUrl },
      ]}
      link={[{ rel: 'canonical', href: url }]}
    />
  );
};
