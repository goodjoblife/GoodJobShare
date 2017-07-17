import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import styles from './LaborRightsEntry.module.css';

const LaborRightsEntry = ({ id, title, coverUrl }) => (
  <Link to={`/labor-rights/${id}`} className={styles.wrapper}>
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
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  coverUrl: React.PropTypes.string,
};

export default LaborRightsEntry;
