import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';

import styles from './ExperienceSearch.module.css';
import TypeCheckbox from './TypeCheckbox';
import IndustryRadio from './IndustryRadio';

const ExperienceSearch = ({
  setSort, setType, setIndustry,
  experienceSearch,
}) => (
  <main className="wrapperL">
    <Helmet title="面試‧工作經驗" />
    <div className={styles.container}>
      <aside>
        <button
          className={experienceSearch.get('sort') === 'created_at'
            ? `${styles.frontButton} ${styles.toggle}`
            : styles.frontButton}
          onClick={setSort} value="created_at"
        >
          最新
        </button>
        <button
          className={experienceSearch.get('sort') === 'popularity'
            ? `${styles.rearButton} ${styles.toggle}`
            : styles.rearButton}
          onClick={setSort} value="popularity"
        >
          熱門
        </button>

        <div className={styles.splitter} />

        {
          [
            { label: '面試經驗', value: 'interview' },
            { label: '工作經驗', value: 'work' },
            { label: '薪時資料', value: 'salary' },
          ].map(o => (
            <TypeCheckbox
              key={o.value} label={o.label} value={o.value}
              setType={setType} experienceSearch={experienceSearch}
            />
          ))
        }

        <div className={styles.splitter} />

        {
          [
            { label: '全部', value: 'all' },
            { label: '金融業', value: 'finance' },
            { label: '製造業', value: 'manufacturing' },
            { label: '運輸業', value: 'transportation' },
            { label: '科技業', value: 'technology' },
          ].map(o => (
            <IndustryRadio
              key={o.value} label={o.label} value={o.value}
              setIndustry={setIndustry} experienceSearch={experienceSearch}
            />
          ))
        }
      </aside>

      <div className={styles.content}>
        <div className={styles.searchbar}>searhbar</div>
        <div className={styles.info}>找到 5 筆與 &quot;日月光&quot; 相關的資料</div>
        <div className={styles.list}>main content</div>
      </div>
    </div>
  </main>
);

ExperienceSearch.propTypes = {
  setSort: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setIndustry: PropTypes.func.isRequired,
  experienceSearch: ImmutablePropTypes.map.isRequired,
};

export default ExperienceSearch;
