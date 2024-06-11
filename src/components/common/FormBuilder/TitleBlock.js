import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TitleBlock.module.css';

const defaultFormatter = ({ title, page, required }) =>
  `${page + 1}. ${title}${!required ? '（選填）' : ''}`;

const TitleBlock = ({ page, title, required, description }) => (
  <div>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      {typeof title === 'function'
        ? title({ page, required })
        : defaultFormatter({ title, page, required })}
    </div>
    <div className={styles.description}>{description}</div>
  </div>
);

TitleBlock.propTypes = {
  description: PropTypes.string,
  required: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

TitleBlock.defaultProps = {
  required: false,
};

export default TitleBlock;
