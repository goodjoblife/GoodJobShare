import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { NavigatorButton } from 'common/FormBuilder/NavigatorBlock';
import BlockSelect from '../Checkbox/private/BlockSelect';
import BlockSelectElseRadio from '../Checkbox/private/BlockSelectElseRadio';
import { normalizeOptions } from '../utils';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import Option from './Option';
import styles from './styles.module.css';
import formStyles from '../../FormBuilder.module.css';

const ActiveItem = ({
  dataKey,
  option: {
    value: optionValue,
    radioTitle,
    radioOptions: rawRadioOptions,
    elseOptionValue,
    elseOptions: rawElseOptions,
    radioFooter,
    textTitle,
    textPlaceholder,
    hasText,
  },
  defaultValue,
  onChange,
  onCancel,
}): React.ReactElement => {
  const radioOptions = normalizeOptions(rawRadioOptions);
  const elseOptions = rawElseOptions ? normalizeOptions(rawElseOptions) : [];

  const [
    ,
    defaultRadioValue,
    defaultElseRadioValue,
    defaultTextValue,
  ] = defaultValue || [optionValue, null, null, ''];

  const [subPage, setSubPage] = useState('radio');
  const [radioValue, setRadioValue] = useState(defaultRadioValue);
  const [elseRadioValue, setElseRadioValue] = useState(defaultElseRadioValue);
  const [textValue, setTextValue] = useState(defaultTextValue);

  const isEditing = !!defaultValue;
  const currentItem = [optionValue, radioValue, elseRadioValue, textValue];
  const currentItemRef = useRef(currentItem);
  currentItemRef.current = currentItem;

  const radioAreaRef = useRef(null);
  useEffect(() => {
    if (radioValue === elseOptionValue && radioAreaRef.current) {
      radioAreaRef.current.scrollTo({
        top: radioAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [radioValue, elseOptionValue]);

  const handleRadioElseChange = useCallback(([main, elseVal]) => {
    setRadioValue(main);
    setElseRadioValue(elseVal);
  }, []);

  const handleConfirm = useCallback(() => {
    const item = currentItemRef.current;
    if (hasText(item)) {
      setSubPage('text');
    } else {
      onChange(item);
    }
  }, [hasText, onChange]);

  const onBack = useCallback(() => setSubPage('radio'), []);
  const onClear = useCallback(() => onChange(null), [onChange]);
  const onSave = useCallback(
    () => onChange([optionValue, radioValue, elseRadioValue, textValue]),
    [onChange, optionValue, radioValue, elseRadioValue, textValue],
  );

  if (subPage === 'text') {
    return (
      <div className={styles.root}>
        <div className={styles.textTitle}>{textTitle}</div>
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.textarea}
            value={textValue}
            onChange={(e): void => setTextValue(e.target.value)}
            placeholder={textPlaceholder}
          />
        </div>
        <div className={cn(formStyles.navigationBar, styles.ctaButtons)}>
          <NavigatorButton onClick={onBack}>上一步</NavigatorButton>
          <NavigatorButton onClick={onCancel}>取消</NavigatorButton>
          <NavigatorButton onClick={onSave}>完成</NavigatorButton>
        </div>
      </div>
    );
  }

  const goesToText = hasText(currentItem);

  return (
    <div className={styles.root}>
      <div className={styles.radioArea} ref={radioAreaRef}>
        <div className={styles.optionCell}>
          <Option selected>{optionValue}</Option>
        </div>
        <div className={styles.radioTitle}>{radioTitle}</div>
        {elseOptionValue ? (
          <BlockSelectElseRadio
            dataKey={dataKey}
            required
            value={[radioValue, elseRadioValue]}
            onChange={handleRadioElseChange}
            onConfirm={handleConfirm}
            options={radioOptions}
            elseOptionValue={elseOptionValue}
            elseOptions={elseOptions}
          />
        ) : (
          <BlockSelect
            dataKey={dataKey}
            required
            value={radioValue}
            onChange={setRadioValue}
            onConfirm={handleConfirm}
            options={radioOptions}
          />
        )}
      </div>
      {radioFooter && <div className={styles.radioFooter}>{radioFooter}</div>}
      <div className={cn(formStyles.navigationBar, styles.ctaButtons)}>
        <NavigatorButton
          style={{ visibility: isEditing ? 'visible' : 'hidden' }}
          onClick={onClear}
        >
          清除
        </NavigatorButton>
        <NavigatorButton onClick={onCancel}>取消</NavigatorButton>
        <NavigatorButton
          style={{ visibility: radioValue !== null ? 'visible' : 'hidden' }}
          onClick={handleConfirm}
        >
          {goesToText ? '繼續' : '儲存'}
        </NavigatorButton>
      </div>
    </div>
  );
};

ActiveItem.propTypes = {
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.array,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.shape({
    elseOptionValue: ValuePropType,
    elseOptions: PropTypes.arrayOf(OptionPropType),
    hasText: PropTypes.func.isRequired,
    radioFooter: PropTypes.node,
    radioOptions: PropTypes.arrayOf(OptionPropType).isRequired,
    radioTitle: PropTypes.string.isRequired,
    textPlaceholder: PropTypes.string,
    textTitle: PropTypes.string.isRequired,
    value: ValuePropType.isRequired,
  }).isRequired,
};

export default ActiveItem;
