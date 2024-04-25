import React, { useCallback, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import Options from './Options';
import ActiveItem from './ActiveItem';

// Returns the array whose elements are the indices of the items that correspond to the options
const useExtendedOptionsAndItemIndices = ({
  items,
  options,
  elseOptionValue,
}) => {
  return useMemo(() => {
    const extendedOptions = [...options];

    // Remove the else option from the options
    let elseOption;
    let elseOptionIndex = extendedOptions.findIndex(
      ({ value }) => value === elseOptionValue,
    );
    if (elseOptionIndex >= 0)
      [elseOption] = extendedOptions.splice(elseOptionIndex, 1);

    // Get the indices of the items that correspond to the options
    const itemIndices = extendedOptions.map(({ value }) =>
      items.findIndex(([subject]) => subject === value),
    );

    // Add the subjects that are not in the options to the extended options
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const item = items[itemIndex];
      if (itemIndices.includes(itemIndex)) continue;

      // Add the subject to the extended options
      const [subject] = item;
      extendedOptions.push({ value: subject, label: subject });
      itemIndices.push(itemIndex);
    }

    // Add the else option back to the end of the options
    if (elseOption) {
      extendedOptions.push(elseOption);
      elseOptionIndex = extendedOptions.length - 1;
    }

    return { extendedOptions, itemIndices, elseOptionIndex };
  }, [elseOptionValue, items, options]);
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
  warning,
  setShowsNavigation,
  options,
  elseOptionValue,
  placeholder,
  ratingLabels,
  footnote,
}) => {
  const {
    extendedOptions,
    itemIndices,
    elseOptionIndex,
  } = useExtendedOptionsAndItemIndices({ items, options, elseOptionValue });

  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const activeOption = extendedOptions[activeOptionIndex];
  const resetOptionValue = useCallback(() => setActiveOptionIndex(null), []);

  useEffect(() => {
    setShowsNavigation(activeOptionIndex === null);
  }, [activeOptionIndex, setShowsNavigation]);

  const activeItemIndex = itemIndices[activeOptionIndex];
  const setActiveItem = useCallback(
    updatedItem => {
      const updatedItems = [...items];

      if (updatedItem) {
        if (activeItemIndex >= 0) {
          updatedItems[activeItemIndex] = updatedItem;
        } else {
          updatedItems.push(updatedItem);
        }
      } else {
        if (activeItemIndex >= 0) {
          updatedItems.splice(activeItemIndex, 1);
        }
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
    const isElseOption = activeOptionIndex === elseOptionIndex;
    return (
      <ActiveItem
        page={page}
        title={title}
        dataKey={dataKey}
        defaultValue={activeItem}
        option={activeOption}
        isElseOption={isElseOption}
        value={activeItem}
        onChange={setActiveItem}
        onCancel={resetOptionValue}
        placeholder={placeholder}
        ratingLabels={ratingLabels}
        footnote={footnote}
      />
    );
  }

  const selectedOptionIndices = extendedOptions
    .map((_, index) => (itemIndices[index] >= 0 ? index : null))
    .filter(index => index !== null);

  return (
    <Options
      selectedIndices={selectedOptionIndices}
      onSelectIndex={setActiveOptionIndex}
      options={extendedOptions}
      elseOptionIndex={elseOptionIndex}
      warning={warning}
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
  warning: PropTypes.string,
  setShowsNavigation: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType,
  placeholder: PropTypes.string,
  ratingLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  footnote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
};

export default CheckboxRatingTextAreaList;
