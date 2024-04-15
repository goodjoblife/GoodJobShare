import React from 'react';
import styles from './ExpandedModal.module.css';
import laborImage from './laborImage.png';
import cn from 'classnames';

const NextButton = ({ handleNext, buttonText, isEnabled }) => (
  <div className={styles.nextStepButtonContainer}>
    <img src={laborImage} alt="laborImage" />
    <button
      onClick={handleNext}
      className={cn(styles.nextStepButton, { [styles.enabled]: isEnabled })}
      disabled={!isEnabled}
    >
      {buttonText}
    </button>
  </div>
);

export default NextButton;
