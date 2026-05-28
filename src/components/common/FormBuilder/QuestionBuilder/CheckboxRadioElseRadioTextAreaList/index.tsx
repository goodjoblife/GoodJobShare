import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from 'react-use';

import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import Options from './Options';
import ActiveItem from './ActiveItem';

const CheckboxRadioElseRadioTextAreaList = ({
  page,
  title,
  dataKey,
  value: items,
  onChange,
  warning,
  setShowsNavigation,
  options,
}): React.ReactElement => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const lastActiveOptionIndex = usePrevious(activeOptionIndex);

  const handleSelectOptionIndex = useCallback(
    index => {
      setActiveOptionIndex(index);
      setShowsNavigation(index === null);
    },
    [setShowsNavigation],
  );

  const resetActiveOptionIndex = useCallback(
    () => handleSelectOptionIndex(null),
    [handleSelectOptionIndex],
  );

  if (activeOptionIndex !== null) {
    const activeOption = options[activeOptionIndex];
    const activeItemIndex = items.findIndex(([v]) => v === activeOption.value);
    const activeItem =
      activeItemIndex >= 0 ? items[activeItemIndex] : undefined;

    const setActiveItem = (updatedItem: unknown): void => {
      const updatedItems = [...items];
      if (updatedItem) {
        if (activeItemIndex >= 0) {
          updatedItems[activeItemIndex] = updatedItem;
        } else {
          updatedItems.push(updatedItem);
        }
      } else if (activeItemIndex >= 0) {
        updatedItems.splice(activeItemIndex, 1);
      }
      onChange(updatedItems);
      resetActiveOptionIndex();
    };

    return (
      <ActiveItem
        page={page}
        title={title}
        dataKey={dataKey}
        option={activeOption}
        defaultValue={activeItem}
        onChange={setActiveItem}
        onCancel={resetActiveOptionIndex}
      />
    );
  }

  const selectedOptionIndices = options
    .map((option, index) =>
      items.findIndex(([v]) => v === option.value) >= 0 ? index : null,
    )
    .filter(index => index !== null);

  return (
    <Options
      options={options}
      selectedOptionIndices={selectedOptionIndices}
      onSelectOptionIndex={handleSelectOptionIndex}
      lastSelectedOptionIndex={lastActiveOptionIndex}
      warning={warning}
    />
  );
};

CheckboxRadioElseRadioTextAreaList.propTypes = {
  dataKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      elseOptionValue: ValuePropType,
      elseOptions: PropTypes.arrayOf(OptionPropType),
      hasText: PropTypes.func.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      radioFooter: PropTypes.node,
      radioOptions: PropTypes.arrayOf(OptionPropType).isRequired,
      radioTitle: PropTypes.string.isRequired,
      textPlaceholder: PropTypes.string,
      textTitle: PropTypes.string.isRequired,
      value: ValuePropType.isRequired,
    }),
  ).isRequired,
  page: PropTypes.number.isRequired,
  setShowsNavigation: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.arrayOf(PropTypes.array).isRequired,
  warning: PropTypes.string,
};

export default CheckboxRadioElseRadioTextAreaList;
