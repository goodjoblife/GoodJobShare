import React, { PropTypes } from 'react';
import cn from 'classnames';

import Base from './Base';
import Explanation from '../../images/explanation.svg';
import styles from './Base.module.css';

const Report = ({ onClick, toggled, ...restProps }) => (
  <Base {...restProps}>
    <Explanation
      onClick={onClick}
      className={cn(
        toggled ? styles.toggled : '',
        onClick ? styles.clickable : ''
      )}
    />
  </Base>
);

Report.propTypes = {
  fontClass: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.number,
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Report;
