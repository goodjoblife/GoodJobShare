import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import SectionEle from './SectionEle';

import styles from './Sections.module.css';

const Sections = ({
  sections,
  removeSection,
  editSection,
  validator,
  submitted,
}) => {
  const isWarning = submitted && !validator(sections);
  return (
    <div className={isWarning ? styles.warning : ''}>
      {sections.map(section => (
        <div key={section.id} className={styles.section}>
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
      ))}
      {isWarning ? (
        <p className={cn(styles.warning__wording, 'pS')}>
          需至少填寫一個段落，且每個段落內文需至少 50 字
        </p>
      ) : null}
    </div>
  );
};

Sections.propTypes = {
  editSection: PropTypes.func,
  removeSection: PropTypes.func,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      id: PropTypes.number,
      isSubtitleEditable: PropTypes.bool,
      placeholder: PropTypes.string,
      subtitle: PropTypes.string,
      titlePlaceholder: PropTypes.string,
    }),
  ),
  submitted: PropTypes.bool,
  validator: PropTypes.func,
};

export default Sections;
