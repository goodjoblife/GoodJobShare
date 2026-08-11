import React from 'react';

import SeoStructure from 'common/Seo/SeoStructure';
import { ORIGIN } from 'config';

type EmployerAggregateRatingSeoProps = {
  title: string;
  description: string;
  companyName: string;
  averageRating: number;
  ratingCount: number;
};

const EmployerAggregateRatingSeo: React.FC<EmployerAggregateRatingSeoProps> = ({
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
        ratingCount,
        bestRating: 5,
        worstRating: 1,
      }}
    />
  );
};

export default EmployerAggregateRatingSeo;
