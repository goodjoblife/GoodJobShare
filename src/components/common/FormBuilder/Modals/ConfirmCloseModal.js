import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Modal from 'common/Modal';
import styles from './styles.module.css';

const ConfirmCloseModal = ({
  title,
  subtitle,
  description,
  closeText,
  close,
  shareText,
  share,
  ...props
}) => (
  <Modal {...props} size="xs" contentClassName={styles.content} close={close}>
    <div className={styles.title}>{title}</div>
    <div className={cn(styles.subTitle, { [styles.hidden]: !subtitle })}>
      {subtitle}
    </div>
    <div className={styles.description}>{description}</div>
    <button className={styles.btn} onClick={close}>
      {closeText}
    </button>
    <button
      className={cn(styles.btn, { [styles.hidden]: !shareText })}
      onClick={share}
    >
      {shareText}
    </button>
  </Modal>
);

ConfirmCloseModal.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  closeText: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  shareText: PropTypes.string,
  share: PropTypes.func,
};

export default ConfirmCloseModal;
