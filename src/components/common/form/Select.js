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
          value={this.props.value === null ? '' : this.props.value}
          onChange={e => this.props.onChange(e)}
        >
          {this.props.hasNullOption && (
            <option value={''}>{this.props.nullOptionText}</option>
          )}
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
  hasNullOption: PropTypes.bool,
  nullOptionText: PropTypes.string,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  hasNullOption: true,
  nullOptionText: '- 請選擇 -',
};

export default Select;
