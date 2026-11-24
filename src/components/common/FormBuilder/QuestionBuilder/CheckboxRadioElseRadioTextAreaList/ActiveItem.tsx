import React, { Fragment, useCallback, useState } from 'react';

import { normalizeOptions } from '../utils';
import { RadioElseRadioOption } from './index';
import { OptionValue } from '../Checkbox';
import DiscardConfirmModal, { DiscardAction } from './DiscardConfirmModal';
import RadioSubPage from './RadioSubPage';
import TextSubPage from './TextSubPage';

enum SubPage {
  RADIO = 'radio',
  TEXT = 'text',
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
    radioElseOptions: rawRadioElseOptions,
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
  const radioElseOptions = rawRadioElseOptions
    ? normalizeOptions(rawRadioElseOptions)
    : [];
  const textTitle = textRequired ? rawTextTitle : `${rawTextTitle}（選填）`;

  const [
    ,
    defaultOptionValue,
    defaultElseOptionValue,
    defaultTextValue,
  ] = defaultValue || [optionValue, null, null, ''];

  const [subPage, setSubPage] = useState(SubPage.RADIO);
  const [radioValue, setOptionValue] = useState<OptionValue>(
    defaultOptionValue as OptionValue,
  );
  const [elseOptionValue, setElseOptionValue] = useState<OptionValue>(
    defaultElseOptionValue as OptionValue,
  );
  const [textValue, setTextValue] = useState<string>(
    (defaultTextValue as string) || '',
  );
  const [discardAction, setDiscardAction] = useState<DiscardAction | null>(
    null,
  );

  const isEditing = !!defaultValue;
  const currentItem = [optionValue, radioValue, elseOptionValue, textValue];
  const hasNext = hasText(currentItem);
  const isDirty =
    radioValue !== defaultOptionValue ||
    elseOptionValue !== defaultElseOptionValue ||
    textValue !== ((defaultTextValue as string) || '');

  const handleRadioElseChange = useCallback((pair: unknown[]): void => {
    setOptionValue(pair[0] as OptionValue);
    setElseOptionValue(pair[1] as OptionValue);
  }, []);

  const handleConfirmRadio = useCallback(() => {
    // 選完選項的自動確認是延遲觸發的，確認視窗開著時不該讓它存檔
    if (discardAction) return;
    if (hasNext) {
      setSubPage(SubPage.TEXT);
    } else {
      onChange(currentItem);
    }
  }, [discardAction, onChange, hasNext, currentItem]);

  const onBackToRadio = useCallback(() => setSubPage(SubPage.RADIO), []);
  const onClear = useCallback(() => setDiscardAction(DiscardAction.CLEAR), []);
  const handleCancel = useCallback(() => {
    if (isDirty) {
      setDiscardAction(DiscardAction.CANCEL);
    } else {
      onCancel();
    }
  }, [isDirty, onCancel]);
  const dismissDiscard = useCallback(() => setDiscardAction(null), []);
  const confirmDiscard = useCallback(
    (action: DiscardAction) => {
      setDiscardAction(null);
      switch (action) {
        case DiscardAction.CLEAR:
          return onChange(null);
        case DiscardAction.CANCEL:
          return onCancel();
      }
    },
    [onCancel, onChange],
  );
  const onSave = useCallback(
    () => onChange([optionValue, radioValue, elseOptionValue, textValue]),
    [onChange, optionValue, radioValue, elseOptionValue, textValue],
  );

  const renderSubPage = (): React.ReactElement => {
    switch (subPage) {
      case SubPage.RADIO:
        return (
          <RadioSubPage
            dataKey={dataKey}
            optionValue={optionValue}
            title={radioTitle}
            options={radioOptions}
            elseOptionValue={radioElseOptionValue}
            elseOptions={radioElseOptions}
            value={radioValue}
            elseValue={elseOptionValue}
            footer={radioFooter}
            hasClear={isEditing}
            hasNext={hasNext}
            onChange={handleRadioElseChange}
            onConfirm={handleConfirmRadio}
            onClear={onClear}
            onCancel={handleCancel}
          />
        );
      case SubPage.TEXT:
        return (
          <TextSubPage
            title={textTitle}
            value={textValue}
            onChange={setTextValue}
            placeholder={textPlaceholder}
            onBack={onBackToRadio}
            onCancel={handleCancel}
            onSave={onSave}
          />
        );
    }
  };

  return (
    <Fragment>
      {renderSubPage()}
      {discardAction && (
        <DiscardConfirmModal
          action={discardAction}
          onConfirm={(): void => confirmDiscard(discardAction)}
          onDismiss={dismissDiscard}
        />
      )}
    </Fragment>
  );
};

export default ActiveItem;
