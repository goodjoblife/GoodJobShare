import React, { PropTypes } from 'react';

import styles from './Button.module.css';

const Button = ({
  circleSize, btnStyle, disabled, children, onClick, style,
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
    case 'black2':
      cnBtnStyle = 'buttonBlack2';
      break;
    case 'gray':
      cnBtnStyle = 'buttonGray';
      break;
    case 'hoverYellow':
      cnBtnStyle = 'buttonHoverYellow';
      break;
    case 'whiteLine':
      cnBtnStyle = 'buttonWhiteLine';
      break;
    case 'blackLine':
      cnBtnStyle = 'buttonBlackLine';
      break;
    case 'grayLine':
      cnBtnStyle = 'buttonGrayLine';
      break;
    case 'submit':
      cnBtnStyle = 'buttonSubmit';
      break;
    case 'back':
      cnBtnStyle = 'formLabel';
      break;
    case 'page':
      cnBtnStyle = 'buttonPage';
      break;
    case 'firstPage':
      cnBtnStyle = 'buttonFirstPage';
      break;
    default:
      cnBtnStyle = '';
  }

  return (
    <button
      className={`${cnCircleSize} ${cnBtnStyle} ${styles.button}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
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
  style: PropTypes.object,
};

export default Button;
