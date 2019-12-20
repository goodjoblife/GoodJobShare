import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './LinkItem.module.css';

const LinkItem = ({ title, items }) => (
  <div className={styles.linkItem}>
    <h4 size="l" className={styles.heading}>
      {title}
    </h4>
    {items.map(({ to, text, anchor }, index) => {
      if (anchor || to.startsWith('http')) {
        return (
          <a key={index} href={to} className={styles.link}>
            {text}
          </a>
        );
      }
      return (
        <Link key={index} to={to} className={styles.link}>
          {text}
        </Link>
      );
    })}
  </div>
);
LinkItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default LinkItem;
