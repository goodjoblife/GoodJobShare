import React, { useCallback, useState } from 'react';
import { usePrevious } from 'react-use';

import Options from './Options';
import ActiveItem from './ActiveItem';

type OptionShape =
  | string
  | number
  | { label: React.ReactNode; value: string | number };

export type RadioElseRadioOption = {
  label: React.ReactNode;
  value: string | number;
  radioTitle: string;
  radioOptions: OptionShape[];
  elseOptionValue?: string | number;
  elseOptions?: OptionShape[];
  radioFooter?: React.ReactNode;
  textTitle: string;
  textPlaceholder?: string;
  hasText: (item: unknown[]) => boolean;
};

type Props = {
  dataKey: string;
  onChange: (items: unknown[][]) => void;
  options: RadioElseRadioOption[];
  setShowsNavigation: (shows: boolean) => void;
  value: unknown[][];
  warning?: string;
};

const CheckboxRadioElseRadioTextAreaList = ({
  dataKey,
  value: items,
  onChange,
  warning,
  setShowsNavigation,
  options,
}: Props): React.ReactElement => {
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

export default CheckboxRadioElseRadioTextAreaList;
