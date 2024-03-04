import React, { useCallback } from 'react';
import styles from './NetPromoter.module.css';
import laborImage from './laborImage.png';

export const NextStepButton = ({ handleNext, isLastQuestion }) => {
  const buttonText = isLastQuestion ? '送出' : '下一步';

  const handleSubmit = useCallback(() => {
    console.log('handleSubmit');
  }, []);
  const handleNextQuestion = useCallback(() => {
    if (isLastQuestion) {
      handleSubmit();
    }
    handleNext();
  }, [handleNext, isLastQuestion, handleSubmit]);

  return (
    <div className={styles.nextStepContainer}>
      <img src={laborImage} alt="laborImage" />
      <button onClick={handleNextQuestion} className={styles.nextStep}>
        {buttonText}
      </button>
    </div>
  );
};
