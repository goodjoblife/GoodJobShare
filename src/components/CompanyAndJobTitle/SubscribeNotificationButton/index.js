import React, { useCallback, useEffect } from 'react';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import BellBlackImage from 'common/icons/bellBlack.svg';
import PropTypes from 'prop-types';
import styles from './SubscribeNotificationButton.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  queryCompanyIsSubscribed,
  toggleSubscribeCompany,
} from 'actions/company';
import Skeleton from 'react-loading-skeleton';
import { companyIsSubscribedBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';
import useLoginFlow from 'components/ExperienceDetail/hooks/useLoginFlow';

const SubscribeNotificationButton = ({ companyName }) => {
  const dispatch = useDispatch();
  const box = useSelector(companyIsSubscribedBoxSelectorByName(companyName));
  const fetched = isFetched(box);
  const { isSubscribed } = box.data || {};

  const handleToggleSubscribeCompany = useCallback(
    async () => dispatch(toggleSubscribeCompany({ companyName })),
    [dispatch, companyName],
  );

  const [handleSubscribeWithLoginCheck] = useLoginFlow(
    handleToggleSubscribeCompany,
  );

  useEffect(() => {
    dispatch(queryCompanyIsSubscribed({ companyName }));
  }, [dispatch, companyName]);

  if (!fetched) {
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
