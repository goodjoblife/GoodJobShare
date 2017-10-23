import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import styles from './LaborRightsEntry.module.css';

const LaborRightsEntry = ({ link, title, coverUrl }) => (
  <Link to={link} className={styles.wrapper}>
    {
      coverUrl &&
        <div className={styles.cover}>
          <img alt={title} src={coverUrl} />
        </div>
    }
    <div className={cn('subheadingLBold', styles.title)}>
      {title}
    </div>
  </Link>
);

LaborRightsEntry.propTypes = {
  link: React.PropTypes.string,
  title: React.PropTypes.string,
  coverUrl: React.PropTypes.string,
};

export default LaborRightsEntry;
