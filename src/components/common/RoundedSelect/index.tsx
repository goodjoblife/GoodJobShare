import React, { useCallback, ReactNode, ChangeEvent, ElementType } from 'react';
import cn from 'classnames';

import styles from './RoundedSelect.module.css';
import Caret from 'common/icons/Caret';

type RoundedSelectProps = {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  Icon?: ElementType<{ className?: string }>;
};

const RoundedSelect: React.FC<RoundedSelectProps> = ({
  value,
  Icon,
  onChange,
  children,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  return (
    <div className={cn(styles.sorter, { [styles.hasLeadingIcon]: !!Icon })}>
      {Icon && <Icon className={styles.leadingIcon} />}
      <select onChange={handleChange} value={value}>
        {children}
      </select>
      <Caret className={styles.caret} />
    </div>
  );
};

export default RoundedSelect;
