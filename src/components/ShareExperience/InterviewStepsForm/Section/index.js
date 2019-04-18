import React, { Component } from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import SectionEleContent from '../../common/SectionEleContent';
import styles from './Section.module.css';

import { singleSection as singleSectionValidator } from '../formCheck';

import { SECTIONS } from '../../../../constants/formElements';

const SectionEleContentWithValidation = subscribeValidation(
  SectionEleContent,
  props => props.validator(props.section),
  SECTIONS,
);

class Section extends Component {
  render() {
    const {
      heading,
      subHeading,
      section,
      contentMinLength,
      editSection,
      submitted,
      changeValidationStatus,
    } = this.props;

    return (
      <Block style={{ marginBottom: 34 }} heading={heading}>
        {subHeading && <div className={styles.subtitle}>{subHeading}</div>}
        <div
          style={{
            position: 'relative',
          }}
        >
          <SectionEleContentWithValidation
            section={section}
            contentMinLength={contentMinLength}
            editSection={editSection(section.id)}
            validator={singleSectionValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
      </Block>
    );
  }
}

Section.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  section: PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  }),
  contentMinLength: PropTypes.number.isRequired,
  editSection: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default Section;
