import React from 'react';
import styles from './ExpandedModal.module.css';
import laborImage from './laborImage.png';

const NextButton = ({ handleNext, buttonText, isEnabled }) => (
  <div className={styles.nextStepButtonContainer}>
    <img src={laborImage} alt="laborImage" />
    <button
      onClick={handleNext}
      className={styles.nextStepButton}
      disabled={!isEnabled}
    >
      {buttonText}
    </button>
  </div>
);

export default NextButton;
