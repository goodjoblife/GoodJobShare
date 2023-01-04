import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';
import useTimer from 'hooks/useTimer';
import useToRedirectUrl from 'hooks/payment/useToRedirectUrl';

import styles from './PaymentResult.module.css';
import { renderCountdown } from './helpers';

const waitingTime = 3000;

const timeTemplateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const Success = ({ expiredAt }) => {
  const [counting, setCounting] = useState(true);
  const toRedirectUrl = useToRedirectUrl();

  const action = useCallback(() => {
    setCounting(false);
    toRedirectUrl();
  }, [toRedirectUrl]);

  const { duration } = useTimer(action, waitingTime, counting);

  const countdown = renderCountdown(waitingTime, duration);

  return (
    <div className={styles.content}>
      <Heading className={styles.title}>交易成功</Heading>
      <div className={styles.icon}></div>
      <P Tag="p" className={styles.description}>
        {`解鎖有效日期至 ${expiredAt.toLocaleDateString(
          undefined,
          timeTemplateOptions,
        )}`}
      </P>
      <P Tag="p" className={styles.description}>
        {`將於 ${countdown} 秒後跳轉回原內容頁面`}
      </P>
      <Button btnStyle="gray" circleSize="md" className={styles.action}>
        馬上回原頁面
      </Button>
    </div>
  );
};

Success.propTypes = {
  expiredAt: PropTypes.instanceOf(Date),
  redirectUrl: PropTypes.string,
};

Success.defaultProps = {
  expiredAt: new Date(),
};

export default Success;
