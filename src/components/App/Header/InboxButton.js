import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './InboxButton.module.css';
import Bell from 'common/icons/Bell';
import { readInbox } from 'actions/inbox';
import { unreadCountSelector } from 'selectors/inbox';

const InboxButton = ({ isOpen }) => {
  const count = useSelector(unreadCountSelector);

  const dispatch = useDispatch();
  const read = useCallback(() => {
    dispatch(readInbox());
  }, [dispatch]);

  return (
    <button
      className={cn(styles.inboxButton, { [styles.activating]: isOpen })}
      data-count={count}
      onClick={read}
    >
      <span className={styles.count}>{count}</span>
      <Bell />
    </button>
  );
};

InboxButton.propTypes = {
  isOpen: PropTypes.bool,
};

export default InboxButton;
