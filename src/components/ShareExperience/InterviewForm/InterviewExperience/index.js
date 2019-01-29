import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonAdd from 'common/button/ButtonAdd';
import AddButton from 'common/button/AddButton';
import { Comment2 } from 'common/icons';
import subscribeValidation from 'common/subscribeValidation';
import IconHeadingBlock from 'common/IconHeadingBlock';

import Title from '../../common/Title';
import Sections from '../../common/Sections';
import InterviewQas from './InterviewQas';
import InterviewSensitiveQuestions from './InterviewSensitiveQuestions';

import shareStyles from '../../common/share.module.css';

import {
  title as titleValidator,
  sections as sectionsValidator,
  interviewSensitiveQuestions as interviewSensitiveQuestionsValidator,
} from '../formCheck';

import { interviewSectionSubtitleOptions } from '../../common/optionMap';

import {
  TITLE,
  SECTIONS,
  INTERVIEW_SENSITIVE_QUESTIONS,
} from '../../../../constants/formElements';

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

const InterviewSensitiveQuestionsWithValidation = subscribeValidation(
  InterviewSensitiveQuestions,
  props => props.validator(props.interviewSensitiveQuestions),
  INTERVIEW_SENSITIVE_QUESTIONS,
);

class InterviewExperience extends Component {
  render() {
    const {
      handleState,
      title,
      sections,
      appendSection,
      removeSection,
      editSection,
      interviewQas,
      appendQa,
      removeQa,
      editQa,
      interviewSensitiveQuestions,
      submitted,
      changeValidationStatus,
    } = this.props;
    return (
      <IconHeadingBlock
        heading="面試經驗"
        Icon={Comment2}
        marginTop
        requiredText
      >
        <div
          style={{
            marginBottom: '50px',
          }}
        >
          <TitleWithValidation
            title={title}
            onChange={handleState('title')}
            placeholder="ＯＯ 股份有限公司面試經驗分享"
            validator={titleValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
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
          <div className={shareStyles.button__add}>
            <ButtonAdd
              options={interviewSectionSubtitleOptions}
              custimizedValues={[interviewSectionSubtitleOptions[0].value]}
              disabledValues={sections.map(section => section.subtitle)}
              appendBlock={appendSection}
            />
          </div>
        </div>
        <hr
          style={{
            border: '1px solid #E7E7E7',
            marginBottom: '35px',
          }}
        />
        <div
          style={{
            position: 'relative',
            marginBottom: '80px',
          }}
        >
          <InterviewQas
            interviewQas={interviewQas}
            editQa={editQa}
            removeQa={removeQa}
          />
          <div className={shareStyles.button__add}>
            <AddButton onClick={() => appendQa()} addQa />
          </div>
        </div>
        <hr
          style={{
            border: '1px solid #E7E7E7',
            marginBottom: '35px',
          }}
        />
        <div>
          <InterviewSensitiveQuestionsWithValidation
            interviewSensitiveQuestions={interviewSensitiveQuestions}
            onChange={handleState('interviewSensitiveQuestions')}
            submitted={submitted}
            validator={interviewSensitiveQuestionsValidator}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
      </IconHeadingBlock>
    );
  }
}

InterviewExperience.propTypes = {
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

export default InterviewExperience;
