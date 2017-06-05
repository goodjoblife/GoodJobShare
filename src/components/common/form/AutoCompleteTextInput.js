import React, { PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';

import styles from './TextInput.module.css';

const AutoCompleteTextInput = (
  {
    value,
    placeholder,
    onChange,
    isWarning,
    warningWording,
    type,
    renderItem,
    getItemValue,
    items,
  }
) => {
  const inputClassName = isWarning ? styles.warning : styles.input;
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Autocomplete
        type={type}
        placeholder={placeholder}
        inputProps={{
          className: inputClassName,
        }}
        value={value}
        onChange={onChange}
        renderItem={renderItem}
        getItemValue={getItemValue}
        items={items}
        wrapperStyle={{
          display: 'block',
        }}
      />
      {
        warningWording ?
          <p
            className={`
            pS ${styles.warning__text} ${isWarning ? styles.isWarning : ''}
          `}
          >
            {warningWording}
          </p> : null
      }
    </div>
  );
};


AutoCompleteTextInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isWarning: PropTypes.bool,
  warningWording: PropTypes.string,
  type: PropTypes.string,
  renderItem: PropTypes.func,
  getItemValue: PropTypes.func,
  items: PropTypes.array,
};

AutoCompleteTextInput.defaultProps = {
  type: 'text',
};

export default AutoCompleteTextInput;
