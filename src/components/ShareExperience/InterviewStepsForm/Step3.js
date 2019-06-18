import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Section from './Section';
import QAs from './QAs';
import { withSubmit } from '../../../containers/ShareExperience/SubmitAreaContainer';
import Button from 'common/button/Button';
import ButtonRect from 'common/button/ButtonRect';
import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';
import Modal from 'common/Modal';
import {
  EXPERIENCE_SECTION,
  SUGGESTION_SECTION,
} from '../../../constants/formElements';
import { compose } from 'recompose';
import styles from './InterviewForm.module.css';

class Step3 extends React.Component {
  static propTypes = {
    handleState: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        subtitle: PropTypes.string,
        placeholder: PropTypes.string,
        content: PropTypes.string,
      }),
    ).isRequired,
    appendSection: PropTypes.func.isRequired,
    removeSection: PropTypes.func.isRequired,
    editSection: PropTypes.func.isRequired,
    interviewQas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        subtitle: PropTypes.string,
        content: PropTypes.string,
      }),
    ).isRequired,
    appendQa: PropTypes.func.isRequired,
    removeQa: PropTypes.func.isRequired,
    editQa: PropTypes.func.isRequired,
    changeValidationStatus: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {
      handleState,
      state,
      sections,
      appendSection,
      removeSection,
      editSection,
      interviewQas,
      appendQa,
      removeQa,
      editQa,
      changeValidationStatus,
      onSubmit,
      history,
      auth,
      agree,
      handleAgree,
      isOpen,
      feedback,
      hasClose,
      closableOnClickOutside,
      isSubmitting,
      login,
      handleIsOpen,
    } = this.props;

    return (
      <React.Fragment>
        <Section
          isRequired
          section={sections[0]}
          subHeading="回想一下，不論是流程、對話、工作環境、薪資福利，都可以分享哦！"
          contentMinLength={30}
          editSection={editSection}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
          elementName={EXPERIENCE_SECTION}
        />
        <QAs
          handleState={handleState}
          title={state.title}
          sections={sections}
          appendSection={appendSection}
          removeSection={removeSection}
          editSection={editSection}
          interviewQas={interviewQas}
          appendQa={appendQa}
          removeQa={removeQa}
          editQa={editQa}
          interviewSensitiveQuestions={state.interviewSensitiveQuestions}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
        />
        <Section
          isRequired
          section={sections[1]}
          contentMinLength={30}
          editSection={editSection}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
          elementName={SUGGESTION_SECTION}
        />
        {sections.slice(2).map(section => (
          <Section
            key={section.id}
            section={section}
            isSubtitleEditable
            contentMinLength={30}
            editSection={editSection}
            removeSection={removeSection}
            submitted={state.submitted}
            changeValidationStatus={changeValidationStatus}
            elementName={`section-${section.id}`}
          />
        ))}
        <div style={{ textAlign: 'center' }}>
          <Button
            circleSize="md"
            btnStyle="blackLine"
            onClick={() => appendSection('', '', '')}
          >
            ＋增加更多章節
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '57px',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
            htmlFor="submitArea-checkbox"
          >
            <Checkbox
              margin={'0'}
              value={''}
              label={''}
              checked={agree}
              onChange={e => handleAgree(e.target.checked)}
              id="submitArea-checkbox"
            />
            <p
              style={{
                color: '#3B3B3B',
              }}
            >
              我分享的是真實資訊，並且遵守本站
              <Link
                to="/guidelines"
                target="_blank"
                style={{
                  color: '#02309E',
                }}
              >
                發文留言規定
              </Link>
              、
              <Link
                to="/user-terms"
                target="_blank"
                style={{
                  color: '#02309E',
                }}
              >
                使用者條款
              </Link>
              以及中華民國法律。
            </p>
          </label>
          <div className={styles.nextAction}>
            <ButtonRect
              className={styles.backButton}
              onClick={() => history.push('/share/interview/step2')}
            >
              上一步
            </ButtonRect>
            <ButtonSubmit
              text="送出資料"
              onSubmit={onSubmit}
              disabled={isSubmitting || !agree}
              auth={auth}
              login={login}
            />
          </div>
          <Modal
            isOpen={isOpen}
            close={() => handleIsOpen(!isOpen)}
            hasClose={hasClose}
            closableOnClickOutside={closableOnClickOutside}
          >
            {feedback}
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  withRouter,
  withSubmit,
);

export default enhance(Step3);
