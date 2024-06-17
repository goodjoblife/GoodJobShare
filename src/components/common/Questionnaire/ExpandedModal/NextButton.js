import React from 'react';
import PropTypes from 'prop-types';
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

NextButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
};

export default NextButton;
