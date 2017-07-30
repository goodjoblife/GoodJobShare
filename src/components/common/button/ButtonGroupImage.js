import React from 'react';
import PropTypes from 'prop-types';

import {
  makeId,
} from 'utils/stringUtil';

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
    const { value, label, checked, last, icon } = this.props;
    const id = `${this.id}-${value}`;
    return (
      <label
        htmlFor={id}
        className={checked ? styles.checked : styles.unchecked}
        style={{
          marginRight: last ? null : '3px',
          marginBottom: '5px',
        }}
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
          className={checked ? styles.content__checked : styles.content__unchecked}
        >
          {icon}
          <p
            style={{
              color: checked ? 'white' : '#333333',
              marginTop: '12px',
            }}
            className="pM"
          >
            {label}
          </p>
        </span>
      </label>
    );
  }
}

ButtonGroupImageEle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number,
    ]
  ),
  label: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number,
    ]
  ),
  last: PropTypes.bool,
  icon: PropTypes.node,
};

const ButtonGroupImage = ({ value, options, onChange }) => (
  <div>
    {options.map((option, index, arr) => (
      <ButtonGroupImageEle
        key={option.value}
        label={option.label}
        value={option.value}
        onChange={onChange}
        checked={value === option.value}
        last={index === arr.length - 1}
        icon={option.icon}
      />
    ))}
  </div>
);

ButtonGroupImage.propTypes = {
  value: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number,
    ]
  ),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape(
    {
      value: PropTypes.oneOfType(
        [
          PropTypes.string,
          PropTypes.number,
        ]
      ),
      label: PropTypes.oneOfType(
        [
          PropTypes.string,
          PropTypes.number,
        ]
      ),
      icon: PropTypes.node,
    }
  )),
};

export default ButtonGroupImage;
