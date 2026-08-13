import cn from 'classnames';
import React from 'react';

import styles from './Table.module.css';

// Table 不知道每一列的形狀，dataField / dataFormatter 的 row 由呼叫端自己標。
// Column 本身只用到 children / title / className / alignRight，其餘兩個是
// 由父層 Table 讀取 element props 取用
export type ColumnProps = {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  alignRight?: boolean;
  // 這兩個由父層 Table 讀 element props 取用，Column 自己不碰
  /* eslint-disable react/no-unused-prop-types, @typescript-eslint/no-explicit-any */
  // 字串代表取該欄位（支援 'a.b' 這種點路徑），函式代表由整列算出內容
  dataField: string | ((row: any, index: number) => React.ReactNode);
  dataFormatter?: (value: any, row: any) => React.ReactNode;
  /* eslint-enable react/no-unused-prop-types, @typescript-eslint/no-explicit-any */
};

const Column: React.FC<ColumnProps> = ({
  children = null,
  title,
  className,
  alignRight,
}) => (
  <th className={cn(className, { [styles.alignRight]: alignRight })}>
    {children || title}
  </th>
);

export default Column;
