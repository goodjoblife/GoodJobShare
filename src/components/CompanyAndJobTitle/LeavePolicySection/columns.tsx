import React from 'react';

import { ColumnProps } from 'common/table/Column';

import styles from './styles.module.css';

type ColumnConfig = ColumnProps & { id: string; isVisible?: boolean };

type GetTableColumnsParams = {
  availabilityColumnTitle: string;
  complianceColumnTitle?: string;
};

const getTableColumns = ({
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
      className: styles.narrowColumn,
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
      isVisible: Boolean(complianceColumnTitle),
    },
    {
      id: 'experience',
      title: '經驗分享',
      dataField: 'experience',
      dataFormatter: (experience: string): React.ReactNode => (
        <span className={styles.experience}>{experience}</span>
      ),
      className: styles.wideColumn,
    },
    {
      id: 'sharedAt',
      title: '分享日期',
      dataField: 'sharedAt',
      className: styles.narrowColumn,
    },
  ];

  return columns.filter(({ isVisible = true }) => isVisible);
};

export default getTableColumns;
