import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroupElement from './ButtonGroupElement';
import ButtonGroupMultiElement from './ButtonGroupMultiElement';

const handleMultiSelect = values => value => {
  if (values.includes(value)) {
    return values.filter(v => v !== value);
  }

  return [...values, value];
};

class ButtonGroup extends React.PureComponent {
  render() {
    const { options, value, onChange } = this.props;
    return (
      <div>
        {Array.isArray(value) ? (
          <div>
            {options.map((ele, index) => (
              <ButtonGroupMultiElement
                key={ele.value}
                value={ele.value}
                checked={value.includes(ele.value)}
                label={ele.label}
                onChange={() => onChange(handleMultiSelect(value)(ele.value))}
                last={options.length === index + 1}
              />
            ))}
          </div>
        ) : (
          <div>
            {options.map((ele, index) => (
              <ButtonGroupElement
                key={ele.value}
                value={ele.value}
                checked={ele.value === value}
                label={ele.label}
                onChange={() => onChange(ele.value)}
                last={options.length === index + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
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
