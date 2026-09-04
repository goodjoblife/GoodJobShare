import { withShape } from 'airbnb-prop-types';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Modal from 'common/Modal';

import styles from './styles.module.css';

const ConfirmModal = ({ title, subtitle, description, actions, ...props }) => (
  <Modal {...props} size="xs" contentClassName={styles.content}>
    <div className={styles.title}>{title}</div>
    <div className={cn(styles.subTitle, { [styles.hidden]: !subtitle })}>
      {subtitle}
    </div>
    <div className={styles.description}>{description}</div>
    {actions.map(([text, action, appearance = 'black']) => (
      <button
        key={text}
        className={cn(styles.btn, {
          [styles.whiteBtn]: appearance === 'white',
        })}
        onClick={action}
      >
        {text}
      </button>
    ))}
  </Modal>
);

ConfirmModal.propTypes = {
  actions: PropTypes.arrayOf(
    withShape(PropTypes.array.isRequired, {
      0: PropTypes.string.isRequired,
      1: PropTypes.func.isRequired,
      2: PropTypes.oneOf(['black', 'white']),
    }),
  ),
  description: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default ConfirmModal;
