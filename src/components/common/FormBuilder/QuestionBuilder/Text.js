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
  footnote,
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
      </div>
      {footnote && <div className={commonStyles.footnote}>{footnote}</div>}
      <div className={cn(commonStyles.warning, commonStyles.inlineWarning)}>
        {warning}
      </div>
    </div>
  );
};

Text.propTypes = {
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  description: PropTypes.string,
  footnote: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  page: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  search: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.string.isRequired,
  warning: PropTypes.string,
};

export default Text;
