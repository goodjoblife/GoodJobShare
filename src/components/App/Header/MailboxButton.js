import React, { useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import PopoverToggle from 'common/PopoverToggle';

import popoverStyles from './Header.module.css';
import styles from './MailboxButton.module.css';
import Bell from 'common/icons/Bell';
import MailboxContent from './MailboxContent';

const MailboxButton = () => {
  const [messages, setMessages] = useState([
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: true,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: true,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
  ]);

  const count = useMemo(
    () => messages.filter(message => !message.read).length,
    [messages],
  );

  const read = useCallback(
    () =>
      setMessages(messages =>
        messages.map(message => {
          message.read = true;
          return message;
        }),
      ),
    [],
  );

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
