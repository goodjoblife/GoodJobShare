import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import Modal from 'common/Modal';
import CallToLoginShareButton from './CallToLoginShareButton';
import styles from './PermissionBlock.module.css';
import ModalContent from './ModalContent';

const BasicPermissionSimpleBlock = ({ rootClassName, to }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = useCallback(() => setModalOpen(!isModalOpen), [
    isModalOpen,
  ]);

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
};

BasicPermissionSimpleBlock.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rootClassName: PropTypes.string,
};

export default BasicPermissionSimpleBlock;
