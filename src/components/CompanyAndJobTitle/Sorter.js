import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Sorter.module.css';
import Caret from 'common/icons/Caret';
import Sort from 'common/icons/Sort';

const options = [
  { label: '近期精選貼文', value: '近期精選貼文' },
  { label: '按照時間排序(新->舊)', value: '按照時間排序(新->舊)' },
  { label: '按照時間排序(舊->新)', value: '按照時間排序(舊->新)' },
];

const Select = ({ value, onChange }) => {
  const handleChange = useCallback(
    e => {
      onChange(e.target.value);
    },
    [onChange],
  );
  return (
    <div className={styles.sorter}>
      <Sort className={styles.leadingIcon} />
      <select onChange={handleChange} value={value}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <Caret className={styles.caret} />
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const Sorter = () => {
  const [value, setValue] = useState(options[0].value);
  return <Select value={value} onChange={setValue} />;
};

export default Sorter;
