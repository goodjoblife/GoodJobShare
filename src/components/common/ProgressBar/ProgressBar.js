import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ProgressBar.module.css';

const sizeOptions = ['l', 'm', 's'];
const themeOptions = ['yellow', 'black', 'gray'];

const ProgressBar = ({
  dataNum, // current data number
  goalNum, // goal data number
  size,
  rootClassName,
  theme,
}) => {
  const percentage =
    dataNum <= goalNum ? `${(dataNum / goalNum) * 100}%` : '100%';
  return (
    <div
      className={cn(styles.root, rootClassName, styles[size], styles[theme])}
    >
      {size === 'l' && <div className={styles.start}>0</div>}
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: percentage }}>
          {(size === 'l' || size === 'm') && (
            <span className={styles.totalData}>
              <span className={styles.hideDesktop}>募集資料數：</span>
              {dataNum}
            </span>
          )}
        </div>
      </div>
      {size === 'l' && <div className={styles.end}>{goalNum}</div>}
      {size === 's' && (
        <div className={styles.numbers}>
          {dataNum}/{goalNum}
        </div>
      )}
      {size === 'm' && (
        <div className={styles.goal}>
          目標：
          {goalNum} 筆
        </div>
      )}
    </div>
  );
};
ProgressBar.propTypes = {
  dataNum: PropTypes.number,
  goalNum: PropTypes.number.isRequired,
  size: PropTypes.oneOf(sizeOptions),
  rootClassName: PropTypes.string,
  theme: PropTypes.oneOf(themeOptions),
};
ProgressBar.defaultProps = {
  dataNum: 0,
  size: 'l',
  theme: 'yellow',
};

export default ProgressBar;
