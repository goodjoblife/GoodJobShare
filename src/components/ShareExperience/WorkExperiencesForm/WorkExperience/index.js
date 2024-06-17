import React from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';

import ButtonAdd from 'common/button/ButtonAdd';
import Comment2 from 'common/icons/Comment2';
import IconHeadingBlock from 'common/IconHeadingBlock';

import Title from '../../common/Title';
import Sections from '../../common/Sections';

import shareStyles from '../../common/share.module.css';

import { workExSectionSubtitleOptions } from '../../common/optionMap';

import {
  title as titleValidator,
  sections as sectionsValidator,
} from '../formCheck';

import { TITLE, SECTIONS } from 'constants/formElements';

const TitleWithValidation = subscribeValidation(
  Title,
  props => props.validator(props.title),
  TITLE,
);

const SectionsWithValidation = subscribeValidation(
  Sections,
  props => props.validator(props.sections),
  SECTIONS,
);

class WorkExperience extends React.PureComponent {
  render() {
    const {
      handleState,
      title,
      sections,
      appendSection,
      removeSection,
      editSection,
      submitted,
      changeValidationStatus,
    } = this.props;

    return (
      <IconHeadingBlock
        heading="工作經驗"
        Icon={Comment2}
        marginTop
        requiredText
      >
        <div
          style={{
            marginBottom: '24px',
          }}
        >
          <TitleWithValidation
            title={title}
            onChange={handleState('title')}
            placeholder="ＯＯ 股份有限公司工作經驗分享"
            validator={titleValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
        <div
          style={{
            position: 'relative',
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
          <div className={shareStyles.button__add}>
            <ButtonAdd
              options={workExSectionSubtitleOptions}
              custimizedValues={[workExSectionSubtitleOptions[0].value]}
              disabledValues={sections.map(section => section.subtitle)}
              appendBlock={appendSection}
            />
          </div>
        </div>
      </IconHeadingBlock>
    );
  }
}

WorkExperience.propTypes = {
  appendSection: PropTypes.func,
  changeValidationStatus: PropTypes.func,
  editSection: PropTypes.func,
  handleState: PropTypes.func,
  removeSection: PropTypes.func,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      id: PropTypes.number,
      subtitle: PropTypes.string,
    }),
  ),
  submitted: PropTypes.bool,
  title: PropTypes.string,
};

export default WorkExperience;
