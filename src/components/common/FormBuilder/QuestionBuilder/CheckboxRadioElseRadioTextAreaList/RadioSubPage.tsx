import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

import { NavigatorButton } from 'common/FormBuilder/NavigatorBlock';

import OptionPill from './OptionPill';
import styles from './styles.module.css';
import formStyles from '../../FormBuilder.module.css';
import { Option, OptionValue } from '../Checkbox';
import BlockSelectElseRadio from '../Checkbox/private/BlockSelectElseRadio';
import commonStyles from '../styles.module.css';

const useRefToScrollToElseOptions = (
  radioValue: OptionValue,
  elseOptionValue: OptionValue,
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
  optionValue: OptionValue;
  title: string;
  footer?: React.ReactNode;
  options: Option[];
  elseOptions: Option[];
  elseOptionValue: OptionValue;
  value: OptionValue;
  elseValue: OptionValue;
  hasClear: boolean;
  hasNext: boolean;
  onConfirm: () => void;
  onChange: (pair: unknown[]) => void;
  onCancel: () => void;
  onClear: () => void;
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
  hasClear,
  hasNext,
  onChange,
  onConfirm,
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
          <OptionPill selected>{optionValue}</OptionPill>
        </div>
        <div className={styles.radioTitle}>{title}</div>
        <BlockSelectElseRadio
          dataKey={dataKey}
          required
          value={[value, elseValue]}
          onChange={onChange}
          onConfirm={onConfirm}
          options={options}
          elseOptionValue={elseOptionValue}
          elseOptions={elseOptions}
        />
      </div>
      {footer && <div className={styles.radioFooter}>{footer}</div>}
      <div className={cn(formStyles.navigationBar, styles.ctaButtons)}>
        <NavigatorButton
          style={{ visibility: hasClear ? 'visible' : 'hidden' }}
          onClick={onClear}
        >
          清除
        </NavigatorButton>
        <NavigatorButton onClick={onCancel}>取消</NavigatorButton>
        <NavigatorButton
          style={{ visibility: canProceed ? 'visible' : 'hidden' }}
          onClick={onConfirm}
        >
          {hasNext ? '繼續' : '儲存'}
        </NavigatorButton>
      </div>
    </div>
  );
};

export default RadioSubPage;
