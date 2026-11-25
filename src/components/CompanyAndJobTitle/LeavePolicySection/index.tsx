import React from 'react';

import { HasPolicy } from 'apis/queryCompanyPolicyReviews';
import { Heading, Link, Wrapper } from 'common/base';
import Pagination from 'common/Pagination';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import { ColumnProps } from 'common/table/Column';
import Table from 'common/table/Table';
import BoxRenderer from 'components/common/StatusRenderer/BoxRenderer';
import { generateTabURL, tabTypeTranslation } from 'constants/companyJobTitle';
import FetchBox from 'utils/fetchBox';

import LeaveSectionBlock from '../LeaveSectionBlock';
import { usePageContext } from '../PageContextProvider';
import { LeaveBulletByLabel, LeaveSection } from '../policyTypes';
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

type ColumnConfig = ColumnProps & { id: string };

// 保留原文換行，並讓沒有空格的長字串在欄內換行，不溢出到隔壁欄
const renderExperience = (experience: string): React.ReactNode => (
  <span className={styles.experience}>{experience}</span>
);

type Props = {
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
  selectedHasPolicy: HasPolicy[];
  onToggleHasPolicy: (value: HasPolicy, y: number | null) => void;
  reviewsBox: FetchBox<{ records: LeavePolicyRecord[]; totalCount: number }>;
  page: number;
  pageSize: number;
};

const LeavePolicySection: React.FC<Props> = ({
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
  selectedHasPolicy,
  onToggleHasPolicy,
  reviewsBox,
  page,
  pageSize,
}) => {
  const { pageType, pageName, tabType } = usePageContext();
  const parentPath = generateTabURL({ pageType, pageName, tabType });
  const tabName = tabTypeTranslation[tabType];
  const [createPageLinkTo, handleSectionRef, sectionY] = useCreatePageLinkTo();

  const columns: ColumnConfig[] = [
    { id: 'jobTitle', title: '職稱', dataField: 'jobTitle' },
    {
      id: 'region',
      title: '廠區/分公司/部門/團隊',
      dataField: 'region',
      className: styles.regionColumn,
    },
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
    {
      id: 'experience',
      title: '經驗分享',
      dataField: 'experience',
      dataFormatter: renderExperience,
      className: styles.experienceColumn,
    },
    {
      id: 'sharedAt',
      title: '分享日期',
      dataField: 'sharedAt',
      className: styles.sharedAtColumn,
    },
  ];

  return (
    <>
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
        <div
          ref={handleSectionRef as React.Ref<HTMLDivElement>}
          className={styles.filter}
        >
          <span className={styles.filterLabel}>篩選：</span>
          {filterOptions.map(option => (
            <FilterToggleButton
              key={option.value}
              id={`filter-${option.value}`}
              label={option.label}
              checked={selectedHasPolicy.includes(option.value)}
              onChange={(): void => onToggleHasPolicy(option.value, sectionY)}
            />
          ))}
        </div>
        <BoxRenderer
          box={reviewsBox}
          render={({ records, totalCount }): React.ReactNode => (
            <>
              <Table data={records} primaryKey="id">
                {columns.map(
                  ({ id, ...colProps }): React.ReactNode => (
                    <Table.Column key={id} {...colProps} />
                  ),
                )}
              </Table>
              <Pagination
                totalCount={totalCount}
                unit={pageSize}
                currentPage={page}
                createPageLinkTo={createPageLinkTo}
              />
            </>
          )}
        />
      </Wrapper>
    </>
  );
};

export default LeavePolicySection;
