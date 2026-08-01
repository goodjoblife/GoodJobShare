import React, { useMemo, useState } from 'react';

import Card from 'common/Card';
import Magnifiner from 'common/icons/Magnifiner';

import GenderPayBarChart, { GenderPayItem } from './GenderPayBarChart';
import styles from './GenderPayComparisonCard.module.css';

export type GenderPayComparisonData = {
  jobTitlePayItems: GenderPayItem[];
};

type Props = {
  data: GenderPayComparisonData;
};

const GenderPayComparisonCard: React.FC<Props> = ({ data }) => {
  const [searchText, setSearchText] = useState('');

  const filteredItems = useMemo(
    () =>
      data.jobTitlePayItems.filter(({ jobTitle }) =>
        jobTitle.includes(searchText),
      ),
    [data.jobTitlePayItems, searchText],
  );

  return (
    <Card className={styles.card}>
      <form
        className={styles.searchbar}
        onSubmit={(e: React.FormEvent): void => e.preventDefault()}
      >
        <span className={styles.searchLabel}>職稱搜尋：</span>
        <input
          className={styles.searchInput}
          placeholder="搜尋這間公司職稱"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchText(e.target.value)
          }
        />
        <button type="submit" className={styles.searchBtn}>
          <Magnifiner />
        </button>
      </form>
      <GenderPayBarChart items={filteredItems} />
      <div className={styles.footer}>平均月薪</div>
    </Card>
  );
};

export default GenderPayComparisonCard;
