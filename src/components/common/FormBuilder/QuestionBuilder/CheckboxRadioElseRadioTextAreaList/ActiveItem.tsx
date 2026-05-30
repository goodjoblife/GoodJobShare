import React, { useCallback, useState } from 'react';

import { normalizeOptions } from '../utils';
import { RadioElseRadioOption } from './index';
import { RadioValue } from './types';
import TextSubPage from './TextSubPage';
import RadioSubPage from './RadioSubPage';

enum SubPage {
  Radio = 'radio',
  Text = 'text',
}

type Props = {
  dataKey: string;
  defaultValue?: unknown[];
  onCancel: () => void;
  onChange: (item: unknown[] | null) => void;
  option: RadioElseRadioOption;
};

const ActiveItem = ({
  dataKey,
  option: {
    value: optionValue,
    radioTitle,
    radioOptions: rawRadioOptions,
    elseOptionValue,
    elseOptions: rawElseOptions,
    radioFooter,
    textTitle: rawTextTitle,
    textRequired,
    textPlaceholder,
    hasText,
  },
  defaultValue,
  onChange,
  onCancel,
}: Props): React.ReactElement => {
  const radioOptions = normalizeOptions(rawRadioOptions);
  const elseOptions = rawElseOptions ? normalizeOptions(rawElseOptions) : [];
  const textTitle = textRequired ? rawTextTitle : `${rawTextTitle}（選填）`;

  const [
    ,
    defaultRadioValue,
    defaultElseRadioValue,
    defaultTextValue,
  ] = defaultValue || [optionValue, null, null, ''];

  const [subPage, setSubPage] = useState(SubPage.Radio);
  const [radioValue, setRadioValue] = useState<RadioValue>(
    defaultRadioValue as RadioValue,
  );
  const [elseRadioValue, setElseRadioValue] = useState<RadioValue>(
    defaultElseRadioValue as RadioValue,
  );
  const [textValue, setTextValue] = useState<string>(
    (defaultTextValue as string) || '',
  );

  const isEditing = !!defaultValue;
  const currentItem = [optionValue, radioValue, elseRadioValue, textValue];

  const handleRadioElseChange = useCallback((pair: unknown[]): void => {
    setRadioValue(pair[0] as RadioValue);
    setElseRadioValue(pair[1] as RadioValue);
  }, []);

  const handleConfirm = useCallback(() => {
    const item = [optionValue, radioValue, elseRadioValue, textValue];
    if (hasText(item)) {
      setSubPage(SubPage.Text);
    } else {
      onChange(item);
    }
  }, [hasText, onChange, optionValue, radioValue, elseRadioValue, textValue]);

  const onBack = useCallback(() => setSubPage(SubPage.Radio), []);
  const onClear = useCallback(() => onChange(null), [onChange]);
  const onSave = useCallback(
    () => onChange([optionValue, radioValue, elseRadioValue, textValue]),
    [onChange, optionValue, radioValue, elseRadioValue, textValue],
  );

  switch (subPage) {
    case SubPage.Text:
      return (
        <TextSubPage
          textTitle={textTitle}
          textValue={textValue}
          onTextChange={setTextValue}
          textPlaceholder={textPlaceholder}
          onBack={onBack}
          onCancel={onCancel}
          onSave={onSave}
        />
      );
    case SubPage.Radio:
      return (
        <RadioSubPage
          dataKey={dataKey}
          optionValue={optionValue}
          radioTitle={radioTitle}
          radioOptions={radioOptions}
          elseOptionValue={elseOptionValue}
          elseOptions={elseOptions}
          radioValue={radioValue}
          elseRadioValue={elseRadioValue}
          radioFooter={radioFooter}
          isEditing={isEditing}
          goesToText={hasText(currentItem)}
          handleRadioElseChange={handleRadioElseChange}
          handleConfirm={handleConfirm}
          setRadioValue={setRadioValue}
          onClear={onClear}
          onCancel={onCancel}
        />
      );
  }
};

export default ActiveItem;
