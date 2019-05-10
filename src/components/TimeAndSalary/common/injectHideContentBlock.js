import React from 'react';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';
import styles from './injectHideContentBlock.module.css';
import cn from 'classnames';

export default hideRange => rows => {
  const hideIndex = hideRange[0];
  const nHides = hideRange.length;

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
          <BasicPermissionBlock
            rootClassName={styles.hideContentBlock}
            simple
          />,
        );
      }),
    );
  });
  if (rows.length > 0) {
    rows[0].props.children.splice(
      hideIndex,
      0,
      <td
        key="__hideContent"
        colSpan={nHides}
        rowSpan={rows.length}
        className={styles.cell}
      >
        <BasicPermissionBlock rootClassName={styles.hideContentBlock} simple />
      </td>,
    );
  }
};
