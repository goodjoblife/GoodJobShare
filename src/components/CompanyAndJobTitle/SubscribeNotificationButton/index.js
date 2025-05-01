import React, { useCallback, useState } from 'react';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import BellBlackImage from 'common/icons/bellBlack.svg';
import PropTypes from 'prop-types';
import styles from './SubscribeNotificationButton.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeCompany, unsubscribeCompany } from 'actions/company';
import Skeleton from 'react-loading-skeleton';
import { companyIsSubscribedBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetching, isFetched } from 'utils/fetchBox';

const SubscribeNotificationButton = ({ companyName }) => {
  const dispatch = useDispatch();
  const box = useSelector(state =>
    companyIsSubscribedBoxSelectorByName(companyName)(state),
  );
  const companyId = box.data?.companyId;
  const initialSubscribed = Boolean(box.data?.isSubscribed);
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);

  const loading = isFetching(box);
  const fetched = isFetched(box);

  const handleToggleSubscribeCompany = useCallback(async () => {
    if (!fetched || !companyId) {
      return;
    }
    setIsSubscribed(prev => !prev);
    if (isSubscribed) {
      await dispatch(unsubscribeCompany({ companyId, companyName }));
    } else {
      await dispatch(subscribeCompany({ companyId, companyName }));
    }
  }, [dispatch, fetched, companyId, companyName, isSubscribed]);

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
  companyName: PropTypes.string,
};

export default SubscribeNotificationButton;
