import React, { useEffect, useState } from 'react';

import { GENDER_OPTIONS } from 'constants/gender';
import { EXPERIENCE_OPTIONS } from 'constants/salaryFilter';

import DataTimeFilterRow from './DataTimeFilterRow';
import styles from './FilterPanel.module.css';
import FilterRow from './FilterRow';
import { FilterValues } from './hooks';

type Props = {
  initialValues: FilterValues;
  onApply: (values: FilterValues) => void;
  onClose: () => void;
};

const EMPTY_VALUES: FilterValues = {
  dataTime: null,
  experiences: [],
  genders: [],
};

const FilterPanel = ({
  initialValues,
  onApply,
  onClose,
}: Props): React.ReactElement => {
  const [draft, setDraft] = useState<FilterValues>(initialValues);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return (): void => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="關閉篩選"
        onClick={onClose}
      />
      <div className={styles.panel} role="dialog" aria-label="薪資篩選">
        <div className={styles.rows}>
          <DataTimeFilterRow
            value={draft.dataTime}
            onChange={(value): void =>
              setDraft(current => ({ ...current, dataTime: value }))
            }
          />
          <FilterRow
            label="工作經歷"
            options={EXPERIENCE_OPTIONS}
            values={draft.experiences}
            onChange={(values): void =>
              setDraft(current => ({ ...current, experiences: values }))
            }
          />
          <FilterRow
            label="性別"
            options={GENDER_OPTIONS}
            values={draft.genders}
            onChange={(values): void =>
              setDraft(current => ({ ...current, genders: values }))
            }
          />
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.clearButton}
            onClick={(): void => setDraft(EMPTY_VALUES)}
          >
            重設
          </button>
          <button
            type="button"
            className={styles.applyButton}
            onClick={(): void => onApply(draft)}
          >
            套用
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
