import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import linkStyles from 'common/base/Link.module.css';
import Caret from 'common/icons/Caret';
import Card from 'common/Card';
import Info from 'common/icons/Info';
import Select from 'common/form/Select';
import styles from './EsgBlock.module.css';
import overviewStyles from '../../Overview/Overview.module.css';
import { formatNumberWithSign } from 'utils/stringUtil';
import { getAvailableYears, getStatisticsByYear } from './esgYearUtils';

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
      <span className={styles.value}>{value.toFixed(1)}</span> {unit}
    </div>
    <div
      className={styles.caption}
      style={{ visibility: valueCompared ? 'visible' : 'hidden' }}
    >
      與同業相比
      <span
        className={cn(
          styles.value,
          value >= valueCompared ? styles.positive : styles.negative,
        )}
      >
        {formatNumberWithSign(
          ((value - valueCompared) / valueCompared) * 100,
          0,
        )}
        %
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
  esgSalaryData,
}) => {
  const [isCollapsed, setCollapsed] = useState(hasPreviewed);

  const availableYears = useMemo(() => getAvailableYears(esgSalaryData), [
    esgSalaryData,
  ]);
  const [selectedYear, setSelectedYear] = useState(() => availableYears[0]);

  const {
    avgSalaryStatisticsItem,
    nonManagerAvgSalaryStatisticsItem,
    nonManagerMedianSalaryStatisticsItem,
    femaleManagerStatisticsItem,
  } = useMemo(() => getStatisticsByYear(esgSalaryData, selectedYear), [
    esgSalaryData,
    selectedYear,
  ]);

  const yearOptions = useMemo(
    () => availableYears.map(year => ({ label: `${year}`, value: year })),
    [availableYears],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed(isCollapsed => !isCollapsed);
  }, []);

  const handleYearChange = useCallback(e => {
    setSelectedYear(Number(e.target.value));
  }, []);

  return (
    <Card className={cn(styles.card, className)}>
      <div className={styles.header}>
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
        {availableYears.length > 0 && (
          <div className={styles.yearSelect}>
            <Select
              hasNullOption={false}
              value={selectedYear}
              options={yearOptions}
              onChange={handleYearChange}
            />
          </div>
        )}
      </div>
      <div
        className={cn(styles.content, {
          [styles.collapsed]: isCollapsed,
        })}
      >
        <div className={styles.items}>
          {avgSalaryStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="員工薪資平均數"
              year={avgSalaryStatisticsItem.year}
              value={avgSalaryStatisticsItem.average / 10000}
              valueCompared={
                avgSalaryStatisticsItem.sameIndustryAverage / 10000
              }
              unit="萬 / 年"
            />
          )}
          {nonManagerAvgSalaryStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="非主管全時員工薪資平均數"
              year={nonManagerAvgSalaryStatisticsItem.year}
              value={nonManagerAvgSalaryStatisticsItem.average / 10000}
              valueCompared={
                nonManagerAvgSalaryStatisticsItem.sameIndustryAverage / 10000
              }
              unit="萬 / 年"
            />
          )}
          {nonManagerMedianSalaryStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="非主管全時員工薪資中位數"
              year={nonManagerMedianSalaryStatisticsItem.year}
              value={nonManagerMedianSalaryStatisticsItem.median / 10000}
              unit="萬 / 年"
            />
          )}
          {femaleManagerStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="管理職女性主管佔比"
              year={femaleManagerStatisticsItem.year}
              value={femaleManagerStatisticsItem.percentage * 100}
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

const statisticsArrayPropType = PropTypes.arrayOf(
  PropTypes.shape({ year: PropTypes.number }),
);

EsgBlock.propTypes = {
  className: PropTypes.string,
  esgSalaryData: PropTypes.shape({
    avgSalaryStatistics: statisticsArrayPropType,
    femaleManagerStatistics: statisticsArrayPropType,
    nonManagerAvgSalaryStatistics: statisticsArrayPropType,
    nonManagerMedianSalaryStatistics: statisticsArrayPropType,
  }),
  hasPreviewed: PropTypes.bool,
  showsToggle: PropTypes.bool,
};

export default EsgBlock;
