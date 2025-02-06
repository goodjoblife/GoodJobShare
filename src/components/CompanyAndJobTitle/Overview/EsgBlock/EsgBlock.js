import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Caret from 'common/icons/Caret';
import Card from 'common/Card';
import Info from 'common/icons/Info';
import styles from './EsgBlock.module.css';
import overviewStyles from '../Overview.module.css';

const EsgItemBlock = ({ className, title }) => (
  <Card className={className}>
    <div className={styles.badge}>2023 年</div>
    <div className={styles.titleContainer}>
      <div className={styles.title}>{title}</div>
      <Info className={styles.icon} />
    </div>
    <div className={styles.data}>
      <span className={styles.value}>97.3</span> 萬 / 年
    </div>
    <div className={styles.caption}>
      與同業相比<span className={styles.value}>-6.6%</span>
    </div>
  </Card>
);

EsgItemBlock.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const EsgBlock = ({ className, showsToggle = true, hasPreviewed }) => {
  const [isCollapsed, setCollapsed] = useState(hasPreviewed);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(isCollapsed => !isCollapsed);
  }, []);

  return (
    <Card className={cn(styles.card, className)}>
      <div className={overviewStyles.title}>
        企業ESG公開薪資揭露
        {showsToggle && (
          <button
            className={cn(styles.toggle, { [styles.collapsed]: isCollapsed })}
            onClick={toggleCollapsed}
          >
            <Caret />
          </button>
        )}
      </div>
      <div
        className={cn(styles.content, {
          [styles.collapsed]: isCollapsed,
        })}
      >
        <div className={styles.items}>
          <EsgItemBlock className={styles.item} title="員工薪資平均數" />
          <EsgItemBlock
            className={styles.item}
            title="非主管全時員工薪資平均數"
          />
          <EsgItemBlock
            className={styles.item}
            title="非主管全時員工薪資中位數"
          />
          <EsgItemBlock className={styles.item} title="管理職女性主管佔比" />
        </div>
        <div className={styles.disclaimer}>
          資料來源：臺灣證券交易所 公開資訊觀測站
        </div>
      </div>
    </Card>
  );
};

EsgBlock.propTypes = {
  className: PropTypes.string,
  hasPreviewed: PropTypes.bool,
  showsToggle: PropTypes.bool,
};

export default EsgBlock;
