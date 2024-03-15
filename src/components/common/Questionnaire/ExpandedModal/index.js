import React, { Fragment, useCallback, useState } from 'react';
import styles from './NetPromoter.module.css';
import Question from './Question';
import NextButton from './NextButton';
import questionList from '../questionList';
import AppreciationContent from './AppreciationContent';
import { postUserFeedback } from 'actions/userFeedback';
import { connect } from 'react-redux';

const ExpandedModal = ({ handleToggleModalOpen, postUserFeedback }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questionList[questionIndex] || {};
  const { title, titleExplanation, section } = question;
  const isLastQuestion = questionIndex === questionList.length - 1;
  const isCompletedQuestion = questionIndex > questionList.length - 1;

  const handleRecordFeedback = () => {};

  const handleNextStep = () => {
    setQuestionIndex(prev => prev + 1);
  };

  const handleSubmit = () => {
    console.log('handleSubmit');

    postUserFeedback({ npsScore: 10, content: 'test' });
  };

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      handleSubmit();
    }
    handleNextStep();
  }, [handleSubmit, isLastQuestion]);

  const buttonText = isLastQuestion ? '送出' : '下一步';

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button
          className={styles.closeButton}
          onClick={handleToggleModalOpen}
        ></button>
        {isCompletedQuestion ? (
          <AppreciationContent />
        ) : (
          <Fragment>
            <Question
              title={title}
              titleExplanation={titleExplanation}
              section={section}
              handleRecordFeedback={handleRecordFeedback}
            />
            <NextButton handleNext={handleNext} buttonText={buttonText} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  postUserFeedback,
};

const hoc = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default hoc(ExpandedModal);
