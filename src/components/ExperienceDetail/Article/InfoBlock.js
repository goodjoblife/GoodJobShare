import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './InfoBlock.module.css';

export const InfoBlocks = ({ children }) => {
  const tds = React.Children.map(
    children,
    child => child && <td>{child}</td>,
  ).filter(Boolean);

  if (tds.length === 0) return null;

  return (
    <div className={styles.infoBlocks}>
      <table>
        <tbody>
          <tr>{tds}</tr>
        </tbody>
      </table>
    </div>
  );
};

InfoBlocks.propTypes = {
  children: PropTypes.node,
};

const InfoBlock = ({ className, label, children }) => (
  <div className={styles.infoBlock}>
    <span className={styles.label}>{label}</span>
    <span className={cn(styles.value, className)}>{children || '-'}</span>
  </div>
);

InfoBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default InfoBlock;
