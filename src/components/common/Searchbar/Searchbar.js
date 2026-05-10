import React from 'react';
import cn from 'classnames';
import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';
import useSearchbar from './useSearchbar';
import styles from './Searchbar.module.css';

const Searchbar = () => {
  const {
    searchText,
    setSearchText,
    gotoSearchResult,
    handleFormSubmit,
  } = useSearchbar();

  return (
    <form
      className={cn(styles.section, styles.searchbar)}
      onSubmit={handleFormSubmit}
    >
      <SearchTextInput
        wrapperClassName={styles.textInputWrapper}
        className={styles.textInput}
        value={searchText}
        onChange={setSearchText}
        placeholder="搜全站薪水/面試/評價"
        onSelected={gotoSearchResult}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifiner />
        搜尋
      </button>
    </form>
  );
};

export default Searchbar;
