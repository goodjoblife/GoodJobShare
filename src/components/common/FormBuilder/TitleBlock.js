import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TitleBlock.module.css';

const defaultFormatter = ({ title, page }) => `${page + 1}. ${title}`;

const TitleBlock = ({ page, title, required, description }) => (
  <div>
    <div
      className={cn(styles.title, styles[required ? 'necessary' : 'optional'])}
    >
      {typeof title === 'function'
        ? title({ page })
        : defaultFormatter({ title, page })}
    </div>
    <div className={styles.description}>{description}</div>
  </div>
);

TitleBlock.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  required: PropTypes.bool.isRequired,
  description: PropTypes.string,
};

TitleBlock.defaultProps = {
  required: false,
};

export default TitleBlock;
