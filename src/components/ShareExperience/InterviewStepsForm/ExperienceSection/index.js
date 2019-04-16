import React, { Component } from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import Sections from '../../common/Sections';

import { sections as sectionsValidator } from '../formCheck';

import { SECTIONS } from '../../../../constants/formElements';

const SectionsWithValidation = subscribeValidation(
  Sections,
  props => props.validator(props.sections),
  SECTIONS,
);

class ExperienceSection extends Component {
  render() {
    const {
      sections,
      removeSection,
      editSection,
      submitted,
      changeValidationStatus,
    } = this.props;
    return (
      <Block heading="當時面試過程是如何呢？（＋100 積分）">
        <div
          style={{
            position: 'relative',
            marginBottom: '80px',
          }}
        >
          <SectionsWithValidation
            sections={sections}
            removeSection={removeSection}
            editSection={editSection}
            validator={sectionsValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
      </Block>
    );
  }
}

ExperienceSection.propTypes = {
  handleState: PropTypes.func,
  title: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      subtitle: PropTypes.string,
      placeholder: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  appendSection: PropTypes.func,
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
  interviewQas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      subtitle: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  appendQa: PropTypes.func,
  removeQa: PropTypes.func,
  editQa: PropTypes.func,
  interviewSensitiveQuestions: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default ExperienceSection;
