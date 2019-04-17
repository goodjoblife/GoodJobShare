import React, { Component } from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import SectionEleContent from '../../common/SectionEleContent';
import styles from './Section.module.css';

// import { sections as sectionsValidator } from '../formCheck';

import { SECTIONS } from '../../../../constants/formElements';

const SectionWithValidation = subscribeValidation(
  SectionEleContent,
  props => props.validator(props.sections),
  SECTIONS,
);

class ExperienceSection extends Component {
  render() {
    const {
      title,
      subtitle,
      contentMinLength,
      // sections,
      // removeSection,
      // editSection,
      // submitted,
      // changeValidationStatus,
    } = this.props;
    return (
      <Block style={{ marginBottom: 34 }} heading={title}>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        <div
          style={{
            position: 'relative',
          }}
        >
          <SectionWithValidation
            subtitle="Subtitle"
            content="Content"
            contentMinLength={contentMinLength}
            isSubtitleEditable
            editSection={() => {}}
            removeSection={() => {}}
            placeholder="Placeholder"
            titlePlaceholder="TitlePlaceholder"
          />
        </div>
      </Block>
    );
  }
}

ExperienceSection.propTypes = {
  handleState: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
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
