import React, { useState, useRef } from 'react';
import { useDebounce } from 'react-use';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextInput from 'common/form/TextInput';
import commonStyles from './styles.module.css';

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
  placeholder,
}) => {
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
    300,
    [value],
  );

  return (
    <div className={cn({ [commonStyles.hasWarning]: !!warning })}>
      <div className={cn(commonStyles.warnableContainer)}>
        <TextInput
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onEnter={e => {
            e.target.blur();
            onConfirm(e);
          }}
          autocompleteItems={items}
          onAutocompleteItemSelected={item => {
            onChange(item);
            if (onSelect) {
              onSelect(item);
            }
          }}
        />
        <div className={cn(commonStyles.warning, commonStyles.inlineWarning)}>
          {warning}
        </div>
      </div>
    </div>
  );
};

Text.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  search: PropTypes.func,
  warning: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Text;
