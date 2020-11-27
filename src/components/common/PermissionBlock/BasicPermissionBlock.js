import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import usePermission from 'hooks/usePermission';
import { useLogin } from 'hooks/login';
import useTaskAndReward from 'hooks/useTaskAndReward';
import Loading from 'common/Loader';
import {
  PointsBlock,
  LoginBlock,
  CallToDoTask,
  CallToUnlock,
} from './components';
import {
  dataTypeToRewardMap,
  getMainTaskLink,
  mainTaskId,
} from '../../../constants/taskAndReward';

import styles from './PermissionBlock.module.css';

const CallToActionSection = ({
  isLogin,
  myPoints,
  reward,
  mainTask,
  mainTaskLink,
  dataId,
}) => {
  if (!isLogin) {
    return <LoginBlock />;
  } else {
    if (reward) {
      if (reward.points > myPoints) {
        return <CallToDoTask task={mainTask} to={mainTaskLink} />;
      } else {
        return <CallToUnlock reward={reward} dataId={dataId} />;
      }
    }
  }
  return null;
};

const PermissionBlock = ({ dataId, dataType, className }) => {
  const { myPoints } = usePermission();
  const [isLogin] = useLogin();
  const { tasks, rewards, fetched: taskAndRewardFetched } = useTaskAndReward();

  // current reward of this dataType
  const currentReward = useMemo(() => {
    if (taskAndRewardFetched && Array.isArray(rewards)) {
      const rewardId = dataTypeToRewardMap[dataType];
      return rewards.find(r => r.id === rewardId);
    }
    return undefined;
  }, [dataType, rewards, taskAndRewardFetched]);

  // main task of whole website
  const mainTask = useMemo(() => {
    if (taskAndRewardFetched && Array.isArray(tasks)) {
      return tasks.find(t => t.id === mainTaskId);
    }
    return undefined;
  }, [taskAndRewardFetched, tasks]);

  if (!taskAndRewardFetched) {
    return (
      <div className={className}>
        <Loading size="m" />
      </div>
    );
  } else {
    return (
      <div className={cn(styles.permissionBlock, className)}>
        <div className={styles.pointsBlockContainer}>
          <PointsBlock
            requiredPoints={currentReward ? currentReward.points : '?'}
            myPoints={myPoints}
            isLogin={isLogin}
          />
        </div>
        <div className={styles.callToActionSectionContainer}>
          <CallToActionSection
            isLogin={isLogin}
            myPoints={myPoints}
            reward={currentReward}
            mainTask={mainTask}
            mainTaskLink={getMainTaskLink()}
            dataId={dataId}
          />
        </div>
        <Link to="/me/points">
          <span className={styles.link}>如何獲得更多積分？</span>
        </Link>
      </div>
    );
  }
};

export default PermissionBlock;
