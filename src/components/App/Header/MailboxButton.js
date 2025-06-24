import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import PopoverToggle from 'common/PopoverToggle';

import popoverStyles from './Header.module.css';
import styles from './MailboxButton.module.css';
import Bell from 'common/icons/Bell';
import MailboxContent from './MailboxContent';
import { messagesSelector, unreadCountSelector } from 'selectors/inbox';
import { readInbox } from 'actions/inbox';

const MailboxButton = () => {
  const count = useSelector(unreadCountSelector);
  const messages = useSelector(messagesSelector);

  const dispatch = useDispatch();
  const read = useCallback(() => {
    dispatch(readInbox());
  }, [dispatch]);

  return (
    <PopoverToggle
      className={styles.mailboxButton}
      data-count={count}
      popoverClassName={popoverStyles.popover}
      popoverContent={
        <MailboxContent className={styles.mailboxContent} messages={messages} />
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

export default MailboxButton;
