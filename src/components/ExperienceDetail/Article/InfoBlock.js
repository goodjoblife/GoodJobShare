import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './InfoBlock.module.css';

export const InfoBlocks = ({ children }) => (
  <div className={styles.infoBlocks}>
    <table>
      <tbody>
        <tr>
          {React.Children.map(children, child => child && <td>{child}</td>)}
        </tr>
      </tbody>
    </table>
  </div>
);

InfoBlocks.propTypes = {
  children: PropTypes.node,
};

const InfoBlock = ({ className, label, children }) => (
  <div className={styles.infoBlock}>
    <span className={styles.label}>{label}</span>
    <span className={cn(styles.value, className)}>{children}</span>
  </div>
);

InfoBlock.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default InfoBlock;
