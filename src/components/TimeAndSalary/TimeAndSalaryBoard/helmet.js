import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { IMG_HOST, SITE_NAME } from '../../../constants/helmetData';
import { toQsString } from './helper';

export default ({ title, pathname, page, dataNum }) => {
  const helmetTitle = `${title} - 第${page}頁`;
  const search = page === 1 ? '' : `?${toQsString({ page })}`;
  const url = `${formatCanonicalPath(pathname)}${search}`;
  const description = `查詢各行各業的薪水、加班情況、工時資料，共 ${dataNum} 筆資料`;

  return (
    <Helmet
      title={helmetTitle}
      meta={[
        { name: 'description', content: description },
        { property: 'og:title', content: formatTitle(helmetTitle, SITE_NAME) },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        {
          property: 'og:image',
          content: `${IMG_HOST}/og/time-and-salary.jpg`,
        },
      ]}
      link={[{ rel: 'canonical', href: url }]}
    />
  );
};
