import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { formatDistance } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import PopoverToggle from 'common/PopoverToggle';

import popoverStyles from './Header.module.css';
import styles from './MailboxButton.module.css';
import Bell from 'common/icons/Bell';

const MailboxContent = ({ messages: allMessages }) => {
  const [showsUnread, setShowsUnread] = useState(false);
  const [count, setCount] = useState(5);

  const filteredMessages = useMemo(
    () => allMessages.filter(message => (showsUnread ? !message.read : true)),
    [allMessages, showsUnread],
  );

  const displayedFilteredMessages = useMemo(
    () => filteredMessages.slice(0, count),
    [filteredMessages, count],
  );

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>通知</div>
        <div className={styles.buttons}>
          <MailboxContent.Button
            active={!showsUnread}
            onClick={() => setShowsUnread(false)}
          >
            全部
          </MailboxContent.Button>
          <MailboxContent.Button
            active={showsUnread}
            onClick={() => setShowsUnread(true)}
          >
            未讀
          </MailboxContent.Button>
        </div>
      </div>
      <ul className={popoverStyles.popoverItem}>
        {filteredMessages.map(({ id, link, title, date, read }) => (
          <li key={id}>
            <Link to={link} className={cn({ [styles.unread]: !read })}>
              <div>{title}</div>
              <div className={styles.date}>
                {formatDistance(date, new Date(), {
                  locale: zhTW,
                  addSuffix: true,
                })}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {displayedFilteredMessages.length < filteredMessages.length && (
        <div className={styles.loadMore}>
          <MailboxContent.Button onClick={() => setCount(count => count + 5)}>
            載入更多
          </MailboxContent.Button>
        </div>
      )}
    </div>
  );
};

MailboxContent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

MailboxContent.Button = ({ active, ...props }) => (
  <button
    className={cn(styles.button, { [styles.active]: active })}
    {...props}
  />
);

MailboxContent.Button.propTypes = {
  active: PropTypes.bool,
};

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
      className={styles.mailbox}
      data-count={count}
      popoverClassName={cn(popoverStyles.popover, styles.mailboxContainer)}
      popoverContent={<MailboxContent messages={messages} />}
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
