import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePermission from 'hooks/usePermission';
import { useLogin } from 'hooks/login';
import useTaskAndReward from 'hooks/useTaskAndReward';
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

// import styles from './PermissionBlock.module.css';

const CallToActionSection = ({
  isLogin,
  myPoints,
  taskAndRewardFetched,
  reward,
  mainTask,
  mainTaskLink,
  dataId,
}) => {
  if (!isLogin) {
    return <LoginBlock />;
  } else {
    if (taskAndRewardFetched && reward) {
      if (reward.points > myPoints) {
        return <CallToDoTask task={mainTask} to={mainTaskLink} />;
      } else {
        return <CallToUnlock reward={reward} dataId={dataId} />;
      }
    }
  }
};

const PermissionBlock = ({ dataId, dataType, className }) => {
  const { myPoints } = usePermission();
  const [isLogin] = useLogin();
  const { tasks, rewards, fetched: taskAndRewardFetched } = useTaskAndReward();

  const reward = useMemo(() => {
    if (taskAndRewardFetched && Array.isArray(rewards)) {
      const rewardId = dataTypeToRewardMap[dataType];
      return rewards.find(r => r.id === rewardId);
    }
    return undefined;
  }, [dataType, rewards, taskAndRewardFetched]);

  const mainTask = useMemo(() => {
    if (taskAndRewardFetched && Array.isArray(tasks)) {
      return tasks.find(t => t.id === mainTaskId);
    }
    return undefined;
  }, [taskAndRewardFetched, tasks]);

  if (!taskAndRewardFetched) {
    return <div className={className}> loading ... </div>;
  } else {
    return (
      <div className={className}>
        <PointsBlock
          requiredPoints={reward.points}
          myPoints={myPoints}
          isLogin={isLogin}
        />
        <CallToActionSection
          isLogin={isLogin}
          myPoints={myPoints}
          taskAndRewardFetched={taskAndRewardFetched}
          reward={reward}
          mainTask={mainTask}
          mainTaskLink={getMainTaskLink()}
          dataId={dataId}
        />
        <Link to="/me/points">如何獲得更多積分？</Link>
      </div>
    );
  }
};

export default PermissionBlock;
