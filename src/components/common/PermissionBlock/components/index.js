import React, { useCallback } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useFacebookLogin, useGoogleLogin } from 'hooks/login';
import { useToken } from 'hooks/auth';
import {
  rewardToApiMap,
  mainCTAText,
} from '../../../../constants/taskAndReward';

import styles from '../PermissionBlock.module.css';

export const LoginBlock = () => {
  const fbLogin = useFacebookLogin();
  const googleLogin = useGoogleLogin();
  return (
    <div className={styles.loginBtnContainer}>
      <button
        className={`${cn('buttonCircleM')} ${styles.btn} ${styles.btnFb}`}
        onClick={async () => {
          await fbLogin();
        }}
      >
        <pre>Facebook 登入</pre>
      </button>
      <button
        className={`${cn('buttonCircleM')} ${styles.btn} ${styles.btnGoogle}`}
        onClick={async () => {
          await googleLogin();
        }}
      >
        <pre>Google 登入</pre>
      </button>
    </div>
  );
};

export const PointsBlock = ({ requiredPoints, myPoints, isLogin }) => {
  return (
    <div>
      <span>解鎖此篇需 {requiredPoints} 積分</span>
      <span>目前積分：{isLogin ? myPoints : '?'}</span>
    </div>
  );
};

export const CallToDoTask = ({ task, to }) => {
  if (task) {
    return (
      <div>
        <div>
          立刻{task.title}，{task.description}
        </div>
        <Link to={to}>{mainCTAText}</Link>
      </div>
    );
  }
  return null;
};

export const CallToUnlock = ({ reward, dataId }) => {
  const token = useToken();
  const handleUnlock = useCallback(async () => {
    if (reward) {
      const api = rewardToApiMap[reward.id];
      await api({ token, id: dataId });
    }
  }, [dataId, reward, token]);
  if (reward) {
    return (
      <div>
        <div>以 {reward.points} 積分解鎖完整內容</div>
        <button onClick={handleUnlock}>解鎖</button>
      </div>
    );
  }
  return null;
};
