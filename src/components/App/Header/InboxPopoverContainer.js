import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import PopoverToggle from 'common/PopoverToggle';
import { messagesSelector } from 'selectors/inbox';
import popoverStyles from './Header.module.css';
import styles from './InboxButton.module.css';
import InboxContent from './InboxContent';

const InboxPopoverContainer = ({ children }) => {
  const messages = useSelector(messagesSelector);

  return (
    <PopoverToggle
      className={styles.inboxButtonContainer}
      popoverClassName={popoverStyles.popover}
      popoverContent={
        <InboxContent className={styles.InboxContent} messages={messages} />
      }
    >
      {children}
    </PopoverToggle>
  );
};

InboxPopoverContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InboxPopoverContainer;
