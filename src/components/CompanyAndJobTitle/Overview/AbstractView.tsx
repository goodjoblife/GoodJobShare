import React, { FC } from 'react';
import cn from 'classnames';
import { Link } from 'common/base';
import styles from './SummaryBlock.module.css';

type AbstractViewProps = {
  title: string;
  value: string;
  valueSuffix: string;
  footer?: string;
  linkTo?: string;
};

const AbstractView: FC<AbstractViewProps> = ({
  title,
  value,
  valueSuffix,
  footer,
  linkTo,
}) => (
  <div className={styles.abstractView}>
    <span className={styles.title}>{title}</span>
    <span className={styles.body}>
      <em>{value}</em>
      {valueSuffix}
    </span>
    <span className={cn(styles.footer, { [styles.link]: linkTo })}>
      {linkTo ? (
        <Link to={linkTo} className={styles.link}>
          {footer}
        </Link>
      ) : (
        footer || '　'
      )}
    </span>
  </div>
);

export default AbstractView;
