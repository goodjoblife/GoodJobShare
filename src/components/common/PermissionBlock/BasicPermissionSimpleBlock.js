import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import Modal from 'common/Modal';
import styles from './PermissionBlock.module.css';
import LoginToUnlock from './LoginToUnlock';
import { useShareLinkChange } from 'hooks/experiments/useShareLink';

const BasicPermissionSimpleBlock = ({ rootClassName, to }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = useCallback(() => setModalOpen(!isModalOpen), [
    isModalOpen,
  ]);

  useShareLinkChange(() => {
    if (isModalOpen) setModalOpen(false);
  });

  return (
    <div
      className={cn(styles.permissionSimpleBlock, rootClassName, styles.simple)}
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
            <LoginToUnlock to={to} onAuthenticatedClick={toggleModal} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

BasicPermissionSimpleBlock.propTypes = {
  rootClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default BasicPermissionSimpleBlock;
