import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import Options from './Options';
import ActiveItem from './ActiveItem';

// Returns the array whose elements are the indices of the items that correspond to the options
const useItemIndices = ({ items, options }) => {
  return useMemo(() => {
    return options.map(({ value }) =>
      items.findIndex(([subject]) => subject === value),
    );
  }, [items, options]);
};

const CheckboxRatingTextAreaList = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value: items,
  onChange,
  options,
  elseOptionValue,
  ratingLabels,
  footnote,
}) => {
  const itemIndices = useItemIndices({ items, options });

  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const activeOption = options[activeOptionIndex];
  const resetOptionValue = useCallback(() => setActiveOptionIndex(null), []);

  const activeItemIndex = itemIndices[activeOptionIndex];
  const setActiveItem = useCallback(
    updatedItem => {
      const updatedItems = [...items];

      if (activeItemIndex >= 0) {
        updatedItems[activeItemIndex] = updatedItem;
      } else {
        updatedItems.push(updatedItem);
      }

      // Commit the changes
      onChange(updatedItems);

      // Reset the active option value
      setActiveOptionIndex(null);
    },
    [activeItemIndex, items, onChange],
  );

  if (activeOption) {
    const activeItem = items[activeItemIndex];
    return (
      <ActiveItem
        page={page}
        title={title}
        dataKey={dataKey}
        defaultValue={activeItem}
        option={activeOption}
        onChange={setActiveItem}
        onCancel={resetOptionValue}
        ratingLabels={ratingLabels}
        footnote={footnote}
      />
    );
  }

  const selectedOptionIndices = options
    .map((_, index) => (itemIndices[index] >= 0 ? index : null))
    .filter(index => index !== null);
  const elseOptionIndex = options.findIndex(
    ({ value }) => value === elseOptionValue,
  );

  return (
    <Options
      selectedIndices={selectedOptionIndices}
      onSelectIndex={setActiveOptionIndex}
      options={options}
      elseOptionIndex={elseOptionIndex}
    />
  );
};

const CheckboxRatingTextAreaValuePropType = withShape(PropTypes.array, {
  0: ValuePropType,
  1: PropTypes.number,
});

CheckboxRatingTextAreaList.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.arrayOf(CheckboxRatingTextAreaValuePropType)
    .isRequired,
  value: PropTypes.arrayOf(CheckboxRatingTextAreaValuePropType).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType,
  ratingLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  footnote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
};

export default CheckboxRatingTextAreaList;
