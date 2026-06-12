import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { P } from 'common/base';

import styles from './LinkItem.module.css';

const LinkItem = ({ title, items }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.linkItem}>
      <P size="l" className={styles.heading}>
        {title}
      </P>
      {items.map(({ to, text, anchor }, index) => {
        if (typeof to === 'function') {
          const onClick = () => to({ dispatch });
          return (
            <button key={index} className={styles.link} onClick={onClick}>
              {text}
            </button>
          );
        }
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
};
LinkItem.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default LinkItem;
