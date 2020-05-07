import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Modal from 'common/Modal';
import styles from './styles.module.css';

const ResultModal = ({ title, subtitle, description, ...props }) => (
  <Modal {...props} size="xs" contentClassName={styles.content}>
    <div className={styles.title}>{title}</div>
    <div className={cn(styles.subTitle, { [styles.hidden]: !subtitle })}>
      {subtitle}
    </div>
    <div className={styles.description}>{description}</div>
  </Modal>
);

ResultModal.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  description: PropTypes.string,
};

export default ResultModal;
