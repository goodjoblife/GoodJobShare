import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import linkStyles from 'common/base/Link.module.css';
import Caret from 'common/icons/Caret';
import Card from 'common/Card';
import Info from 'common/icons/Info';
import styles from './EsgBlock.module.css';
import overviewStyles from '../../Overview/Overview.module.css';

const EsgItemBlock = ({
  className,
  title,
  year,
  value,
  valueCompared,
  unit,
}) => (
  <Card className={className}>
    <div className={styles.badge}>{year} 年</div>
    <div className={styles.titleContainer}>
      <div className={styles.title}>{title}</div>
      <Info className={styles.icon} />
    </div>
    <div className={styles.data}>
      <span className={styles.value}>{value}</span> {unit}
    </div>
    <div
      className={styles.caption}
      style={{ visibility: valueCompared ? 'visible' : 'hidden' }}
    >
      與同業相比
      <span className={styles.value}>
        {(((value - valueCompared) / valueCompared) * 100).toFixed(0)}%
      </span>
    </div>
  </Card>
);

EsgItemBlock.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.number.isRequired,
  valueCompared: PropTypes.number,
  year: PropTypes.number.isRequired,
};

const EsgBlock = ({
  className,
  showsToggle = true,
  hasPreviewed,
  avgSalaryStatistics,
  nonManagerAvgSalaryStatistics,
  nonManagerMedianSalaryStatistics,
  femaleManagerStatistics,
}) => {
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
          {avgSalaryStatistics && (
            <EsgItemBlock
              className={styles.item}
              title="員工薪資平均數"
              year={avgSalaryStatistics.year}
              value={avgSalaryStatistics.average / 10000}
              valueCompared={avgSalaryStatistics.sameIndustryAverage}
              unit="萬 / 年"
            />
          )}
          {nonManagerAvgSalaryStatistics && (
            <EsgItemBlock
              className={styles.item}
              title="非主管全時員工薪資平均數"
              year={nonManagerAvgSalaryStatistics.year}
              value={nonManagerAvgSalaryStatistics.average / 10000}
              valueCompared={nonManagerAvgSalaryStatistics.sameIndustryAverage}
              unit="萬 / 年"
            />
          )}
          {nonManagerMedianSalaryStatistics && (
            <EsgItemBlock
              className={styles.item}
              title="非主管全時員工薪資中位數"
              year={nonManagerMedianSalaryStatistics.year}
              value={nonManagerMedianSalaryStatistics.median / 10000}
              unit="萬 / 年"
            />
          )}
          {femaleManagerStatistics && (
            <EsgItemBlock
              className={styles.item}
              title="管理職女性主管佔比"
              year={femaleManagerStatistics.year}
              value={femaleManagerStatistics.percentage * 100}
              unit="%"
            />
          )}
        </div>
        <div className={styles.disclaimer}>
          資料來源：
          <a
            className={linkStyles.link}
            href="https://mops.twse.com.tw/mops/web/t214sb01"
            target="_blank"
            rel="noopener noreferrer"
          >
            臺灣證券交易所 公開資訊觀測站
          </a>
        </div>
      </div>
    </Card>
  );
};

EsgBlock.propTypes = {
  avgSalaryStatistics: PropTypes.shape({
    average: PropTypes.number,
    sameIndustryAverage: PropTypes.number,
    year: PropTypes.number,
  }),
  className: PropTypes.string,
  femaleManagerStatistics: PropTypes.shape({
    percentage: PropTypes.number,
    year: PropTypes.number,
  }),
  hasPreviewed: PropTypes.bool,
  nonManagerAvgSalaryStatistics: PropTypes.shape({
    average: PropTypes.number,
    sameIndustryAverage: PropTypes.number,
    year: PropTypes.number,
  }),
  nonManagerMedianSalaryStatistics: PropTypes.shape({
    median: PropTypes.number,
    year: PropTypes.number,
  }),
  showsToggle: PropTypes.bool,
};

export default EsgBlock;
