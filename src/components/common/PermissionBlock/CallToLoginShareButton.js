import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import useToBuy from 'hooks/payment/useToBuy';

import styles from './PermissionBlock.module.css';

const AuthenticatedButton = ({ className, to, onClick, children }) => (
  <Link className={cn('buttonCircleM', className)} to={to} onClick={onClick}>
    {children}
  </Link>
);

const CallToLoginShareButton = ({ to, share }) => {
  const location = useLocation();
  const { toBuy, actionUrl } = useToBuy(location.pathname);
  const onBuyClick = useCallback(
    evt => {
      evt.preventDefault();
      toBuy();
    },
    [toBuy],
  );

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <div className={styles.authenticatedGroup}>
        <AuthenticatedButton
          className={cn('buttonYellow', styles.button)}
          to={to}
          onClick={share}
        >
          留下一筆資料
        </AuthenticatedButton>
        <AuthenticatedButton
          className={cn('buttonHollowRed', styles.button)}
          to={actionUrl}
          onClick={onBuyClick}
        >
          或以 99 元解鎖全站 1 個月
        </AuthenticatedButton>
      </div>
    </div>
  );
};

CallToLoginShareButton.propTypes = {
  share: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CallToLoginShareButton;
