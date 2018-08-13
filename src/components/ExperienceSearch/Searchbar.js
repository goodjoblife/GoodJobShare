import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Radio from 'common/form/Radio';
import Magnifiner from 'common/icons/Magnifiner';
import styles from './Searchbar.module.css';

const OPTIONS = [
  { label: '公司', value: 'company' },
  { label: '職稱', value: 'job_title' },
];

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    const { searchBy, searchQuery } = props;
    this.state = {
      searchBy,
      searchQuery,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { searchBy, searchQuery } = props;
    return {
      searchBy,
      searchQuery,
    };
  }

  render() {
    const { keywords } = this.props;
    const { onKeywordClick, onSearchByChange, onSubmit } = this.props;
    const { className } = this.props;
    const { searchBy, searchQuery } = this.state;

    return (
      <section className={cn(styles.searchbar, className)}>
        <div className={styles.condition}>
          {OPTIONS.map(o => (
            <Radio
              key={o.value}
              id={`condition-${o.value}`}
              label={o.label}
              value={o.value}
              inline
              onChange={() => {
                const newSearchBy = o.value;
                this.setState({ searchBy: newSearchBy });
                onSearchByChange({ searchBy: newSearchBy, searchQuery });
              }}
              checked={searchBy === o.value}
            />
          ))}
        </div>
        <div className={styles.search}>
          <input
            type="text"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                const newSearchQuery = e.target.value;
                onSubmit({ searchBy, searchQuery: newSearchQuery });
              }
            }}
            onChange={e => this.setState({ searchQuery: e.target.value })}
            value={searchQuery}
            placeholder={
              searchBy === 'company'
                ? 'ex: 台灣電機股份有限公司'
                : 'ex: 行銷企劃'
            }
          />
          <button
            className={styles.searchBtn}
            onClick={() => {
              onSubmit({ searchBy, searchQuery });
            }}
          >
            <Magnifiner />
          </button>
          <div className={styles.keywordGroup}>
            {(keywords || []).map(keyword => (
              <span
                key={keyword}
                className={styles.keyword}
                onClick={() => {
                  onKeywordClick({ keyword, searchBy, searchQuery });
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

SearchBar.propTypes = {
  className: PropTypes.string,
  keywords: PropTypes.array,
  searchBy: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchByChange: PropTypes.func.isRequired,
  onKeywordClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
