import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import SeoStructure from 'common/Seo/SeoStructure';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';
import LogoForStructureData from './logo_for_structure_data_600x60.jpg';
import {
  metaTitleSelector,
  metaDescriptionSelector,
} from './experienceSelector';

const SeoHelmet = ({ experience }) => {
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
      <link rel="canonical" href={formatCanonicalPath(`/experiences/${id}`)} />
    </Helmet>
  );
};

SeoHelmet.propTypes = {
  experience: PropTypes.object.isRequired,
};

const getStructureData = ({ experience }) => {
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
      url: formatCanonicalPath('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'GoodJob 職場透明化運動',
      logo: {
        '@type': 'ImageObject',
        url: LogoForStructureData,
      },
    },
    description,
  };
  return data;
};

const Seo = ({ experience }) => {
  return (
    <Fragment>
      <SeoHelmet experience={experience} />
      <SeoStructure data={getStructureData({ experience })} />
    </Fragment>
  );
};

Seo.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Seo;
