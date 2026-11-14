import cn from 'classnames';
import React from 'react';

import styles from './DividedList.module.css';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const DividedList: React.FC<Props> = ({ className, children }) => (
  <div className={cn(styles.list, className)}>{children}</div>
);

export default DividedList;
