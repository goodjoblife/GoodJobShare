import qs from 'qs';
import React from 'react';
import Helmet from 'react-helmet';

import {
  generateIndexURL,
  PageType,
  pageTypeTranslation,
} from 'constants/companyJobTitle';
import { SITE_NAME } from 'constants/helmetData';
import { formatCanonicalPath, formatTitle } from 'utils/helmetHelper';

type IndexHelmetProps = {
  pageType: PageType;
  page: number;
};

const IndexHelmet: React.FC<IndexHelmetProps> = ({ pageType, page }) => {
  const title = `所有${pageTypeTranslation[pageType]}資料 - 第${page}頁`;

  const path = generateIndexURL({ pageType });
  const search = qs.stringify(page > 1 ? { p: page } : null, {
    addQueryPrefix: true,
  });
  const canonicalURL = `${formatCanonicalPath(path)}${search}`;

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:url" content={canonicalURL} />
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
};

export default IndexHelmet;
