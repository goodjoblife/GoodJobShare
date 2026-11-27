import React from 'react';

import { ColumnProps } from 'common/table/Column';

import styles from './styles.module.css';

type ColumnConfig = ColumnProps & { id: string; isVisible?: boolean };

type GetTableColumnsParams = {
  availabilityColumnTitle: string;
  complianceColumnTitle?: string;
};

export const getTableColumns = ({
  availabilityColumnTitle,
  complianceColumnTitle,
}: GetTableColumnsParams): ColumnConfig[] => {
  const columns: ColumnConfig[] = [
    {
      id: 'jobTitle',
      title: '職稱',
      dataField: 'jobTitle',
    },
    {
      id: 'region',
      title: '廠區/分公司/部門/團隊',
      dataField: 'region',
    },
    {
      id: 'availability',
      title: availabilityColumnTitle,
      dataField: 'availability',
    },
    {
      id: 'compliance',
      title: complianceColumnTitle,
      dataField: 'compliance',
      width: 138,
      isVisible: Boolean(complianceColumnTitle),
    },
    {
      id: 'experience',
      title: '經驗分享',
      dataField: 'experience',
      dataFormatter: (experience: string): React.ReactNode => (
        <span className={styles.experience}>{experience}</span>
      ),
      width: '30%',
    },
    {
      id: 'sharedAt',
      title: '分享日期',
      dataField: 'sharedAt',
      width: 100,
    },
  ];

  return columns.filter(({ isVisible = true }) => isVisible);
};
