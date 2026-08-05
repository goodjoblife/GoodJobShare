import cn from 'classnames';
import React, { Children, Component, ReactElement } from 'react';

import Column, { ColumnProps } from './Column';
import styles from './Table.module.css';

// Table 產出的 <tr>，children 是各欄的 <td>。postProcessRows 的呼叫端
// （如 injectHideContentBlock）會就地改寫這個陣列
export type TableRow = ReactElement<{
  children: ReactElement<{ className?: string }>[];
}>;

export type TableProps = {
  children: React.ReactNode;
  className?: string;
  // 每一列的形狀由各個 Column 的 dataField / dataFormatter 決定，Table 不看
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  primaryKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postProcessRows?: (rows: TableRow[], data: any[]) => TableRow[];
};

// 取代原本的 R.path。@types/ramda 與專案安裝的 ramda 0.23 有簽名落差，
// 這裡只需要「照點路徑取值，中途遇到 null/undefined 就放棄」
const getByPath = (path: string[], obj: unknown): unknown =>
  path.reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);

class Table extends Component<TableProps> {
  static Column = Column;

  render(): React.ReactNode {
    const {
      data,
      primaryKey,
      children,
      className,
      postProcessRows = (rows: TableRow[]): TableRow[] => rows,
    } = this.props;

    const records = data.map((d, i) => {
      const record = Children.map(children, (child, idx) => {
        const col = child as ReactElement<ColumnProps>;
        let value: React.ReactNode;
        if (typeof col.props.dataField === 'function') {
          value = col.props.dataField(d, i);
        } else {
          // 沒有 dataFormatter 時直接渲染欄位值，由呼叫端保證它是可渲染的
          value = getByPath(
            col.props.dataField.split('.'),
            d,
          ) as React.ReactNode;
          if (col.props.dataFormatter) {
            value = col.props.dataFormatter(value, d);
          }
        }

        return (
          <td
            key={idx}
            data-th={col.props.title}
            className={cn({ [styles.alignRight]: col.props.alignRight })}
          >
            {value}
          </td>
        );
      });
      return <tr key={d[primaryKey] || i}>{record}</tr>;
    }) as TableRow[];

    const postRecords = postProcessRows(records, data);

    return (
      <table className={cn([styles.rwdTable, className])}>
        <thead>
          <tr>{children}</tr>
        </thead>
        <tbody>{postRecords}</tbody>
      </table>
    );
  }
}

export default Table;
