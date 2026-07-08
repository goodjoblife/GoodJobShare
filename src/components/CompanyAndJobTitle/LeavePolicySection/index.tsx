import cn from 'classnames';
import React, { useState } from 'react';

import { Heading, Link, Wrapper } from 'common/base';
import Pagination from 'common/Pagination';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import Table from 'common/table/Table';
import {
  generateTabURL,
  PageType,
  TabType,
  tabTypeTranslation,
} from 'constants/companyJobTitle';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import LeaveSectionBlock, { LeaveSection } from '../LeaveSectionBlock';
import styles from './styles.module.css';

export type LeavePolicyRecord = {
  id: string;
  jobTitle: string;
  region: string;
  availability: string;
  compliance?: string;
  experience: string;
  sharedAt: string;
};

type FilterOption = {
  value: string;
  label: string;
};

type ColumnConfig = {
  id: string;
  title: string;
  dataField: string;
};

// Table.Column is a JS component; cast to accept arbitrary props including dataField
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableColumn = Table.Column as any;

type Props = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  section: LeaveSection;
  availabilityColumnTitle: string;
  complianceColumnTitle?: string;
  filterOptions: FilterOption[];
  records: LeavePolicyRecord[];
  page: number;
  pageSize: number;
};

const LeavePolicySection: React.FC<Props> = ({
  pageType,
  pageName,
  tabType,
  section,
  availabilityColumnTitle,
  complianceColumnTitle,
  filterOptions,
  records,
  page,
  pageSize,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    filterOptions.map(o => o.value),
  );
  const parentPath = generateTabURL({ pageType, pageName, tabType });
  const tabName = tabTypeTranslation[tabType];
  const [createPageLinkTo] = useCreatePageLinkTo();

  const toggleValue = (value: string): void => {
    setSelectedValues(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
    );
  };

  const filteredRecords = records.filter(r =>
    selectedValues.includes(r.availability),
  );
  const totalCount = filteredRecords.length;
  const start = (page - 1) * pageSize;
  const pageRecords = filteredRecords.slice(start, start + pageSize);

  const columns: ColumnConfig[] = [
    { id: 'jobTitle', title: '職稱', dataField: 'jobTitle' },
    { id: 'region', title: '廠區/分公司/部門/團隊', dataField: 'region' },
    {
      id: 'availability',
      title: availabilityColumnTitle,
      dataField: 'availability',
    },
    ...(complianceColumnTitle
      ? [
          {
            id: 'compliance',
            title: complianceColumnTitle,
            dataField: 'compliance',
          },
        ]
      : []),
    { id: 'experience', title: '經驗分享', dataField: 'experience' },
    { id: 'sharedAt', title: '分享日期', dataField: 'sharedAt' },
  ];

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      <Wrapper size="l">
        <Link to={parentPath}>&lt;&lt;回到{tabName}分頁</Link>
        <Heading className={styles.title}>{section.title}</Heading>
        <LeaveSectionBlock section={section} />
      </Wrapper>
      <Wrapper size="m">
        <div className={styles.filter}>
          <span className={styles.filterLabel}>篩選：</span>
          {filterOptions.map(option => (
            <button
              key={option.value}
              className={cn(styles.filterButton, {
                [styles.filterButtonChecked]: selectedValues.includes(
                  option.value,
                ),
              })}
              onClick={(): void => toggleValue(option.value)}
            >
              <span className={styles.checkbox}>
                {selectedValues.includes(option.value) ? '✓' : '□'}
              </span>
              {option.label}
            </button>
          ))}
        </div>
        <Table data={pageRecords} primaryKey="id">
          {columns.map(
            ({ id, ...colProps }): React.ReactNode => (
              <TableColumn key={id} {...colProps} />
            ),
          )}
        </Table>
        <Pagination
          totalCount={totalCount}
          unit={pageSize}
          currentPage={page}
          createPageLinkTo={createPageLinkTo}
        />
      </Wrapper>
    </CompanyAndJobTitleWrapper>
  );
};

export default LeavePolicySection;
