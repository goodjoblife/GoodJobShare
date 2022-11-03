import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { isFetched } from '../../constants/status';
import { SITE_NAME } from '../../constants/helmetData';
import {
  metaTitleSelector,
  metaDescriptionSelector,
} from './experienceSelector';

const SeoHelmet = ({ experienceState }) => {
  const { experience, experienceStatus } = experienceState;

  if (isFetched(experienceStatus)) {
    const id = experience.id;
    const title = metaTitleSelector(experience);
    let description = metaDescriptionSelector(experience);
    description = description.slice(0, 160);
    return (
      <Helmet>
        <title itemProp="name" lang="zh-TW">
          {title}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={formatCanonicalPath(`/experiences/${id}`)}
        />
        <link
          rel="canonical"
          href={formatCanonicalPath(`/experiences/${id}`)}
        />
      </Helmet>
    );
  }
  return null;
};

const SeoStructureData = ({ experienceState }) => {
  const { experience, experienceStatus } = experienceState;

  if (isFetched(experienceStatus)) {
    const id = experience.id;
    const title = metaTitleSelector(experience);
    const description = metaDescriptionSelector(experience);
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': formatCanonicalPath(`/experiences/${id}`),
      },
      headline: `${title}`,
      datePublished: `${experience.created_at}`,
      dateModified: `${experience.created_at}`,
      author: {
        '@type': 'Organization',
        name: 'GoodJob 職場透明化運動',
      },
      publisher: {
        '@type': 'Organization',
        name: 'GoodJob 職場透明化運動',
        logo: {
          '@type': 'ImageObject',
          url: 'https://image.goodjob.life/logo_for_structure_data_600x60.jpg',
        },
      },
      description,
    };
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(data) }}
      />
    );
  }
  return null;
};

const Seo = ({ experienceState }) => {
  return (
    <Fragment>
      <SeoHelmet experienceState={experienceState} />
      <SeoStructureData experienceState={experienceState} />
    </Fragment>
  );
};

export default Seo;
