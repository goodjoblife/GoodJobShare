import React, { useCallback, useEffect, useRef, useState } from 'react';

import { normalizeOptions } from '../utils';
import { RadioElseRadioOption } from './index';
import TextSubPage from './TextSubPage';
import RadioSubPage from './RadioSubPage';

const useRefToScrollToElseOptions = (
  radioValue: string | number | null,
  elseOptionValue: string | number | undefined,
): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (radioValue === elseOptionValue && ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [radioValue, elseOptionValue]);
  return ref;
};

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
  const [radioValue, setRadioValue] = useState<string | number | null>(
    defaultRadioValue as string | number | null,
  );
  const [elseRadioValue, setElseRadioValue] = useState<string | number | null>(
    defaultElseRadioValue as string | number | null,
  );
  const [textValue, setTextValue] = useState<string>(
    (defaultTextValue as string) || '',
  );

  const isEditing = !!defaultValue;
  const currentItem = [optionValue, radioValue, elseRadioValue, textValue];
  const currentItemRef = useRef(currentItem);
  currentItemRef.current = currentItem;

  const radioAreaRef = useRefToScrollToElseOptions(radioValue, elseOptionValue);

  const handleRadioElseChange = useCallback((pair: unknown[]): void => {
    setRadioValue(pair[0] as string | number | null);
    setElseRadioValue(pair[1] as string | number | null);
  }, []);

  const handleConfirm = useCallback(() => {
    const item = currentItemRef.current;
    if (hasText(item)) {
      setSubPage(SubPage.Text);
    } else {
      onChange(item);
    }
  }, [hasText, onChange]);

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
          radioAreaRef={radioAreaRef}
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
