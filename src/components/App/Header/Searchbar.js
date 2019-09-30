import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Magnifier from '../../common/icons/Magnifiner';
import styles from './Searchbar.module.css';

const Searchbar = ({ className }) => {
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = useCallback(e => {
    setSearchText(e.target.value);
  }, []);

  const onFormSubmit = useCallback(
    e => {
      e.preventDefault();
      console.info(searchText);
    },
    [searchText],
  );

  return (
    <form className={cn(className, styles.searchbar)} onSubmit={onFormSubmit}>
      <input
        className={styles.textInput}
        placeholder="輸入公司、職稱查詢面試及薪水資料"
        value={searchText}
        onChange={onChangeSearchText}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifier />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Searchbar;
