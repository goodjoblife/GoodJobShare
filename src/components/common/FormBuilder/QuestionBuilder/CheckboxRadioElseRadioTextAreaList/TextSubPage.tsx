import cn from 'classnames';
import React from 'react';

import { NavigatorButton } from 'common/FormBuilder/NavigatorBlock';

import styles from './styles.module.css';
import formStyles from '../../FormBuilder.module.css';

export type TextSubPageProps = {
  onBack: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
  placeholder?: string;
  title: string;
  value: string;
};

const TextSubPage = ({
  title,
  value,
  onChange,
  placeholder,
  onBack,
  onCancel,
  onSave,
}: TextSubPageProps): React.ReactElement => (
  <div className={styles.root}>
    <div className={styles.textTitle}>{title}</div>
    <div className={styles.textAreaContainer}>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
    <div className={cn(formStyles.navigationBar, styles.ctaButtons)}>
      <NavigatorButton onClick={onBack}>上一步</NavigatorButton>
      <NavigatorButton onClick={onCancel}>取消</NavigatorButton>
      <NavigatorButton onClick={onSave}>完成</NavigatorButton>
    </div>
  </div>
);

export default TextSubPage;
