import React from 'react';

const HidingText = ({ content }) => (
  <div style={{ display: 'none' }}>
    {content}
  </div>
);

HidingText.propTypes = {
  content: React.PropTypes.string,
};

export default HidingText;
