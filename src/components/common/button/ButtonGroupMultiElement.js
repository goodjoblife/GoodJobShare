import React, { PropTypes } from 'react';

import styles from './ButtonGroupMultiElement.module.css';

const handleChecked = checked =>
  (checked ? styles.checked : styles.unchecked);

const handleLast = last =>
  (last ? styles.last : '');

class ButtonGroupMultiElement extends React.PureComponent {
  render() {
    const {
      checked,
      label,
      onChange,
      last,
    } = this.props;
    return (
      <div
        className={
          `${handleChecked(checked)} ${handleLast(last)}`
        }
        onClick={onChange}
      >
        <p
          style={{
            color: 'inherit',
            fontSize: '15px',
          }}
        >
          {label}
        </p>
      </div>
    );
  }
}


ButtonGroupMultiElement.propTypes = {
  checked: PropTypes.bool,
  last: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default ButtonGroupMultiElement;
