import React, { PropTypes } from 'react';
import cn from 'classnames';

import SectionEle from './SectionEle';

import styles from './Sections.module.css';

const Sections = ({ sections, removeSection, editSection, validator, submitted }) => {
  const isWarning = submitted && !validator(sections);
  return (
    <div
      className={isWarning ? styles.warning : ''}
    >
      {
        sections.map(section =>
          <div
            key={section.id}
            className={styles.section}
          >
            <SectionEle
              subtitle={section.subtitle}
              content={section.content}
              isSubtitleEditable={section.isSubtitleEditable}
              editSection={editSection(section.id)}
              removeSection={() => removeSection(section.id)}
              placeholder={section.placeholder}
              titlePlaceholder={section.titlePlaceholder}
            />
          </div>
        )
      }
      {
        isWarning ?
          <p
            className={cn(styles.warning__wording, 'pS')}
          >
            需填寫一則內容（包含完整的標題及內文）
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
    placeholder: PropTypes.string,
    titlePlaceholder: PropTypes.string,
    content: PropTypes.string,
    isSubtitleEditable: PropTypes.bool,
  })),
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

export default Sections;
