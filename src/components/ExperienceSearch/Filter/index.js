import React, { PropTypes } from 'react';
import Checkbox from 'common/form/Checkbox';

import styles from './Filter.module.css';

const SORT = {
  CREATED_AT: 'created_at',
  POPULARITY: 'popularity',
};
const SEARCH_TYPE = {
  INTERVIEW: 'interview',
  WORK: 'work',
  SALARY: 'salary',
};

const Filter = ({
  data,
  fetchExperiencesWithSort,
  setSearchType,
  className,
}) => (
  <div className={className}>
    <section>
      <button
        className={data.sort === SORT.CREATED_AT
          ? `${styles.frontButton} ${styles.toggle}`
          : styles.frontButton}
        onClick={() => fetchExperiencesWithSort(SORT.CREATED_AT)}
        value={SORT.CREATED_AT}
      >
        最新
      </button>
      <button
        className={data.sort === SORT.POPULARITY
          ? `${styles.rearButton} ${styles.toggle}`
          : styles.rearButton}
        onClick={() => fetchExperiencesWithSort(SORT.POPULARITY)}
        value={SORT.POPULARITY}
      >
        熱門
      </button>
    </section>
    <hr className={styles.splitter} />
    <div className={styles.fliters}>
      {
        [
          { label: '面試經驗', value: SEARCH_TYPE.INTERVIEW },
          { label: '工作經驗', value: SEARCH_TYPE.WORK },
          { label: '薪資工時', value: SEARCH_TYPE.SALARY },
        ].map(o => (
          <Checkbox
            key={o.value} id={`searchType-${o.value}`}
            label={o.label} value={o.value}
            disabled={o.value === 'salary' && !data.searchQuery}
            onChange={setSearchType}
            checked={data.searchType.includes(o.value)}
          />
        ))
      }
    </div>
  </div>
);
Filter.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  fetchExperiencesWithSort: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
};

export default Filter;
