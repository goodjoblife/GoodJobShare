import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'common/button/Button';
import Checked2 from 'common/icons/Checked2';
import linkStyles from 'common/base/Link.module.css';
import { ValuePropType } from '../Checkbox/PropTypes';
import styles from './styles.module.css';

const Option = ({ children, onClick, selected, isElse }) => {
  return (
    <Button
      className={cn(styles.button, { [linkStyles.link]: isElse })}
      btnStyle={selected ? 'yellow' : 'lightGray'}
      circleSize="lg"
      onClick={onClick}
    >
      {selected && <Checked2 />} {children}
    </Button>
  );
};

Option.propTypes = {
  children: ValuePropType.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  isElse: PropTypes.bool,
};

export default Option;
