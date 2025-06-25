import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { formatDistance } from 'date-fns';
import { zhTW } from 'date-fns/locale';

import popoverStyles from './Header.module.css';
import styles from './InboxContent.module.css';
import { messagesSelector } from 'selectors/inbox';

const InboxContent = ({ className }) => {
  const allMessages = useSelector(messagesSelector);

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
    <div className={cn(styles.InboxContainer, className)}>
      <div className={styles.header}>
        <div className={styles.title}>通知</div>
        <div className={styles.buttons}>
          <Button active={!showsUnread} onClick={() => setShowsUnread(false)}>
            全部
          </Button>
          <Button active={showsUnread} onClick={() => setShowsUnread(true)}>
            未讀
          </Button>
        </div>
      </div>
      <ul className={popoverStyles.popoverItems}>
        {filteredMessages.map(({ id, link, title, date, read }) => (
          <li key={id}>
            <Link
              to={link}
              className={cn(popoverStyles.popoverItem, {
                [styles.unread]: !read,
              })}
            >
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
          <Button onClick={() => setCount(count => count + 5)}>載入更多</Button>
        </div>
      )}
    </div>
  );
};

InboxContent.propTypes = {
  className: PropTypes.string,
};

const Button = ({ active, ...props }) => (
  <button
    className={cn(styles.button, { [styles.active]: active })}
    {...props}
  />
);

Button.propTypes = {
  active: PropTypes.bool,
};

export default InboxContent;
