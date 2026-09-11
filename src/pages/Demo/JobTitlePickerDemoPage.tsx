import React, { useState } from 'react';

import { Heading, Wrapper } from 'common/base';
import BreadCrumb from 'common/BreadCrumb';
import TabLinkGroup from 'common/TabLinkGroup';
import wrapperStyles from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper.module.css';
import searchRowStyles from 'components/CompanyAndJobTitle/SalaryWorkTime/SalaryWorkTime.module.css';
import JobTitlePicker from 'components/Demo/JobTitlePicker';
import {
  buildMockRecordPool,
  TabKey,
  TABS,
} from 'components/Demo/JobTitlePicker/mockData';
import {
  generateIndexURL,
  generatePageURL,
  PageType,
  pageTypeTranslation,
  TabType,
  tabTypeDetailTranslation,
  tabTypeTranslation,
} from 'constants/companyJobTitle';

import styles from './JobTitlePickerDemoPage.module.css';

const COMPANY_NAME = '國泰人壽保險股份有限公司';

const TAB_TYPE_BY_KEY: Record<TabKey, TabType> = {
  salary: TabType.TIME_AND_SALARY,
  interview: TabType.INTERVIEW_EXPERIENCE,
  work: TabType.WORK_EXPERIENCE,
};

// 這三個路徑刻意比照真實公司頁的 tab URL 命名（salary-work-times /
// interview-experiences / work-experiences），但掛在 /demo 底下，
// 不會動到 constants/companyJobTitle.ts 的真實 URL 產生規則。
const DEMO_TAB_PATH: Record<TabKey, string> = {
  salary: '/demo/job-title-picker/salary-work-times',
  interview: '/demo/job-title-picker/interview-experiences',
  work: '/demo/job-title-picker/work-experiences',
};

const TAB_ORDER: TabKey[] = ['salary', 'interview', 'work'];

type LogEntry = {
  time: string;
  label: string;
  detail: string;
};

type Props = {
  tabKey: TabKey;
};

// Sandbox demo：公司頁「依職稱篩選」多選瀏覽功能的原型頁面。
// 麵包屑／標題／分頁列直接沿用真實的 BreadCrumb、Heading、TabLinkGroup 元件與
// CompanyAndJobTitleWrapper 的樣式，只有搜尋列換成新的 JobTitlePicker、
// 結果清單用假資料——避免整頁長得跟真實網站不一樣。
// 三個 tab 各自是獨立路由（如同真實頁面），不是同頁切換 state。
const JobTitlePickerDemoPage: React.FC<Props> = ({ tabKey }) => {
  const [appliedTitles, setAppliedTitles] = useState<string[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);

  const tabType = TAB_TYPE_BY_KEY[tabKey];
  const tab = TABS[tabKey];
  const recordPool = buildMockRecordPool(tabKey, tab.jobTitles);
  const results = appliedTitles.length
    ? recordPool.filter(r => appliedTitles.includes(r.title))
    : recordPool.slice(0, 12);

  const pushLog = (label: string, detail: string): void => {
    const time = new Date().toLocaleTimeString('zh-TW', { hour12: false });
    setLog(prev => [{ time, label, detail }, ...prev].slice(0, 20));
  };

  const breadcrumbData = [
    { label: 'GoodJob', to: '/' },
    {
      label: pageTypeTranslation[PageType.COMPANY],
      to: generateIndexURL({ pageType: PageType.COMPANY }),
    },
    {
      label: COMPANY_NAME,
      to: generatePageURL({
        pageType: PageType.COMPANY,
        pageName: COMPANY_NAME,
      }),
    },
    { label: tabTypeTranslation[tabType], to: DEMO_TAB_PATH[tabKey] },
  ];

  const tabLinkOptions = TAB_ORDER.map(key => ({
    label: tabTypeTranslation[TAB_TYPE_BY_KEY[key]],
    to: DEMO_TAB_PATH[key],
    exact: true,
  }));

  return (
    <div>
      <Wrapper size="l">
        <div style={{ marginBottom: '20px' }}>
          <BreadCrumb data={breadcrumbData} />
        </div>
        <div className={wrapperStyles.titleContainer}>
          <Heading className={wrapperStyles.title}>
            {COMPANY_NAME} {tabTypeDetailTranslation[tabType]}
          </Heading>
          <span className={styles.demoBadge}>Prototype demo・假資料</span>
        </div>
        <TabLinkGroup
          className=""
          options={tabLinkOptions}
          style={{ marginBottom: '24px' }}
        />
      </Wrapper>

      <Wrapper size="l" className={searchRowStyles.searchbar}>
        <JobTitlePicker
          key={tabKey}
          jobTitles={tab.jobTitles}
          appliedTitles={appliedTitles}
          onApply={(titles): void => {
            setAppliedTitles(titles);
            pushLog('SEARCH_JOB_TITLE_BY_CHIP', titles.join('、') || '(清空)');
          }}
          onRemoveOne={(title): void => {
            setAppliedTitles(prev => prev.filter(t => t !== title));
            pushLog('REMOVE_JOB_TITLE_TAG', title);
          }}
          onClearAll={(): void => {
            setAppliedTitles([]);
            pushLog('CLEAR_ALL_JOB_TITLES', tabTypeTranslation[tabType]);
          }}
        />
      </Wrapper>

      <Wrapper size="l">
        <div className={styles.resultsHead}>
          <h2 className={styles.resultsTitle}>{tab.resultLabel}</h2>
          <span className={styles.resultsCount}>
            {appliedTitles.length
              ? `符合 ${results.length} 筆（已篩選 ${appliedTitles.length} 個職稱）`
              : `顯示最新 ${results.length} 筆（共 ${recordPool.length} 筆）`}
          </span>
        </div>
        {results.length === 0 ? (
          <div className={styles.noResults}>這個篩選條件下沒有資料</div>
        ) : (
          <div className={styles.list}>
            {results.map((r, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className={styles.row} key={`${r.title}-${i}`}>
                <span className={styles.rowTitle}>{r.title}</span>
                <span className={styles.rowFigure}>{r.figure}</span>
                <span className={styles.rowMeta}>{r.meta}</span>
              </div>
            ))}
          </div>
        )}
      </Wrapper>

      <details className={styles.eventLog}>
        <summary className={styles.eventLogHead}>事件紀錄（demo）</summary>
        <div className={styles.eventLogList}>
          {log.length === 0 ? (
            <div className={styles.eventLogEmpty}>尚無事件</div>
          ) : (
            log.map((entry, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className={styles.eventLogLine} key={i}>
                {entry.time} <b>{entry.label}</b> {entry.detail}
              </div>
            ))
          )}
        </div>
      </details>
    </div>
  );
};

export default JobTitlePickerDemoPage;
