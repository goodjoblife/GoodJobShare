import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './LaborRightsEntry.module.css';

const LaborRightsEntry = ({ link, title, coverUrl }) => (
  <Link to={link} className={styles.wrapper}>
    {coverUrl && (
      <div className={styles.cover}>
        <img alt={title} src={coverUrl} />
      </div>
    )}
  </Link>
);

LaborRightsEntry.propTypes = {
  coverUrl: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
};

export default LaborRightsEntry;
