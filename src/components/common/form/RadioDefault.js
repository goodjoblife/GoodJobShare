import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { P } from 'common/base';

import { makeId } from 'utils/stringUtil';

import styles from './RadioDefault.module.css';

class RadioDefault extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = makeId();
  }
  render() {
    const { idPrefix, label, value, checked, onChange, name } = this.props;

    const id = `${idPrefix || this.id}-${value}`;

    return (
      <label htmlFor={id} className={styles.wrapper}>
        <input
          id={id}
          type="radio"
          name={name}
          checked={checked}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            display: 'none',
          }}
        />
        <span
          className={cn(styles.radio, {
            [styles.checked]: checked,
          })}
        />
        <P className={styles.label}>{label}</P>
      </label>
    );
  }
}

RadioDefault.propTypes = {
  checked: PropTypes.bool.isRequired,
  idPrefix: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioDefault;
