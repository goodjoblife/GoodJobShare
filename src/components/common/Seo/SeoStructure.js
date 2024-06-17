import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const SeoStructure = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
};

SeoStructure.propTypes = {
  data: PropTypes.any.isRequired,
};

export default SeoStructure;
