import React from 'react';
import SeoStructure from 'common/Seo/SeoStructure';
import PropTypes from 'prop-types';
import { ORIGIN } from 'config';

const EmployerAggregateRating = ({
  title,
  description,
  companyName,
  averageRating,
  ratingCount,
}) => {
  return (
    <SeoStructure
      data={{
        '@context': 'https://schema.org/',
        '@type': 'EmployerAggregateRating',
        name: title,
        description,
        itemReviewed: {
          '@type': 'Organization',
          name: companyName,
          sameAs: ORIGIN,
        },
        ratingValue: parseFloat(averageRating.toFixed(1)),
        ratingCount: ratingCount,
        bestRating: 5,
        worstRating: 1,
      }}
    />
  );
};

EmployerAggregateRating.propTypes = {
  averageRating: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default EmployerAggregateRating;
