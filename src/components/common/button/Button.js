import React, { PropTypes } from 'react';

import ArrowLeft from '../../images/arrow-left.svg';

import styles from './Button.module.css';

const Button = ({
  circleSize, btnStyle, disabled, children, onClick,
}) => {
  let cnCircleSize = '';
  let cnBtnStyle;

  if (circleSize === 'lg') {
    cnCircleSize = 'buttonCircleL';
  } else if (circleSize === 'md') {
    cnCircleSize = 'buttonCircleM';
  }

  switch (btnStyle) {
    case 'black':
      cnBtnStyle = 'buttonBlack';
      break;
    case 'gray':
      cnBtnStyle = 'buttonGray';
      break;
    case 'hoverYellow':
      cnBtnStyle = 'buttonHoverYellow';
      break;
    case 'submit':
      cnBtnStyle = 'buttonSubmit';
      break;
    case 'back':
      cnBtnStyle = 'formLabel';
      break;
    default:
      cnBtnStyle = '';
  }

  return (
    <button
      className={`${cnCircleSize} ${cnBtnStyle} ${styles.button}`}
      disabled={disabled}
      onClick={onClick}
    >
      {btnStyle === 'back' && <ArrowLeft className={styles.arrowLeft} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  circleSize: PropTypes.string,
  btnStyle: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
