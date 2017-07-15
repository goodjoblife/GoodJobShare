import React, { PropTypes } from 'react';
import cn from 'classnames';

import SectionEle from './SectionEle';

import styles from './Sections.module.css';

const Sections = ({ sections, removeSection, editSection, validator }) => {
  const isWarning = !validator(sections);
  return (
    <div
      className={isWarning ? styles.warning : ''}
    >
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
      {
        isWarning ?
          <p
            className={cn(styles.warning__wording, 'pS')}
          >
            需完整填寫一則內容（包含標題及內文）
          </p>
          : null
      }
    </div>
  );
};

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    isSubtitleEditable: PropTypes.bool,
  })),
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
  validator: PropTypes.func,
};

export default Sections;
