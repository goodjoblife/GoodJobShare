import React, { useState, useRef } from 'react';
import { useDebounce } from 'react-use';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput_new';
import useComposition from '../useComposition';
import styles from './Text.module.css';

const notEquals = x =>
  R.compose(
    R.not,
    R.equals(x),
  );

const Text = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  onConfirm,
  onSelect,
  search,
  warning,
  validator,
  placeholder,
}) => {
  const [
    isComposing,
    handleCompositionStart,
    handleCompositionEnd,
  ] = useComposition();
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  useDebounce(
    async () => {
      let items;
      if (value && search) {
        try {
          items = await search(value);
          items = items.filter(notEquals(value));
        } catch (err) {
          items = [];
        }
      } else {
        items = [];
      }
      if (ref.current) {
        setItems(items);
      }
    },
    300,
    [value],
  );

  return (
    <div className={cn(styles.container, { [styles.hasWarning]: !!warning })}>
      <AutoCompleteTextInput
        ref={ref}
        className={styles.textinput}
        type="text"
        placeholder={placeholder}
        value={value}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onChange={e => onChange(e.target.value)}
        onEnter={e => {
          if (!isComposing) {
            e.target.blur();
            onConfirm(e);
          }
        }}
        autocompleteItems={items}
        onAutocompleteItemSelected={item => {
          onChange(item);
          if (onSelect) {
            onSelect(item);
          }
        }}
      />
      <div className={styles.warning}>{warning}</div>
    </div>
  );
};

Text.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  search: PropTypes.func,
  warning: PropTypes.string,
  validator: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Text;
