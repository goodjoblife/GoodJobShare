import cn from 'classnames';
import React from 'react';

type ButtonProps = {
  circleSize?: 'lg' | 'md';
  btnStyle?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  circleSize,
  btnStyle,
  disabled,
  children,
  onClick,
  style,
  className,
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
    case 'lightGray':
      cnBtnStyle = 'buttonLightGray';
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
    case 'blue':
      cnBtnStyle = 'buttonBlue';
      break;
    case 'yellow':
      cnBtnStyle = 'buttonYellow';
      break;
    case 'hollowRed':
      cnBtnStyle = 'buttonHollowRed';
      break;
    case 'hollowBlack':
      cnBtnStyle = 'buttonHollowBlack';
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

export default Button;
