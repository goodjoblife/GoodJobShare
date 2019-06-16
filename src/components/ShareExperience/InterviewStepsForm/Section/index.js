import React, { Component } from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import SectionEleContent from '../../common/SectionEleContent';

import { sectionContentOfLength as sectionContentValidator } from '../formCheck';

const SectionEleContentWithValidation = subscribeValidation(
  SectionEleContent,
  props => props.validator(props.section.content),
);

class Section extends Component {
  render() {
    const {
      section,
      contentMinLength,
      isSubtitleEditable,
      editSection,
      removeSection,
      submitted,
      changeValidationStatus,
      elementName,
    } = this.props;

    return (
      <Block style={{ marginBottom: 34 }}>
        <div
          style={{
            position: 'relative',
          }}
        >
          <SectionEleContentWithValidation
            section={section}
            isSubtitleEditable={isSubtitleEditable}
            contentMinLength={contentMinLength}
            editSection={editSection(section.id)}
            removeSection={removeSection && (() => removeSection(section.id))}
            validator={sectionContentValidator(contentMinLength)}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
            elementName={elementName}
          />
        </div>
      </Block>
    );
  }
}

Section.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  }),
  contentMinLength: PropTypes.number.isRequired,
  isSubtitleEditable: PropTypes.bool,
  editSection: PropTypes.func,
  removeSection: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
  elementName: PropTypes.string,
};

export default Section;
