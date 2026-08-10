import cn from 'classnames';
import React, { useCallback, useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyIsSubscribed,
  toggleSubscribeCompany,
} from 'actions/company';
import { CompanyIsSubscribed } from 'apis/queryCompanyIsSubscribed';
import BellBlackImage from 'common/icons/bellBlack.svg';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import useLoginFlow from 'components/ExperienceDetail/hooks/useLoginFlow';
import { companyIsSubscribedBoxSelectorByName } from 'selectors/companyAndJobTitle';
import FetchBox, { isFetched } from 'utils/fetchBox';

import styles from './SubscribeNotificationButton.module.css';

const useCompanyIsSubscribedBox = (
  companyName: string,
): FetchBox<CompanyIsSubscribed> => {
  const selector = useMemo(
    () => companyIsSubscribedBoxSelectorByName(companyName),
    [companyName],
  );
  return useSelector(selector);
};

type SubscribeNotificationButtonProps = {
  companyName: string;
};

const SubscribeNotificationButton: React.FC<
  SubscribeNotificationButtonProps
> = ({ companyName }) => {
  const dispatch = useDispatch();
  const box = useCompanyIsSubscribedBox(companyName);

  const handleToggleSubscribeCompany = useCallback(async () => {
    await dispatch(toggleSubscribeCompany({ companyName }));
  }, [dispatch, companyName]);

  const [handleSubscribeWithLoginCheck] = useLoginFlow(
    handleToggleSubscribeCompany,
  );

  useEffect(() => {
    dispatch(queryCompanyIsSubscribed({ companyName }));
  }, [dispatch, companyName]);

  if (!isFetched(box)) {
    return <Skeleton width={144} height={30} borderRadius={5} />;
  }

  const { isSubscribed } = box.data;

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

export default SubscribeNotificationButton;
