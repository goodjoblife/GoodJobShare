import React from 'react';

import { HasPolicy } from 'apis/queryCompanyPolicyReviews';
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
import LeaveSectionBlock, {
  LeaveBulletByLabel,
  LeaveSection,
} from '../LeaveSectionBlock';
import FilterToggleButton from './FilterToggleButton';
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

export type FilterOption = {
  value: HasPolicy;
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
  title: string;
  icon?: string;
  availabilityTitle: string;
  availabilityBulletByLabel?: LeaveBulletByLabel;
  complianceTitle?: string;
  complianceBulletByLabel?: LeaveBulletByLabel;
  section: LeaveSection;
  availabilityColumnTitle: string;
  complianceColumnTitle?: string;
  filterOptions: FilterOption[];
  selectedValues: HasPolicy[];
  onToggleValue: (value: HasPolicy) => void;
  records: LeavePolicyRecord[];
  totalCount: number;
  page: number;
  pageSize: number;
};

const LeavePolicySection: React.FC<Props> = ({
  pageType,
  pageName,
  tabType,
  title,
  icon,
  availabilityTitle,
  availabilityBulletByLabel,
  complianceTitle,
  complianceBulletByLabel,
  section,
  availabilityColumnTitle,
  complianceColumnTitle,
  filterOptions,
  selectedValues,
  onToggleValue,
  records,
  totalCount,
  page,
  pageSize,
}) => {
  const parentPath = generateTabURL({ pageType, pageName, tabType });
  const tabName = tabTypeTranslation[tabType];
  const [createPageLinkTo] = useCreatePageLinkTo();

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
        <Heading className={styles.title}>{title}</Heading>
        <LeaveSectionBlock
          title={title}
          icon={icon}
          availabilityTitle={availabilityTitle}
          availabilityBulletByLabel={availabilityBulletByLabel}
          complianceTitle={complianceTitle}
          complianceBulletByLabel={complianceBulletByLabel}
          section={section}
        />
      </Wrapper>
      <Wrapper size="l" className={styles.content}>
        <div className={styles.filter}>
          <span className={styles.filterLabel}>篩選：</span>
          {filterOptions.map(option => (
            <FilterToggleButton
              key={option.value}
              id={`filter-${option.value}`}
              label={option.label}
              checked={selectedValues.includes(option.value)}
              onChange={(): void => onToggleValue(option.value)}
            />
          ))}
        </div>
        <Table data={records} primaryKey="id">
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
