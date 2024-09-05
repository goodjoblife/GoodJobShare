import React from 'react';
import { BasicPermissionSimpleBlock } from 'common/PermissionBlock';
import styles from './injectHideContentBlock.module.css';
import cn from 'classnames';
import { useShareLink } from 'hooks/experiments';

export default ({ rows, data, fromCol, toCol, isMySalaryWorkTimeId }) => {
  const nHides = toCol - fromCol + 1;
  const shareLink = useShareLink();

  // Replace original cells with locked cells
  // on small screens
  rows.forEach((row, i) => {
    const d = data[i];
    const isMySalaryWorkTime = isMySalaryWorkTimeId(d.id);
    if (isMySalaryWorkTime) return;

    row.props.children.splice(
      fromCol,
      nHides,
      ...row.props.children.slice(fromCol, fromCol + nHides).map(col => {
        return React.cloneElement(
          col,
          {
            className: cn(col.props.className, styles.cell, styles.mobile),
          },
          <BasicPermissionSimpleBlock
            to={shareLink}
            rootClassName={styles.hideContentBlock}
          />,
        );
      }),
    );
  });

  // Add locked cells on regular screens
  // that spans multiple columns
  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      const d = data[i];
      const isMySalaryWorkTime = isMySalaryWorkTimeId(d.id);
      if (isMySalaryWorkTime) continue;

      const row = rows[i];
      row.props.children.splice(
        fromCol,
        0,
        <td key="__hideContent" colSpan={nHides} className={styles.cell}>
          <BasicPermissionSimpleBlock
            to={shareLink}
            rootClassName={styles.hideContentBlock}
          />
        </td>,
      );
    }
  }
};
