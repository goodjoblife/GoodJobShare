import React, { useCallback, useEffect, useState } from 'react';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import BellBlackImage from 'common/icons/bellBlack.svg';
import PropTypes from 'prop-types';
import styles from './SubscribeNotificationButton.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { subscribeCompany, unsubscribeCompany } from 'actions/company';
import useQueryCompanyIsSubscribed from 'components/ExperienceDetail/hooks/useQueryCompanyIsSubscribed';
import Skeleton from 'react-loading-skeleton';

const SubscribeNotificationButton = ({ isFetched, companyName, companyId }) => {
  const dispatch = useDispatch();
  const [
    { loading, value },
    queryCompanyIsSubscribed,
  ] = useQueryCompanyIsSubscribed(companyName);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsSubscribed(value);
    }
  }, [loading, value]);

  const handleSubscribeCompany = useCallback(async () => {
    setIsSubscribed(true);
    await dispatch(subscribeCompany({ companyId }));
  }, [dispatch, companyId]);

  const handleUnsubscribeCompany = useCallback(async () => {
    setIsSubscribed(false);
    await dispatch(unsubscribeCompany({ companyId }));
  }, [dispatch, companyId]);

  const handleToggleSubscribeCompany = useCallback(async () => {
    if (isSubscribed) {
      await handleUnsubscribeCompany();
    } else {
      await handleSubscribeCompany();
    }
  }, [isSubscribed, handleSubscribeCompany, handleUnsubscribeCompany]);

  useEffect(() => {
    queryCompanyIsSubscribed();
  }, [queryCompanyIsSubscribed]);

  if (!isFetched || loading) {
    return <Skeleton width={144} height={30} borderRadius={5} />;
  }

  return (
    <button
      className={cn(styles.buttonContainer, {
        [styles.subscribed]: isSubscribed,
      })}
      onClick={handleToggleSubscribeCompany}
    >
      <div className={styles.bellContainer}>
        <img
          src={BellWhiteImage}
          className={styles.bellWhite}
          alt="notificationWhiteBell"
        />
        <img
          src={BellBlackImage}
          className={styles.bellBlack}
          alt="notificationBlackBell"
        />
      </div>
      <div>{isSubscribed ? '已訂閱新資料通知' : '有新資料時通知我'}</div>
    </button>
  );
};

SubscribeNotificationButton.propTypes = {
  companyId: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  isFetched: PropTypes.bool.isRequired,
};

export default SubscribeNotificationButton;
