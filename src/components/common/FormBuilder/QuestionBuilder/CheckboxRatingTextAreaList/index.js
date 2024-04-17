import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import Options from './Options';

const CheckboxRatingTextAreaList = ({
  value: items,
  onChange,
  options,
  elseOptionValue,
}) => {
  const selectedOptionValues = items.map(([optionValue]) => optionValue);
  const onOptionValuesChange = useCallback(
    optionValues => {
      onChange(optionValues.map(optionValue => [optionValue]));
    },
    [onChange],
  );

  return (
    <Options
      value={selectedOptionValues}
      onChange={onOptionValuesChange}
      options={options}
      elseOptionValue={elseOptionValue}
    />
  );
};

CheckboxRatingTextAreaList.propTypes = {
  value: PropTypes.arrayOf(
    withShape(PropTypes.array, {
      0: ValuePropType,
    }),
  ).isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType,
};

export default CheckboxRatingTextAreaList;
