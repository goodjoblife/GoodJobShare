import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import cn from 'classnames';

import styles from './styles.module.css';

const AutoCompleteTextInput = ({
  wrapperClassName,
  className,
  value,
  onChange,
  autocompleteItems,
  autocompleteItemKeySelector,
  autocompleteItemLabelSelector,
  onAutocompleteItemSelected,
  ...inputProps
}) => (
  <Autocomplete
    value={value}
    onChange={onChange}
    items={autocompleteItems}
    wrapperProps={{ className: cn(styles.wrapper, wrapperClassName) }}
    wrapperStyle={{ display: 'flex' }}
    inputProps={{
      className: cn(styles.textInput, className),
      ...inputProps,
    }}
    renderMenu={(items, value, style) => (
      <div
        className={cn(styles.menu, {
          [styles.active]: autocompleteItems.length > 0,
        })}
        style={style}
      >
        {items}
      </div>
    )}
    renderItem={(item, isHighlighted, style) => (
      <div
        key={autocompleteItemKeySelector(item)}
        className={cn(
          styles.item,
          { [styles.active]: isHighlighted },
          isHighlighted ? 'pSBold' : 'pS',
        )}
        style={style}
      >
        {autocompleteItemLabelSelector(item)}
      </div>
    )}
    getItemValue={autocompleteItemLabelSelector}
    onSelect={onAutocompleteItemSelected}
    autoHighlight={false}
  />
);

AutoCompleteTextInput.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autocompleteItems: PropTypes.array.isRequired,
  autocompleteItemKeySelector: PropTypes.func,
  autocompleteItemLabelSelector: PropTypes.func,
  onAutocompleteItemSelected: PropTypes.func.isRequired,
};

AutoCompleteTextInput.defaultProps = {
  autocompleteItemKeySelector: x => x,
  autocompleteItemLabelSelector: x => x,
};

export default AutoCompleteTextInput;
