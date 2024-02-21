import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
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
  emoji: PropTypes.string.isRequired,
};

export default Emoji;
