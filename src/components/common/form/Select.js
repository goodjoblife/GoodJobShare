import React, { PropTypes } from 'react';

import styles from './Select.module.css';

class Select extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <select
          className={styles.select}
          value={this.props.value === null ? undefined : this.props.value}
          onChange={e => this.props.onChange(e)}
        >
          <option value={undefined}>{this.props.placeholder}</option>
          {
            this.props.options.map(option =>
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          }
        </select>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '15px',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '5px 4.5px 0 4.5px',
            borderColor: 'black transparent transparent transparent',
          }}
        />
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

Select.defaultProps = {
  placeholder: '- 請選擇 -',
};

export default Select;
