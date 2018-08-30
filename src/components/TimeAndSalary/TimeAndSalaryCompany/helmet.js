import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from '../../../utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../../constants/helmetData';

export default ({ title, pathname, company }) => {
  const url = formatCanonicalPath(pathname);
  const description = `馬上查看${company}的薪資、工時資訊以及加班狀況，協助您找到更好的工作！`;
  const newTitle = `${company}的${title}`;

  return (
    <Helmet
      title={newTitle}
      meta={[
        { name: 'description', content: description },
        { property: 'og:title', content: formatTitle(newTitle, SITE_NAME) },
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
