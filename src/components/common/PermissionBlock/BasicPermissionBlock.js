import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import Modal from 'common/Modal';
import CallToLoginShareButton from './CallToLoginShareButton';
import styles from './PermissionBlock.module.css';
import ModalContent from './ModalContent';

const BasicPermissionBlock = ({ simple, to, rootClassName }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = useCallback(() => setModalOpen(!isModalOpen), [
    isModalOpen,
  ]);

  if (simple) {
    return (
      <div
        className={cn(styles.permissionBlock, rootClassName, styles.simple)}
        onClick={toggleModal}
      >
        <div className={styles.container}>
          <div className={styles.headingContainer}>
            <FontAwesomeIcon icon={faLock} className={styles.headingIcon} />
            <Modal
              isOpen={isModalOpen}
              close={toggleModal}
              closableOnClickOutside
            >
              <ModalContent />
              <div className={styles.ctaButtonContainer}>
                <CallToLoginShareButton
                  to={to}
                  onAuthenticatedClick={toggleModal}
                  isLoginText="立即分享"
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }

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
  simple: PropTypes.bool,
};

BasicPermissionBlock.defaultProps = {
  rootClassName: '',
  simple: false,
};

export default BasicPermissionBlock;
