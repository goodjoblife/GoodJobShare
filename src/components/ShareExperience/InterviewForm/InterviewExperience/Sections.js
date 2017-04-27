import React, { PropTypes } from 'react';

const Sections = () => (
  <div>
    Sections
  </div>
);

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  })),
  appendSection: PropTypes.func,
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
};

export default Sections;
