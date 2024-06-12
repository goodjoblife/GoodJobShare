import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { P } from 'common/base';
import styles from './Label.module.css';

const Label = ({ Icon, text, className }) => (
  <div className={cn(styles.label, className)}>
    <Icon />
    <P Tag="span" size="m" bold>
      {text}
    </P>
  </div>
);

Label.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Label;
