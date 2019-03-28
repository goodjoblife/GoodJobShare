import React from 'react';
import HelmetComponent from 'common/HelmetComponent';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../../constants/helmetData';

export default ({ title, pathname, page, keyword }) => {
  const helmetTitle = `${title} - 第${page}頁`;
  const url = formatCanonicalPath(pathname);
  const description = `馬上查看${keyword}的薪水、工時資訊以及加班狀況，協助您找到更好的工作！`;

  return (
    <HelmetComponent
      title={helmetTitle}
      meta={[
        { name: 'description', content: description },
        { property: 'og:title', content: formatTitle(helmetTitle, SITE_NAME) },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        {
          property: 'og:image',
          content: `${imgHost}/og/time-and-salary.jpg`,
        },
      ]}
      link={[{ rel: 'canonical', href: url }]}
    />
  );
};
