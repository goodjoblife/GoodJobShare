import cn from 'classnames';
import { LocationDescriptor } from 'history';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type ButtonProps = {
  circleSize?: 'lg' | 'md';
  btnStyle?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
  className?: string;
  /** 有 to 代表 href 用途，渲染成按鈕 */
  to?: LocationDescriptor;
};

const Button: React.FC<ButtonProps> = ({
  circleSize,
  btnStyle,
  disabled,
  children,
  onClick,
  style,
  className,
  to,
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

  if (to) {
    return (
      <Link
        className={cn(cnCircleSize, cnBtnStyle, className)}
        to={to}
        onClick={onClick}
        style={style}
      >
        {/* react-router-dom 的型別依賴另一份 @types/react，ReactNode 不互通，故轉型 */}
        {children as LinkProps['children']}
      </Link>
    );
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
