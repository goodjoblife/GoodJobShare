import React from 'react';

export default hideRange => rows => {
  const hideIndex = hideRange[0];
  const nHides = hideRange.length;

  rows.forEach((row, i) => {
    if (i === 0) {
      row.props.children.splice(
        hideIndex,
        nHides,
        <td key="__hideContent" colSpan={nHides} rowSpan={rows.length}>
          Blocked
        </td>,
      );
      return;
    }
    rows[i].props.children.splice(hideIndex, nHides);
  });
};
