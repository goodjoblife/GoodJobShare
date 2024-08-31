import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import Options from './Options';
import ActiveItem from './ActiveItem';
import { usePrevious } from 'react-use';

// This hook extends the options with the subjects that are not in the options
// and returns the indices of the items that correspond to the options
const useExtendedOptionsAndItemIndices = ({
  items,
  baseOptions,
  elseOptionValue,
}) => {
  return useMemo(() => {
    const extendedOptions = [...baseOptions];

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
  }, [baseOptions, elseOptionValue, items]);
};

const useActiveOptionIndex = ({ setShowsNavigation }) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const handleSelectOptionIndex = useCallback(
    index => {
      setActiveOptionIndex(index);
      setShowsNavigation(index === null);
    },
    [setShowsNavigation],
  );
  return [activeOptionIndex, handleSelectOptionIndex];
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
  validateOrWarnItem,
  options: baseOptions,
  elseOptionValue,
  placeholder,
  ratingLabels,
  footnote,
}) => {
  const {
    extendedOptions,
    itemIndices,
    elseOptionIndex,
  } = useExtendedOptionsAndItemIndices({ items, baseOptions, elseOptionValue });

  const [activeOptionIndex, setActiveOptionIndex] = useActiveOptionIndex({
    setShowsNavigation,
  });
  const lastActiveOptionIndex = usePrevious(activeOptionIndex);
  const activeOption = extendedOptions[activeOptionIndex];
  const resetActiveOptionIndex = useCallback(() => setActiveOptionIndex(null), [
    setActiveOptionIndex,
  ]);

  const activeItemIndex = itemIndices[activeOptionIndex];
  const setActiveItem = useCallback(
    updatedItem => {
      const updatedItems = [...items];

      if (updatedItem) {
        if (activeItemIndex >= 0) {
          // Update the existing item
          updatedItems[activeItemIndex] = updatedItem;
        } else {
          // Add the new item
          updatedItems.push(updatedItem);
        }
      } else {
        if (activeItemIndex >= 0) {
          // Remove the existing item
          updatedItems.splice(activeItemIndex, 1);
        }
      }

      // Commit the changes
      onChange(updatedItems);

      // Reset the active option
      resetActiveOptionIndex();
    },
    [activeItemIndex, items, onChange, resetActiveOptionIndex],
  );

  if (activeOption) {
    // Show the active item
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
        onCancel={resetActiveOptionIndex}
        validateOrWarnItem={validateOrWarnItem}
        placeholder={placeholder}
        ratingLabels={ratingLabels}
        footnote={footnote}
      />
    );
  }

  // Show the options
  const selectedOptionIndices = extendedOptions
    .map((_, index) => (itemIndices[index] >= 0 ? index : null))
    .filter(index => index !== null);

  return (
    <Options
      options={extendedOptions}
      selectedOptionIndices={selectedOptionIndices}
      onSelectOptionIndex={setActiveOptionIndex}
      elseOptionIndex={elseOptionIndex}
      lastSelectedOptionIndex={lastActiveOptionIndex}
      warning={warning}
    />
  );
};

const CheckboxRatingTextAreaValuePropType = withShape(PropTypes.array, {
  0: ValuePropType,
  1: PropTypes.number,
});

CheckboxRatingTextAreaList.propTypes = {
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.arrayOf(CheckboxRatingTextAreaValuePropType)
    .isRequired,
  description: PropTypes.string,
  elseOptionValue: ValuePropType,
  footnote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  page: PropTypes.number.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  ratingLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
  setShowsNavigation: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  validateOrWarnItem: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(CheckboxRatingTextAreaValuePropType).isRequired,
  warning: PropTypes.string,
};

export default CheckboxRatingTextAreaList;
