import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { NavigatorButton } from 'common/FormBuilder/NavigatorBlock';
import BlockSelect from '../Checkbox/private/BlockSelect';
import BlockSelectElseRadio from '../Checkbox/private/BlockSelectElseRadio';
import Option from './Option';
import styles from './styles.module.css';
import { OptionValue } from '../Checkbox';
import commonStyles from '../styles.module.css';
import formStyles from '../../FormBuilder.module.css';

const useRefToScrollToElseOptions = (
  radioValue: OptionValue,
  elseOptionValue: string | number | undefined,
): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);
  const prevOptionValue = useRef<OptionValue>(radioValue);

  useEffect(() => {
    if (radioValue === elseOptionValue && ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior:
          prevOptionValue.current === elseOptionValue ? 'instant' : 'smooth',
      });
    }
    prevOptionValue.current = radioValue;
  }, [radioValue, elseOptionValue]);
  return ref;
};

export type RadioSubPageProps = {
  dataKey: string;
  elseOptions: unknown[];
  elseOptionValue?: string | number;
  elseValue: OptionValue;
  hasNext: boolean;
  handleConfirm: () => void;
  handleElseChange: (pair: unknown[]) => void;
  canDelete: boolean;
  onCancel: () => void;
  onClear: () => void;
  optionValue: string | number;
  footer?: React.ReactNode;
  options: unknown[];
  title: string;
  value: OptionValue;
  setValue: (value: OptionValue) => void;
};

const RadioSubPage = ({
  dataKey,
  optionValue,
  title,
  options,
  elseOptionValue,
  elseOptions,
  value,
  elseValue,
  footer,
  canDelete,
  hasNext,
  handleElseChange,
  handleConfirm,
  setValue,
  onClear,
  onCancel,
}: RadioSubPageProps): React.ReactElement => {
  const radioAreaRef = useRefToScrollToElseOptions(value, elseOptionValue);
  const canProceed =
    value !== null && (value !== elseOptionValue || elseValue !== null);

  return (
    <div className={styles.root}>
      <div
        className={cn(styles.radioArea, commonStyles.warnableContainer)}
        ref={radioAreaRef}
      >
        <div className={styles.optionCell}>
          <Option selected>{optionValue}</Option>
        </div>
        <div className={styles.radioTitle}>{title}</div>
        {elseOptionValue ? (
          <BlockSelectElseRadio
            dataKey={dataKey}
            required
            value={[value, elseValue]}
            onChange={handleElseChange}
            onConfirm={handleConfirm}
            options={options}
            elseOptionValue={elseOptionValue}
            elseOptions={elseOptions}
          />
        ) : (
          <BlockSelect
            dataKey={dataKey}
            required
            value={value}
            onChange={setValue}
            onConfirm={handleConfirm}
            options={options}
          />
        )}
      </div>
      {footer && <div className={styles.radioFooter}>{footer}</div>}
      <div className={cn(formStyles.navigationBar, styles.ctaButtons)}>
        <NavigatorButton
          style={{ visibility: canDelete ? 'visible' : 'hidden' }}
          onClick={onClear}
        >
          清除
        </NavigatorButton>
        <NavigatorButton onClick={onCancel}>取消</NavigatorButton>
        <NavigatorButton
          style={{ visibility: canProceed ? 'visible' : 'hidden' }}
          onClick={handleConfirm}
        >
          {hasNext ? '繼續' : '儲存'}
        </NavigatorButton>
      </div>
    </div>
  );
};

export default RadioSubPage;
