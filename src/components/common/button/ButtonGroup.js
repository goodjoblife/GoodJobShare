import React, { PropTypes } from 'react';

import ButtonGroupElement from './ButtonGroupElement';

// import styles from './ButtonGroup.module.css';

class ButtonGroup extends React.PureComponent {
  render() {
    return (
      <div>
        {
          this.props.options.map((ele, index, options) => (
            <ButtonGroupElement
              key={ele.value}
              value={ele.value}
              checked={ele.value === this.props.value}
              label={ele.label}
              onChange={() => this.props.onChange(ele.value)}
              last={options.length === index + 1}
            />
          ))
        }
      </div>
    );
  }
}

ButtonGroup.propTypes = {
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

ButtonGroup.defaultProps = {
  options: [
    {
      label: '',
      value: 0,
    },
  ],
};

export default ButtonGroup;
