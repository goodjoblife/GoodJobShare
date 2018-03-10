import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Checkbox from 'common/form/Checkbox';

import styles from './Filter.module.css';

const SORT = {
  CREATED_AT: 'created_at',
  POPULARITY: 'popularity',
};

const SEARCH_TYPE = {
  INTERVIEW: 'interview',
  WORK: 'work',
};

const OPTIONS = [
  { label: '面試經驗', value: SEARCH_TYPE.INTERVIEW },
  { label: '工作經驗', value: SEARCH_TYPE.WORK },
];

class Filter extends PureComponent {
  constructor(props) {
    super(props);

    const { sort, searchType } = props;
    this.state = {
      sort,
      searchType,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { sort, searchType } = nextProps;
    this.setState({
      sort,
      searchType,
    });
  }

  render() {
    const {
      onSortClick,
      onSeachTypeChange,
      className,
    } = this.props;

    const { sort, searchType } = this.state;

    // use classname module
    return (
      <div className={className}>
        <section>
          <button
            className={sort === SORT.CREATED_AT ? `${styles.frontButton} ${styles.toggle}` : styles.frontButton}
            onClick={() => {
              const newSort = SORT.CREATED_AT;
              this.setState({ sort: newSort });
              onSortClick({ sort: newSort, searchType });
            }}
            value={SORT.CREATED_AT}
          >
            最新
          </button>
          <button
            className={sort === SORT.POPULARITY ? `${styles.rearButton} ${styles.toggle}` : styles.rearButton}
            onClick={() => {
              const newSort = SORT.POPULARITY;
              this.setState({ sort: newSort });
              onSortClick({ sort: newSort, searchType });
            }}
            value={SORT.POPULARITY}
          >
            熱門
          </button>
        </section>
        <hr className={styles.splitter} />
        <div className={styles.fliters}>
          {
            OPTIONS.map(o => (
              <Checkbox
                key={o.value}
                id={`searchType-${o.value}`}
                label={o.label}
                value={o.value}
                onChange={e => {
                  const value = e.target.value;
                  const newSearchType = R.ifElse(
                    R.contains(value),
                    R.reject(R.equals(value)),
                    R.append(value),
                  )(searchType);
                  this.setState({ searchType: newSearchType });
                  onSeachTypeChange({ searchType: newSearchType, sort });
                }}
                checked={searchType.includes(o.value)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  className: PropTypes.string,
  searchType: PropTypes.array.isRequired,
  sort: PropTypes.string,
  // ({ searchType, sort }) => ()
  onSeachTypeChange: PropTypes.func,
  // ({ searchType, sort }) => ()
  onSortClick: PropTypes.func,
};

Filter.defaultProps = {
  onSeachTypeChange: () => {},
  onSortClick: () => {},
};

export default Filter;
