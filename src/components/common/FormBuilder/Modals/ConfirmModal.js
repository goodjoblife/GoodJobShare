import React from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import cn from 'classnames';

import Modal from 'common/Modal';
import styles from './styles.module.css';

const ConfirmModal = ({ title, subtitle, description, actions, ...props }) => (
  <Modal {...props} size="xs" contentClassName={styles.content}>
    <div className={styles.title}>{title}</div>
    <div className={cn(styles.subTitle, { [styles.hidden]: !subtitle })}>
      {subtitle}
    </div>
    <div className={styles.description}>{description}</div>
    {actions.map(([text, action]) => (
      <button key={text} className={styles.btn} onClick={action}>
        {text}
      </button>
    ))}
  </Modal>
);

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(
    withShape(PropTypes.array.isRequired, {
      0: PropTypes.string.isRequired,
      1: PropTypes.func.isRequired,
    }),
  ),
};

export default ConfirmModal;
