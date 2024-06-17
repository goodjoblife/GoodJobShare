import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './PermissionBlock.module.css';
import LoginToUnlock from './LoginToUnlock';

const BasicPermissionBlock = ({ rootClassName, to }) => {
  return (
    <div className={cn(styles.permissionBlock, rootClassName)}>
      <div className={styles.container}>
        <LoginToUnlock to={to} />
      </div>
    </div>
  );
};

BasicPermissionBlock.propTypes = {
  rootClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default BasicPermissionBlock;
