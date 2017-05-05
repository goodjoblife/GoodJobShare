import React, { PropTypes } from 'react';

const SectionEle = ({ subtitle, content }) => (
  <div>
    <p
      className="pLBold"
      style={{
        marginBottom: '14px',
      }}
    >
      {subtitle}
    </p>
    <p
      className="pM"
    >
      {content}
    </p>
  </div>
);

SectionEle.propTypes = {
  subtitle: PropTypes.string,
  content: PropTypes.string,
};

export default SectionEle;
