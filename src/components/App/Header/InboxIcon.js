import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import Bell from 'common/icons/Bell';
import { unreadCountSelector } from 'selectors/inbox';

import styles from './InboxIcon.module.css';

const InboxIcon = ({ isActivating, className }) => {
  const count = useSelector(unreadCountSelector);

  return (
    <div
      className={cn(
        styles.inboxIcon,
        { [styles.activating]: isActivating },
        className,
      )}
      data-count={count}
    >
      <Bell />
    </div>
  );
};

InboxIcon.propTypes = {
  className: PropTypes.string,
  isActivating: PropTypes.bool,
};

export default InboxIcon;
