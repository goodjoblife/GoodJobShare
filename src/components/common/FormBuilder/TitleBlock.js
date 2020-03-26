import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TitleBlock.module.css';

const TitleBlock = ({ page, title, required, description }) => (
  <div>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      {page}. {title}
    </div>
    <div className={styles.description}>{description}</div>
  </div>
);

TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  description: PropTypes.string,
};

TitleBlock.defaultProps = {
  required: false,
};

export default TitleBlock;
