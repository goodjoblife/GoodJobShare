import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ProgressBar.module.css';
import { goalNum } from '../../../constants/dataProgress';

const sizeOptions = ['l', 'm', 's'];
const themeOptions = ['yellow', 'black', 'gray'];

const ProgressBar = ({
  totalData,
  size,
  rootClassName,
  theme,
}) => {
  const percentage = totalData <= goalNum ? `${(totalData / goalNum) * 100}%` : '100%';
  return (
    <div className={cn(styles.root, rootClassName, styles[size], styles[theme])}>
      { size === 'l' && <div className={styles.start}>0</div> }
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: percentage }}>
          { (size === 'l' || size === 'm') &&
            <span className={styles.totalData}><span className={styles.hideDesktop}>募集資料數：</span>{totalData}</span>
          }
        </div>
      </div>
      { size === 'l' && <div className={styles.end}>{goalNum}</div> }
      { size === 's' && <div className={styles.numbers}>{totalData}/{goalNum}</div> }
      { size === 'm' && <div className={styles.goal}>目標：{goalNum} 筆</div> }
    </div>
  );
};
ProgressBar.propTypes = {
  totalData: PropTypes.number.isRequired,
  size: PropTypes.oneOf(sizeOptions),
  rootClassName: PropTypes.string,
  theme: PropTypes.oneOf(themeOptions),
};
ProgressBar.defaultProps = {
  totalData: 0,
  size: 'l',
  theme: 'yellow',
};

export default ProgressBar;
