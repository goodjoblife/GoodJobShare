import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import cn from 'classnames';

import styles from './AutocompleteTextInput.module.css';

const AutocompleteTextInput = ({
  value,
  onChange,
  autocompleteItems,
  autocompleteItemKeySelector,
  autocompleteItemLabelSelector,
  onAutocompleteItemSelect,
  ...restProps
}) => (
  <Autocomplete
    value={value}
    onChange={onChange}
    inputProps={restProps}
    items={autocompleteItems}
    getItemValue={item => item}
    renderMenu={(items, value, style) => (
      <div
        className={cn(styles.menu, { [styles.active]: items.length > 0 })}
        style={style}
      >
        {items}
      </div>
    )}
    renderItem={(item, isHighlighted, style) => (
      <div
        key={autocompleteItemKeySelector(item)}
        className={cn(styles.item, { [styles.active]: isHighlighted })}
        style={style}
      >
        {autocompleteItemLabelSelector(item)}
      </div>
    )}
    autoHighlight={false}
    onSelect={onAutocompleteItemSelect}
  />
);

AutocompleteTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autocompleteItems: PropTypes.array.isRequired,
  autocompleteItemKeySelector: PropTypes.func.isRequired,
  autocompleteItemLabelSelector: PropTypes.func.isRequired,
  onAutocompleteItemSelect: PropTypes.func.isRequired,
};

export default AutocompleteTextInput;
