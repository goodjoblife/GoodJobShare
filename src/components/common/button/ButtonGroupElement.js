import React from 'react';
import PropTypes from 'prop-types';

import styles from './ButtonGroupElement.module.css';

const handleChecked = checked =>
  (checked ? styles.checked : styles.unchecked);

const handleLast = last =>
  (last ? styles.last : '');

class ButtonGroupElement extends React.PureComponent {
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
          className="pM"
          style={{
            color: 'inherit',
          }}
        >
          {label}
        </p>
      </div>
    );
  }
}


ButtonGroupElement.propTypes = {
  checked: PropTypes.bool,
  last: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default ButtonGroupElement;
