import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import PopoverToggle from 'common/PopoverToggle';

import popoverStyles from './Header.module.css';
import styles from './InboxButton.module.css';
import Bell from 'common/icons/Bell';
import InboxContent from './InboxContent';
import { messagesSelector, unreadCountSelector } from 'selectors/inbox';
import { readInbox } from 'actions/inbox';

const InboxButton = () => {
  const count = useSelector(unreadCountSelector);
  const messages = useSelector(messagesSelector);

  const dispatch = useDispatch();
  const read = useCallback(() => {
    dispatch(readInbox());
  }, [dispatch]);

  return (
    <PopoverToggle
      className={styles.inboxButton}
      data-count={count}
      popoverClassName={popoverStyles.popover}
      popoverContent={
        <InboxContent className={styles.InboxContent} messages={messages} />
      }
    >
      {({ isOpen }) => (
        <button className={cn({ [styles.activating]: isOpen })} onClick={read}>
          <Bell />
        </button>
      )}
    </PopoverToggle>
  );
};

export default InboxButton;
