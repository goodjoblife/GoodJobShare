import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import linkStyles from 'common/base/Link.module.css';
import Card from 'common/Card';
import Select from 'common/form/Select';
import Caret from 'common/icons/Caret';
import Info from 'common/icons/Info';
import { formatNumberWithSign } from 'utils/stringUtil';

import styles from './EsgBlock.module.css';
import { getAvailableYears, getStatisticsByYear } from './esgYearUtils';
import overviewStyles from '../../Overview/Overview.module.css';

type EsgItemBlockProps = {
  className?: string;
  title: string;
  year: number;
  value: number;
  valueCompared?: number;
  unit?: string;
};

type EsgBlockProps = {
  className?: string;
  showsToggle?: boolean;
  hasPreviewed?: boolean;
  data: ESGSalaryData;
  yearSelectInContent?: boolean;
};

const EsgItemBlock: React.FC<EsgItemBlockProps> = ({
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
          valueCompared && value >= valueCompared
            ? styles.positive
            : styles.negative,
        )}
      >
        {valueCompared &&
          formatNumberWithSign(
            ((value - valueCompared) / valueCompared) * 100,
            0,
          )}
        %
      </span>
    </div>
  </Card>
);

const EsgBlock: React.FC<EsgBlockProps> = ({
  className,
  showsToggle = true,
  hasPreviewed,
  data,
  yearSelectInContent = false,
}) => {
  const [isCollapsed, setCollapsed] = useState(hasPreviewed);

  const availableYears = useMemo(() => getAvailableYears(data), [data]);
  const [selectedYear, setSelectedYear] = useState(() => availableYears[0]);
  useEffect(() => {
    setSelectedYear(availableYears[0]);
  }, [availableYears]);

  const {
    avgSalaryStatisticsItem,
    nonManagerAvgSalaryStatisticsItem,
    nonManagerMedianSalaryStatisticsItem,
    femaleManagerStatisticsItem,
  } = useMemo(() => getStatisticsByYear(data, selectedYear), [
    data,
    selectedYear,
  ]);

  const yearOptions = useMemo(
    () => availableYears.map(year => ({ label: `${year}`, value: year })),
    [availableYears],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed(isCollapsed => !isCollapsed);
  }, []);

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(Number(e.target.value));
      setCollapsed(false);
    },
    [],
  );

  const yearSelect = availableYears.length > 1 && (
    <div
      className={
        yearSelectInContent ? styles.mobileYearSelect : styles.yearSelect
      }
    >
      <Select
        hasNullOption={false}
        value={selectedYear}
        options={yearOptions}
        onChange={handleYearChange}
      />
    </div>
  );

  return (
    <Card className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div className={overviewStyles.title}>
          企業ESG公開薪資揭露
          {showsToggle && (
            <button
              className={cn(styles.toggle, { [styles.collapsed]: isCollapsed })}
              aria-expanded={!isCollapsed}
              onClick={toggleCollapsed}
            >
              <Caret />
            </button>
          )}
        </div>
        {!yearSelectInContent && yearSelect}
      </div>
      <div
        className={cn(styles.content, {
          [styles.collapsed]: isCollapsed,
        })}
      >
        {yearSelectInContent && yearSelect}

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

export default EsgBlock;
