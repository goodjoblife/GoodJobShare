import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Button = ({
  circleSize, btnStyle, disabled, children, onClick, style, className,
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
      className={cn(cnCircleSize, cnBtnStyle, className)}
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
  className: PropTypes.string,
};

export default Button;
