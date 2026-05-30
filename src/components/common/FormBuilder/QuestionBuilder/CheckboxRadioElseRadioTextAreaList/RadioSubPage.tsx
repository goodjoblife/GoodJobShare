import React from 'react';
import cn from 'classnames';

import { NavigatorButton as NavigatorButtonImpl } from 'common/FormBuilder/NavigatorBlock';
import BlockSelect from '../Checkbox/private/BlockSelect';
import BlockSelectElseRadio from '../Checkbox/private/BlockSelectElseRadio';
import Option from './Option';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
import formStyles from '../../FormBuilder.module.css';

type NavButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};
const NavigatorButton = NavigatorButtonImpl as React.FC<NavButtonProps>;

export type RadioSubPageProps = {
  dataKey: string;
  elseOptions: unknown[];
  elseOptionValue?: string | number;
  elseRadioValue: string | number | null;
  goesToText: boolean;
  handleConfirm: () => void;
  handleRadioElseChange: (pair: unknown[]) => void;
  isEditing: boolean;
  onCancel: () => void;
  onClear: () => void;
  optionValue: string | number;
  radioAreaRef: React.RefObject<HTMLDivElement | null>;
  radioFooter?: React.ReactNode;
  radioOptions: unknown[];
  radioTitle: string;
  radioValue: string | number | null;
  setRadioValue: (value: string | number | null) => void;
};

const RadioSubPage = ({
  dataKey,
  optionValue,
  radioTitle,
  radioOptions,
  elseOptionValue,
  elseOptions,
  radioValue,
  elseRadioValue,
  radioFooter,
  isEditing,
  goesToText,
  radioAreaRef,
  handleRadioElseChange,
  handleConfirm,
  setRadioValue,
  onClear,
  onCancel,
}: RadioSubPageProps): React.ReactElement => {
  const canProceed =
    radioValue !== null &&
    (radioValue !== elseOptionValue || elseRadioValue !== null);

  return (
    <div className={styles.root}>
      <div
        className={cn(styles.radioArea, commonStyles.warnableContainer)}
        ref={radioAreaRef}
      >
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
          style={{ visibility: canProceed ? 'visible' : 'hidden' }}
          onClick={handleConfirm}
        >
          {goesToText ? '繼續' : '儲存'}
        </NavigatorButton>
      </div>
    </div>
  );
};

export default RadioSubPage;
