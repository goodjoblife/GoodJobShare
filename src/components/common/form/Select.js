import React, { PropTypes } from 'react';

import styles from './Select.module.css';

class Select extends React.PureComponent {
  render() {
    return (
      <div>
        <select
          className={styles.select}
          value={this.props.value || 'default'}
          onChange={e => this.props.onChange(e.target.value)}
        >
          <option value="default" disabled>{this.props.placeholder}</option>
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
