import React from 'react';
import styles from './NetPromoter.module.css';
import laborImage from './laborImage.png'; // TEST

const NextButton = ({ handleNext, buttonText }) => (
  <div className={styles.nextStepContainer}>
    <img src={laborImage} alt="laborImage" />
    <button onClick={handleNext} className={styles.nextStep}>
      {buttonText}
    </button>
  </div>
);

export default NextButton;
