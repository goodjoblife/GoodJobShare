import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';

import styles from './ExperienceSearch.module.css';
import Search from '../images/search.svg';
import Alert from '../common/Alert';
import ExperienceBlock from './ExperienceBlock';
import WorkingHourBlock from './WorkingHourBlock';
import Radio from '../common/form/Radio';
import Checkbox from '../common/form/Checkbox';

let cmpAlert;

const ExperienceSearch = ({
  setSort, setSearchType, setIndustry, setCondition,
  experienceSearch,
}) => (
  <main className="wrapperL">
    <Helmet title="面試‧工作經驗" />
    <Alert ref={c => { cmpAlert = c; }}>
      <p>test</p>
    </Alert>
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
            <Checkbox
              key={o.value} id={`searchType-${o.value}`}
              label={o.label} value={o.value}
              onChange={setSearchType} checked={experienceSearch.get(o.value)}
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
            <Radio
              key={o.value} id={`industry-${o.value}`}
              label={o.label} value={o.value}
              onChange={setIndustry}
              checked={experienceSearch.get('industry') === o.value}
            />
          ))
        }
      </aside>

      <div className={styles.content}>
        <div className={styles.searchbar}>
          <div className={styles.condition}>
            {
              [
                { label: '公司', value: 'company' },
                { label: '職稱', value: 'job_title' },
              ].map(o => (
                <Radio
                  key={o.value} id={`condition-${o.value}`}
                  label={o.label} value={o.value} inline
                  onChange={setCondition}
                  checked={experienceSearch.get('condition') === o.value}
                />
              ))
            }
          </div>
          <div className={styles.search}>
            <input
              type="text"
              placeholder={
                experienceSearch.get('condition') === 'company'
                  ? '以公司搜尋'
                  : '以職稱搜尋'
              }
            />
<<<<<<< HEAD
            <Search onClick={() => {}} />
=======
            <Search
              onClick={() => {
                console.log('oh oh');
                cmpAlert.show();
              }}
            />
>>>>>>> upstream/master
            <div className={styles.keywordGroup}>
              <span className={styles.keyword}>醫師</span>
              <span className={styles.keyword}>工程師</span>
            </div>
          </div>
        </div>
        <div className={styles.info}>找到 5 筆與 &quot;日月光&quot; 相關的資料</div>
        <br />
        <ExperienceBlock />
        <WorkingHourBlock />
      </div>
    </div>
  </main>
);

ExperienceSearch.propTypes = {
  setSort: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  setIndustry: PropTypes.func.isRequired,
  setCondition: PropTypes.func.isRequired,
  experienceSearch: ImmutablePropTypes.map.isRequired,
};

export default ExperienceSearch;
