import React from 'react';
import PropTypes from 'prop-types';

import {
  makeId,
} from 'utils/stringUtil';

import styles from './RadioDefault.module.css';

class RadioDefault extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = makeId();
  }
  render() {
    const {
      label,
      value,
      checked,
      onChange,
      name,
    } = this.props;

    const id = `${this.id}-${value}`;

    return (
      <label
        htmlFor={id}
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
          className={checked ? styles.checked : styles.unchecked}
        />
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            marginLeft: '6.5px',
          }}
        >
          <p
            style={{
              color: '#333333',
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

RadioDefault.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default RadioDefault;
