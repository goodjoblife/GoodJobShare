import React from 'react';
import { BasicPermissionSimpleBlock } from 'common/PermissionBlock';
import styles from './injectHideContentBlock.module.css';
import cn from 'classnames';
import { useShareLink } from 'hooks/experiments';

export default hideRange => rows => {
  const hideIndex = hideRange[0];
  const nHides = hideRange.length;
  const shareLink = useShareLink();

  // Replace original cells with locked cells
  // on small screens
  rows.forEach(row => {
    row.props.children.splice(
      hideIndex,
      nHides,
      ...row.props.children.slice(hideIndex, hideIndex + nHides).map(col => {
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
      rows[i].props.children.splice(
        hideIndex,
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
