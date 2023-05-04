import React from 'react';
import Helmet from 'react-helmet';
import {
  formatTitle,
  formatCanonicalPath,
  formatUrl,
} from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';

const EntryHelmet = ({ entryId, seoTitle, seoDescription, coverUrl }) => {
  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {seoTitle}
      </title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={formatTitle(seoTitle, SITE_NAME)} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={formatUrl(coverUrl)} />
      <meta
        property="og:url"
        content={formatCanonicalPath(`/labor-rights/${entryId}`)}
      />
      <link
        rel="canonical"
        href={formatCanonicalPath(`/labor-rights/${entryId}`)}
      />
    </Helmet>
  );
};

export default EntryHelmet;
