import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Radio from 'common/form/Radio';
import Magnifiner from 'common/icons/Magnifiner';
import styles from './Searchbar.module.css';

const SearchBar = ({
  data,
  setKeyword,
  handleSearchBy,
  handleKeyPress,
  handleKeywordClick,
  fetchExperiencesAndWorkings,
  className,
}) => (
  <section className={cn(styles.searchbar, className)}>
    <div className={styles.condition}>
      {
        [
          { label: '公司', value: 'company' },
          { label: '職稱', value: 'job_title' },
        ].map(o => (
          <Radio
            key={o.value} id={`condition-${o.value}`}
            label={o.label} value={o.value} inline
            onChange={() => handleSearchBy(o.value)}
            checked={data.searchBy === o.value}
          />
        ))
      }
    </div>
    <div className={styles.search}>
      <input
        type="text"
        onKeyPress={handleKeyPress}
        onChange={e => setKeyword(e.target.value)}
        value={data.keyword}
        placeholder={
          data.searchBy === 'company'
            ? 'ex: 台灣電機股份有限公司'
            : 'ex: 行銷企劃'
        }
      />
      <button
        className={styles.searchBtn}
        onClick={() => {
          // cmpAlert.show();
          const val = data.keyword;
          fetchExperiencesAndWorkings(val);
        }}
      >
        <Magnifiner />
      </button>
      <div className={styles.keywordGroup}>
        {
          (data.keywords || []).map(o => (
            <span
              key={o} className={styles.keyword}
              onClick={() => handleKeywordClick(o)}
            >
              {o}
            </span>
          ))
        }
      </div>
    </div>
  </section>
);
SearchBar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  handleSearchBy: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  handleKeywordClick: PropTypes.func.isRequired,
  setKeyword: PropTypes.func.isRequired,
  fetchExperiencesAndWorkings: PropTypes.func.isRequired,
};

export default SearchBar;
