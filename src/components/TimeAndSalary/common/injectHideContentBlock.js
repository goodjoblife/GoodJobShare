import React from 'react';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';
import styles from './injectHideContentBlock.module.css';

export default hideRange => rows => {
  const hideIndex = hideRange[0];
  const nHides = hideRange.length;

  rows.forEach((row, i) => {
    if (i === 0) {
      row.props.children.splice(
        hideIndex,
        nHides,
        <td
          key="__hideContent"
          colSpan={nHides}
          rowSpan={rows.length}
          className={styles.cell}
        >
          <BasicPermissionBlock
            rootClassName={styles.hideContentBlock}
            simple
          />
        </td>,
      );
      return;
    }
    rows[i].props.children.splice(hideIndex, nHides);
  });
};
