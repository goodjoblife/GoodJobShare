import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextInput from 'common/form/TextInput';
import Magnifiner from 'common/icons/Magnifiner';
import styles from './Searchbar.module.css';
import { useDebounce } from 'react-use';

const Searchbar = ({ className, onSubmit }) => {
  const [searchText, setSearchText] = useState('');
  const ref = useRef(null);

  useDebounce(
    () => {
      onSubmit(searchText);
    },
    1000,
    [searchText],
  );

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(searchText);
      if (ref.current) ref.current.blur();
    },
    [onSubmit, searchText],
  );

  return (
    <form
      className={cn(className, styles.searchbar)}
      onSubmit={handleFormSubmit}
    >
      職稱搜尋：
      <TextInput
        ref={ref}
        className={styles.textInput}
        placeholder="搜該公司指定職稱薪水"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifiner />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
