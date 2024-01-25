import React from 'react';
import serialize from 'serialize-javascript';

const SeoStructure = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
};

export default SeoStructure;
