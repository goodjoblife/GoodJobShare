import React, { useCallback, useState } from 'react';

import { normalizeOptions } from '../utils';
import { RadioElseRadioOption } from './index';
import { OptionValue } from '../Checkbox/types';
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
    radioElseOptionValue,
    radioElseOptions: rawElseOptions,
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
    defaultOptionValue,
    defaultElseOptionValue,
    defaultTextValue,
  ] = defaultValue || [optionValue, null, null, ''];

  const [subPage, setSubPage] = useState(SubPage.Radio);
  const [radioValue, setOptionValue] = useState<OptionValue>(
    defaultOptionValue as OptionValue,
  );
  const [elseOptionValue, setElseOptionValue] = useState<OptionValue>(
    defaultElseOptionValue as OptionValue,
  );
  const [textValue, setTextValue] = useState<string>(
    (defaultTextValue as string) || '',
  );

  const isEditing = !!defaultValue;
  const currentItem = [optionValue, radioValue, elseOptionValue, textValue];

  const handleRadioElseChange = useCallback((pair: unknown[]): void => {
    setOptionValue(pair[0] as OptionValue);
    setElseOptionValue(pair[1] as OptionValue);
  }, []);

  const handleConfirmRadio = useCallback(() => {
    const item = [optionValue, radioValue, elseOptionValue, textValue];
    if (hasText(item)) {
      setSubPage(SubPage.Text);
    } else {
      onChange(item);
    }
  }, [hasText, onChange, optionValue, radioValue, elseOptionValue, textValue]);

  const onBackToRadio = useCallback(() => setSubPage(SubPage.Radio), []);
  const onClear = useCallback(() => onChange(null), [onChange]);
  const onSave = useCallback(
    () => onChange([optionValue, radioValue, elseOptionValue, textValue]),
    [onChange, optionValue, radioValue, elseOptionValue, textValue],
  );

  switch (subPage) {
    case SubPage.Radio:
      return (
        <RadioSubPage
          dataKey={dataKey}
          optionValue={optionValue}
          title={radioTitle}
          options={radioOptions}
          elseOptionValue={radioElseOptionValue}
          elseOptions={elseOptions}
          value={radioValue}
          elseValue={elseOptionValue}
          footer={radioFooter}
          canDelete={isEditing}
          hasNext={hasText(currentItem)}
          handleElseChange={handleRadioElseChange}
          handleConfirm={handleConfirmRadio}
          setValue={setOptionValue}
          onClear={onClear}
          onCancel={onCancel}
        />
      );
    case SubPage.Text:
      return (
        <TextSubPage
          title={textTitle}
          value={textValue}
          onChange={setTextValue}
          placeholder={textPlaceholder}
          onBack={onBackToRadio}
          onCancel={onCancel}
          onSave={onSave}
        />
      );
  }
};

export default ActiveItem;
