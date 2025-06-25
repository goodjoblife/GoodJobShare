import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './InboxButton.module.css';
import Bell from 'common/icons/Bell';
import { readInbox } from 'actions/inbox';
import { unreadCountSelector } from 'selectors/inbox';

export const InboxButtonIcon = ({ isActivating, className }) => {
  const count = useSelector(unreadCountSelector);

  return (
    <div
      className={cn(
        styles.inboxButton,
        { [styles.activating]: isActivating },
        className,
      )}
      data-count={count}
    >
      <Bell />
    </div>
  );
};

InboxButtonIcon.propTypes = {
  className: PropTypes.string,
  isActivating: PropTypes.bool,
};

const InboxButton = ({ isOpen }) => {
  const dispatch = useDispatch();
  const read = useCallback(() => {
    dispatch(readInbox());
  }, [dispatch]);

  return (
    <button onClick={read}>
      <InboxButtonIcon isActivating={isOpen} className={styles.topNavIcon} />
    </button>
  );
};

InboxButton.propTypes = {
  isOpen: PropTypes.bool,
};

export default InboxButton;
