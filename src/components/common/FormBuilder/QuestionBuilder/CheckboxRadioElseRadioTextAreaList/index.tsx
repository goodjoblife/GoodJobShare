import React, { useCallback, useState } from 'react';
import { usePrevious } from 'react-use';

import { Option, OptionValue } from '../Checkbox';
import ActiveItem from './ActiveItem';
import OptionPills from './OptionPills';

export type RadioElseRadioOption = Extract<Option, object> & {
  radioTitle: string;
  radioOptions: Option[];
  radioElseOptionValue: OptionValue;
  radioElseOptions: Option[];
  radioFooter?: React.ReactNode;
  textTitle: string;
  textRequired?: boolean;
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
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null,
  );
  const lastActiveOptionIndex = usePrevious(activeOptionIndex);

  const handleSelectOptionIndex = useCallback(
    (index: number | null): void => {
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
          updatedItems[activeItemIndex] = updatedItem as unknown[];
        } else {
          updatedItems.push(updatedItem as unknown[]);
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
    .filter((index): index is number => index !== null);

  return (
    <OptionPills
      options={options}
      selectedOptionIndices={selectedOptionIndices}
      onSelectOptionIndex={handleSelectOptionIndex}
      lastSelectedOptionIndex={
        lastActiveOptionIndex !== null ? lastActiveOptionIndex : undefined
      }
      warning={warning}
    />
  );
};

export default CheckboxRadioElseRadioTextAreaList;
