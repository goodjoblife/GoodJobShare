import React, { PropTypes } from 'react';

const SectionEle = ({ subtitle, content }) => (
  <div>
    <h3>{subtitle}</h3>
    <div>
      {content}
    </div>
  </div>
);

SectionEle.propTypes = {
  subtitle: PropTypes.string,
  content: PropTypes.string,
};

export default SectionEle;
