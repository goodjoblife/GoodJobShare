import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { makeId } from 'utils/stringUtil';

import styles from './ButtonGroupImage.module.css';

class ButtonGroupImageEle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.id = makeId();
  }

  onChange(e) {
    const { onChange, checked } = this.props;

    if (checked) {
      return onChange(null);
    }
    return onChange(e.target.value);
  }

  render() {
    const { value, label, checked, last, icon, theme } = this.props;
    const id = `${this.id}-${value}`;
    return (
      <label
        htmlFor={id}
        className={cn(
          styles.radio,
          theme === 'yellow' ? styles.yellowTheme : styles.grayTheme,
          {
            [styles.checked]: checked,
            [styles.last]: last,
          },
        )}
      >
        <input
          id={id}
          type="radio"
          checked={checked}
          value={value}
          onChange={this.onChange}
          style={{
            display: 'none',
          }}
        />
        <span
          style={{
            display: 'inline-block',
            textAlign: 'center',
          }}
          className={
            checked ? styles.content__checked : styles.content__unchecked
          }
        >
          {icon}
          <p style={{ marginTop: '12px' }} className={cn('pM', styles.btnText)}>
            {label}
          </p>
        </span>
      </label>
    );
  }
}

ButtonGroupImageEle.propTypes = {
  checked: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  last: PropTypes.bool,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ButtonGroupImageEle.defaultProps = {
  theme: 'gray',
};

const ButtonGroupImage = ({
  value,
  options,
  onChange,
  className,
  theme = 'gray',
}) => (
  <div className={cn(styles.wrapper, className)}>
    {options.map((option, index, arr) => (
      <ButtonGroupImageEle
        key={option.value}
        label={option.label}
        value={option.value}
        onChange={onChange}
        checked={value === option.value}
        last={index === arr.length - 1}
        icon={option.icon}
        theme={theme}
      />
    ))}
  </div>
);

ButtonGroupImage.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  theme: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ButtonGroupImage.defaultProps = {
  className: '',
  theme: 'gray',
};

export default ButtonGroupImage;
