import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';

import styles from './TextInput.module.css';

const renderItem = (item, isHighlighted) => (
  <div
    key={item.value}
    style={{
      background: isHighlighted ? 'lightgray' : 'white',
      padding: '5px 10px',
    }}
  >
    <p
      style={{
        color: isHighlighted ? 'black' : '#222',
      }}
      className={isHighlighted ? 'pSBold' : 'pS'}
    >
      {item.label}
    </p>
  </div>
);

class AutoCompleteTextInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  onFocus() {
    this.handleIsOpen(true);
  }

  onBlur() {
    this.handleIsOpen(false);
  }

  handleIsOpen(isOpen) {
    this.setState({
      isOpen,
    });
  }

  render() {
    const {
      value,
      placeholder,
      onChange,
      isWarning,
      warningWording,
      type,
      getItemValue,
      items,
      onSelect,
    ...rest
    } = this.props;

    const {
      isOpen,
    } = this.state;

    const inputClassName = isWarning ? styles.warning : styles.input;
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <Autocomplete
          inputProps={{
            type,
            placeholder,
            className: inputClassName,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
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
            display: items.length !== 0 ? 'block' : 'none',
            position: 'absolute',
            zIndex: '99',
            top: null,
            bottom: 0,
            left: 0,
            transform: 'translateY(100%)',
            border: '1px solid #b4b4b4',
            maxHeight: '150px',
            overflowY: 'scroll',
            padding: '5px 0',
          }}
          autoHighlight={false}
          onSelect={onSelect}
          open={isOpen}
          {...rest}
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
  }
}

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
  getItemValue: PropTypes.func,
  items: PropTypes.array,
  onSelect: PropTypes.func,
};

AutoCompleteTextInput.defaultProps = {
  type: 'text',
};

export default AutoCompleteTextInput;
