import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CallToLoginShareButton from './CallToLoginShareButton';
import styles from './PermissionBlock.module.css';
import ModalContent from './ModalContent';

const BasicPermissionBlock = ({ rootClassName, to }) => {
  return (
    <div className={cn(styles.permissionBlock, rootClassName)}>
      <div className={styles.container}>
        <ModalContent />
        <div className={styles.ctaButtonContainer}>
          <CallToLoginShareButton to={to} isLoginText="立即分享" />
        </div>
      </div>
    </div>
  );
};

BasicPermissionBlock.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rootClassName: PropTypes.string,
};

export default BasicPermissionBlock;
