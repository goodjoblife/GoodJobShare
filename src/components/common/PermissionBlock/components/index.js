import React, { useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useFacebookLogin, useGoogleLogin } from 'hooks/login';
import useHandleUnlockData from 'hooks/useHandleUnlockData';
import { Heading, P } from 'common/base';
import Modal from 'common/Modal';
import Button from 'common/button/Button';
import { mainCTAText } from '../../../../constants/taskAndReward';

import styles from '../PermissionBlock.module.css';

export const LoginBlock = () => {
  const fbLogin = useFacebookLogin();
  const googleLogin = useGoogleLogin();
  return (
    <div>
      <Heading center size="sm" bold className={styles.heading}>
        登入並解鎖完整內容
      </Heading>
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
    </div>
  );
};

export const PointsBlock = ({ requiredPoints, myPoints, isLogin }) => {
  return (
    <div>
      <P size="m" className={styles.requiredPoints}>
        解鎖此篇需 {requiredPoints} 積分
      </P>
      <P size="m" className={styles.myPoints}>
        目前積分：{isLogin ? myPoints : '?'}
      </P>
    </div>
  );
};

export const CallToDoTask = ({ task, to }) => {
  if (task) {
    return (
      <div>
        <Heading center size="sm" bold className={styles.heading}>
          立刻{task.title}，{task.description}
        </Heading>
        <div className={styles.ctaButtonContainer}>
          <Link to={to}>
            <Button Button btnStyle="black" circleSize="md">
              {mainCTAText}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return null;
};

export const CallToUnlock = ({ reward, dataId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleUnlockData = useHandleUnlockData({ reward, dataId });
  if (reward) {
    return (
      <div>
        <Heading center size="sm" bold className={styles.heading}>
          以 {reward.points} 積分解鎖完整內容
        </Heading>
        <div className={styles.ctaButtonContainer}>
          <Button
            Button
            btnStyle="black"
            circleSize="md"
            onClick={() => setModalIsOpen(true)}
          >
            解鎖
          </Button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          close={() => setModalIsOpen(false)}
          hasClose
          closableOnClickOutside
          contentClassName={styles.confirmToUnlockModal}
        >
          <Heading center size="sm" bold className={styles.heading}>
            確定要解鎖嗎？ 將使用 {reward.points} 積分兌換
          </Heading>
          <Button
            Button
            btnStyle="black"
            circleSize="md"
            onClick={handleUnlockData}
          >
            確定解鎖
          </Button>
        </Modal>
      </div>
    );
  }
  return null;
};
