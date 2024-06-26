import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Scrollable from '../Scrollable';
import TextInput from 'common/form/TextInput';
import styles from './TextList.module.css';
import commonStyles from './styles.module.css';

const TextList = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value: values,
  onChange,
  warning,
  placeholder,
}) => {
  const ref = useRef(null);
  const handleChange = useCallback(
    (value, i) =>
      onChange([...values.slice(0, i), value, ...values.slice(i + 1)]),
    [onChange, values],
  );
  const handleClickDelete = useCallback(
    i => onChange([...values.slice(0, i), ...values.slice(i + 1)]),
    [onChange, values],
  );
  const handleClickAdd = useCallback(() => onChange([...values, '']), [
    onChange,
    values,
  ]);

  return (
    <div
      className={cn(styles.container, { [commonStyles.hasWarning]: !!warning })}
    >
      <div className={cn(styles.listContainer, commonStyles.warnableContainer)}>
        <Scrollable className={styles.list}>
          {values.map((value, i) => (
            <div className={styles.item} key={i}>
              <div className={styles.no}>{i + 1}.</div>
              <div className={styles.inputWrapper}>
                <TextInput
                  ref={ref}
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={e => handleChange(e.target.value, i)}
                />
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => handleClickDelete(i)}
              >
                刪除
              </button>
            </div>
          ))}
          <div className={styles.item}>
            <button className={styles.addBtn} onClick={handleClickAdd}>
              增加一題
            </button>
          </div>
        </Scrollable>
      </div>
      <div className={cn(commonStyles.warning, commonStyles.isFill)}>
        {warning}
      </div>
    </div>
  );
};

TextList.propTypes = {
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  warning: PropTypes.string,
};

export default TextList;
