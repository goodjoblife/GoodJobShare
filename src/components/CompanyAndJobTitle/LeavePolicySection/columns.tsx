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
      width: 120,
    },
    {
      id: 'region',
      title: '廠區/分公司/部門/團隊',
      dataField: 'region',
      width: 80,
    },
    {
      id: 'availability',
      title: availabilityColumnTitle,
      dataField: 'availability',
      width: 80,
    },
    {
      id: 'compliance',
      title: complianceColumnTitle,
      dataField: 'compliance',
      width: 80,
      isVisible: Boolean(complianceColumnTitle),
    },
    {
      id: 'experience',
      title: '經驗分享',
      dataField: 'experience',
      dataFormatter: (experience: string): React.ReactNode => (
        <span className={styles.experience}>{experience}</span>
      ),
      width: '40%',
    },
    {
      id: 'sharedAt',
      title: '分享日期',
      dataField: 'sharedAt',
      width: 80,
    },
  ];

  return columns.filter(({ isVisible = true }) => isVisible);
};
