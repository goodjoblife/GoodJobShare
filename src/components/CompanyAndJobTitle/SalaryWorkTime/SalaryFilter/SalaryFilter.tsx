import { faSlidersH } from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';

import FilterPanel from './FilterPanel';
import {
  FilterValues,
  TScrollY,
  useApplyFilterValues,
  useFilterValuesFromQuery,
  useSortByFromQuery,
} from './hooks';
import styles from './SalaryFilter.module.css';
import SortSelect from './SortSelect';

type Props = {
  y?: TScrollY;
};

const SalaryFilter = ({ y = null }: Props): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const filterValues = useFilterValuesFromQuery();
  const applyFilterValues = useApplyFilterValues(y);
  const [sortBy, setSortBy] = useSortByFromQuery(y);

  const close = useCallback((): void => setIsOpen(false), []);

  const apply = (values: FilterValues): void => {
    applyFilterValues(values);
    close();
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterControl}>
        <button
          type="button"
          className={styles.filterButton}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={(): void => setIsOpen(open => !open)}
        >
          <span className={styles.filterIcon} aria-hidden="true">
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          篩選
          <span className={styles.chevron} aria-hidden="true" />
        </button>
        {isOpen && (
          <FilterPanel
            initialValues={filterValues}
            onApply={apply}
            onClose={close}
          />
        )}
      </div>
      <SortSelect value={sortBy} onChange={setSortBy} />
    </div>
  );
};

export default SalaryFilter;
