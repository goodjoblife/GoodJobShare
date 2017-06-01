import React from 'react';
import PropTypes from 'prop-types';

import {
  makeId,
} from 'utils/stringUtil';

import styles from './ButtonGroupImage.module.css';

class ButtonGroupImageEle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = makeId();
  }

  render() {
    const { value, label, onChange, checked } = this.props;
    const id = `${this.id}-${value}`;
    return (
      <label
        htmlFor={id}
        className={checked ? styles.checked : styles.unchecked}
      >
        <input
          id={id}
          type="radio"
          name={name}
          checked={checked}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            display: 'none',
          }}
        />
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        >
          <p
            style={{
              color: checked ? 'white' : '#333333',
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
    }
  )),
};

export default ButtonGroupImage;
