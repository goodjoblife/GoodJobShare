import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import Options from './Options';
import ActiveItem from './ActiveItem';

const CheckboxRatingTextAreaList = ({
  value: items,
  onChange,
  options,
  elseOptionValue,
}) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const activeOption = options[activeOptionIndex];

  const resetOptionValue = useCallback(() => setActiveOptionIndex(null), []);

  if (activeOption) {
    return <ActiveItem option={activeOption} onCancel={resetOptionValue} />;
  }

  const elseOptionIndex = options.findIndex(
    ({ value }) => value === elseOptionValue,
  );

  return (
    <Options
      onSelectIndex={setActiveOptionIndex}
      options={options}
      elseOptionIndex={elseOptionIndex}
    />
  );
};

const CheckboxRatingTextAreaValuePropType = withShape(PropTypes.array, {
  0: ValuePropType,
});

CheckboxRatingTextAreaList.propTypes = {
  value: PropTypes.arrayOf(CheckboxRatingTextAreaValuePropType).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType,
};

export default CheckboxRatingTextAreaList;
