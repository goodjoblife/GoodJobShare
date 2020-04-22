import React, { useState, useRef } from 'react';
import { useDebounce } from 'react-use';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput_new';
import styles from './Text.module.css';

const Text = ({
  page,
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  onConfirm,
  onSelect,
  search,
  warning,
  validator,
  placeholder,
}) => {
  const [isComposing, setComposing] = useState(false);
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  useDebounce(
    async () => {
      let items;
      if (value && search) {
        try {
          items = await search(value);
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
    500,
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
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={() => setComposing(false)}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (!isComposing && e.key === 'Enter') {
            e.target.blur();
            onConfirm();
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
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
