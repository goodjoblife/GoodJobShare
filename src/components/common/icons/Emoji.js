import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Emoji.module.css';

const Emoji = ({ className, emoji, style }) => (
  <i
    className={cn(styles.radioSquareIcon, className)}
    style={{
      backgroundImage: `url(https://image.goodjob.life/${emoji}.svg)`,
      ...style,
    }}
  />
);

Emoji.propTypes = {
  className: PropTypes.string,
  emoji: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Emoji;
