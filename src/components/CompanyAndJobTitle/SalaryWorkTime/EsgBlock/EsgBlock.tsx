import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import linkStyles from 'common/base/Link.module.css';
import Card from 'common/Card';
import Select from 'common/form/Select';
import Caret from 'common/icons/Caret';
import Info from 'common/icons/Info';
import { EsgYearStatistics } from 'utils/esgYearUtils';
import { formatNumberWithSign } from 'utils/stringUtil';

import styles from './EsgBlock.module.css';
import {
  ESG_DISCLOSURE_URL,
  EsgIndicator,
  esgIndicatorDescription,
} from './esgIndicator';
import EsgInfoModal from './EsgInfoModal';
import snippetStyles from '../../SnippetBlock.module.css';

type EsgItemBlockProps = {
  className?: string;
  indicator: EsgIndicator;
  year: number;
  value: number;
  valueCompared?: number;
  unit?: string;
};

type EsgBlockProps = {
  className?: string;
  showsToggle?: boolean;
  hasPreviewed?: boolean;
  data: EsgYearStatistics[];
  yearSelectInContent?: boolean;
};

const stopPropagation = (e: React.MouseEvent): void => {
  e.stopPropagation();
};

const EsgItemBlock: React.FC<EsgItemBlockProps> = ({
  className,
  indicator,
  year,
  value,
  valueCompared,
  unit,
}) => {
  const [isInfoOpen, setInfoOpen] = useState(false);

  const openInfo = useCallback(() => {
    setInfoOpen(true);
  }, []);

  const closeInfo = useCallback(() => {
    setInfoOpen(false);
  }, []);

  return (
    <Card className={className} onClick={stopPropagation}>
      <div className={styles.badge}>{year} 年</div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{indicator}</div>
        <button
          className={styles.infoButton}
          aria-label={`${indicator}說明`}
          onClick={openInfo}
        >
          <Info className={styles.icon} />
        </button>
      </div>
      {isInfoOpen && (
        <EsgInfoModal close={closeInfo} title={indicator}>
          {esgIndicatorDescription[indicator]}
        </EsgInfoModal>
      )}
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
};

const EsgBlock: React.FC<EsgBlockProps> = ({
  className,
  showsToggle = true,
  hasPreviewed,
  data,
  yearSelectInContent = false,
}) => {
  const [isCollapsed, setCollapsed] = useState(hasPreviewed);

  // data 依年份新到舊排序；預設顯示最新一年，可透過年度選單切換。
  const availableYears = useMemo(() => data.map(item => item.year), [data]);
  const [selectedYear, setSelectedYear] = useState(() => availableYears[0]);
  useEffect(() => {
    setSelectedYear(availableYears[0]);
  }, [availableYears]);

  const selectedYearStatistics = useMemo(
    () => data.find(item => item.year === selectedYear) || null,
    [data, selectedYear],
  );
  const {
    avgSalaryStatisticsItem = null,
    nonManagerAvgSalaryStatisticsItem = null,
    nonManagerMedianSalaryStatisticsItem = null,
    femaleManagerStatisticsItem = null,
  } = selectedYearStatistics || {};

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
      onClick={stopPropagation}
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
    <Card
      className={cn(
        styles.card,
        { [styles.clickable]: showsToggle },
        className,
      )}
      onClick={showsToggle ? toggleCollapsed : undefined}
    >
      <div className={styles.header}>
        <div className={snippetStyles.title}>
          企業ESG公開薪資揭露
          {showsToggle && (
            <button
              className={cn(styles.toggle, { [styles.collapsed]: isCollapsed })}
              aria-expanded={!isCollapsed}
              aria-label="展開/收合企業ESG公開薪資揭露"
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
              indicator={EsgIndicator.AVG_SALARY}
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
              indicator={EsgIndicator.NON_MANAGER_AVG_SALARY}
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
              indicator={EsgIndicator.NON_MANAGER_MEDIAN_SALARY}
              year={nonManagerMedianSalaryStatisticsItem.year}
              value={nonManagerMedianSalaryStatisticsItem.median / 10000}
              unit="萬 / 年"
            />
          )}
          {femaleManagerStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              indicator={EsgIndicator.FEMALE_MANAGER_PERCENTAGE}
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
            href={ESG_DISCLOSURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopPropagation}
          >
            臺灣證券交易所 公開資訊觀測站
          </a>
        </div>
      </div>
    </Card>
  );
};

export default EsgBlock;
