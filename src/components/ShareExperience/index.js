import React, { PropTypes } from 'react';

const ShareExperience = ({ children }) => (
  <div>
    {children}
  </div>
);

ShareExperience.propTypes = {
  children: PropTypes.node,
};

export default ShareExperience;
