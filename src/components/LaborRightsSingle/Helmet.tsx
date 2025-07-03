import React from 'react';
import { generatePath } from 'react-router';
import Helmet from 'react-helmet';
import {
  formatTitle,
  formatCanonicalPath,
  formatUrl,
} from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';
import { LaborRightEntry } from 'graphql/laborRight';

const EntryHelmet: React.FC<{ entry: LaborRightEntry }> = ({ entry }) => {
  const seoTitle = entry.seoTitle || entry.title;
  const seoDescription = entry.seoDescription || entry.description;
  const path = generatePath('/labor-rights/:entryId', { entryId: entry.id });

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {seoTitle}
      </title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={formatTitle(seoTitle, SITE_NAME)} />
      <meta property="og:description" content={seoDescription} />
      {entry.coverUrl && (
        <meta property="og:image" content={formatUrl(entry.coverUrl)} />
      )}
      <meta property="og:url" content={formatCanonicalPath(path)} />
      <link rel="canonical" href={formatCanonicalPath(path)} />
    </Helmet>
  );
};

export default EntryHelmet;
