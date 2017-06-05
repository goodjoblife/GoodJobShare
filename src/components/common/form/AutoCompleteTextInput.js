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
    onSelect,
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
        menuStyle={{
          position: 'absolute',
          zIndex: '99',
          top: null,
          bottom: 0,
          left: 0,
          transform: 'translateY(100%)',
          border: '1px solid #fcd406',
          maxHeight: '300px',
          overflowY: 'scroll',
          padding: '5px 0',
        }}
        onSelect={onSelect}
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
  onSelect: PropTypes.func,
};

AutoCompleteTextInput.defaultProps = {
  type: 'text',
};

export default AutoCompleteTextInput;
