import React, { useCallback, useState } from 'react';
import Select from 'common/form/Select';

const options = [
  { label: '近期精選貼文', value: '近期精選貼文' },
  { label: '按照時間排序(新->舊)', value: '按照時間排序(新->舊)' },
  { label: '按照時間排序(舊->新)', value: '按照時間排序(舊->新)' },
];

const Sorter = () => {
  const [value, setValue] = useState('近期精選貼文');
  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  return (
    <Select
      options={options}
      hasNullOption={false}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Sorter;
