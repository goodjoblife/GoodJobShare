import React, { PropTypes } from 'react';
import subscribeValidation from 'common/subscribeValidation';

import ButtonAdd from 'common/button/ButtonAdd';
import styles from './WorkExperience.module.css';

import Title from '../../common/Title';
import Sections from '../../common/Sections';

import {
  interviewSectionSubtitleOptions,
} from '../../common/optionMap';

import {
  title as titleValidator,
  sections as sectionsValidator,
} from '../formCheck';

import { TITLE, SECTIONS } from '../../../../constants/formElements';

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
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <h1
          className="pLBold"
          style={{
            marginBottom: '13px',
          }}
        >
          工作經驗
        </h1>
        <div className={styles.form}>
          <div
            style={{
              marginBottom: '50px',
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
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                minWidth: '150%',
                transform: 'translate(-65px, 100%)',
              }}
            >
              <ButtonAdd
                options={interviewSectionSubtitleOptions}
                custimizedValues={[interviewSectionSubtitleOptions[0].value]}
                disabledValues={sections.map(section => section.subtitle)}
                appendBlock={appendSection}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkExperience.propTypes = {
  handleState: PropTypes.func,
  title: PropTypes.string,
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  })),
  appendSection: PropTypes.func,
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default WorkExperience;
