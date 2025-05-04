import React, { useCallback, useEffect } from 'react';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import BellBlackImage from 'common/icons/bellBlack.svg';
import PropTypes from 'prop-types';
import styles from './SubscribeNotificationButton.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  queryCompanyIsSubscribed,
  subscribeCompany,
  unsubscribeCompany,
} from 'actions/company';
import Skeleton from 'react-loading-skeleton';
import { companyIsSubscribedBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetching, isFetched } from 'utils/fetchBox';
import useLoginFlow from 'components/ExperienceDetail/hooks/useLoginFlow';

const SubscribeNotificationButton = ({ companyName }) => {
  const dispatch = useDispatch();
  const box = useSelector(companyIsSubscribedBoxSelectorByName(companyName));
  const loading = isFetching(box);
  const fetched = isFetched(box);
  const { companyId, isSubscribed } = box.data || {};

  const handleToggleSubscribeCompany = useCallback(async () => {
    if (!fetched || !companyId) {
      return;
    }
    if (isSubscribed) {
      await dispatch(unsubscribeCompany({ companyName }));
    } else {
      await dispatch(subscribeCompany({ companyName }));
    }
  }, [dispatch, fetched, companyId, companyName, isSubscribed]);

  const [handleSubscribeWithLoginCheck] = useLoginFlow(
    handleToggleSubscribeCompany,
  );

  useEffect(() => {
    dispatch(queryCompanyIsSubscribed(companyName));
  }, [dispatch, companyName]);

  if (!fetched || loading) {
    return <Skeleton width={144} height={30} borderRadius={5} />;
  }

  return (
    <button
      className={cn(styles.buttonContainer, {
        [styles.subscribed]: isSubscribed,
      })}
      onClick={handleSubscribeWithLoginCheck}
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
  companyName: PropTypes.string.isRequired,
};

export default SubscribeNotificationButton;
