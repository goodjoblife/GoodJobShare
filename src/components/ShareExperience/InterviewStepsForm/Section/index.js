import React, { Component } from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import SectionEleContent from '../../common/SectionEleContent';
import styles from './Section.module.css';

import { sectionContentOfLength as sectionContentValidator } from '../formCheck';

const SectionEleContentWithValidation = subscribeValidation(
  SectionEleContent,
  props => props.validator(props.section.content),
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
      elementName,
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
  elementName: PropTypes.string,
};

export default Section;
