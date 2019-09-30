import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';

import Magnifier from '../../common/icons/Magnifiner';
import styles from './Searchbar.module.css';

const searchType = 'company';

const Searchbar = ({ className, history }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = useCallback(e => {
    setSearchText(e.target.value);
  }, []);

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      history.push(
        `/salary-work-times?q=${encodeURIComponent(
          searchText,
        )}&s_by=${searchType}`,
      );
    },
    [history, searchText],
  );

  return (
    <form
      className={cn(className, styles.searchbar)}
      onSubmit={handleFormSubmit}
    >
      <input
        className={styles.textInput}
        placeholder="輸入公司、職稱查詢面試及薪水資料"
        value={searchText}
        onChange={handleChange}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifier />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Searchbar);
