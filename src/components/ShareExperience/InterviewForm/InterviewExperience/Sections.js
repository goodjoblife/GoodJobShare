import React, { PropTypes } from 'react';

import SectionEle from './SectionEle';

const Sections = ({ sections, removeSection, editSection }) => (
  <div>
    {
      sections.map(section =>
        <div
          key={section.id}
          style={{
            marginBottom: '40px',
          }}
        >
          <SectionEle
            subtitle={section.subtitle}
            content={section.content}
            isSubtitleEditable={section.isSubtitleEditable}
            editSection={editSection(section.id)}
            removeSection={() => removeSection(section.id)}
          />
        </div>
      )
    }
  </div>
);

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    isSubtitleEditable: PropTypes.bool,
  })),
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
};

export default Sections;
