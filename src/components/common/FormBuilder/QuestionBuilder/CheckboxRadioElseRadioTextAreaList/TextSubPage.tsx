import React from 'react';
import cn from 'classnames';

import { NavigatorButton } from 'common/FormBuilder/NavigatorBlock';
import styles from './styles.module.css';
import formStyles from '../../FormBuilder.module.css';

export type TextSubPageProps = {
  onBack: () => void;
  onCancel: () => void;
  onSave: () => void;
  onTextChange: (value: string) => void;
  textPlaceholder?: string;
  textTitle: string;
  textValue: string;
};

const TextSubPage = ({
  textTitle,
  textValue,
  onTextChange,
  textPlaceholder,
  onBack,
  onCancel,
  onSave,
}: TextSubPageProps): React.ReactElement => (
  <div className={styles.root}>
    <div className={styles.textTitle}>{textTitle}</div>
    <div className={styles.textAreaContainer}>
      <textarea
        className={styles.textarea}
        value={textValue}
        onChange={(e): void => onTextChange(e.target.value)}
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

export default TextSubPage;
