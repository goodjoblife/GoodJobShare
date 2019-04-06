import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import GjLogo from 'common/icons/GjLogo';
import Checked from 'common/icons/Checked';
import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';

import styles from './VerificationPage.module.css';

const FooterP = ({ style, ...restProps }) => (
  <P
    size="s"
    style={{
      fontSize: '0.8125em',
      color: '#999999',
      ...Object.assign({}, style ? style : {}),
    }}
    {...restProps}
  />
);

const VerificationPage = ({
  match: {
    params: { verificationCode },
  },
}) => {
  console.log('verificationCode', verificationCode);
  return (
    <div className={styles.root}>
      <Link className={styles.titleArea} to="/" title="GoodJob 職場透明化運動">
        <GjLogo
          style={{ height: '30px', width: '100px', marginRight: '16px' }}
        />
        <Heading size="sm">職場透明化運動</Heading>
      </Link>
      <div className={styles.content}>
        <Checked className={styles.checked} />
        <Heading
          size="m"
          style={{
            marginBottom: '20px',
          }}
        >
          Email 認證成功
        </Heading>
        <P
          size="m"
          style={{
            marginBottom: '28px',
          }}
        >
          感謝你的驗證，未來有重大更新我們將 Email 通知你。
        </P>
        <Link to="/" title="GoodJob 職場透明化運動">
          <Button
            circleSize="lg"
            btnStyle="black2"
            style={{
              marginBottom: '10px',
            }}
          >
            返回首頁
          </Button>
        </Link>
      </div>
      <div className={styles.footer}>
        <FooterP style={{ marginRight: '16px' }}>
          © GoodJob.life team 2019
        </FooterP>
        <Link to="/" title="GoodJob 職場透明化運動">
          <FooterP style={{ marginRight: '20px' }}>官方網站</FooterP>
        </Link>
        <a
          href="https://www.facebook.com/goodjob.life/"
          target="_blank"
          rel="noopener noreferrer"
          title="GoodJob 職場透明化運動"
        >
          <FooterP>facebook</FooterP>
        </a>
      </div>
    </div>
  );
};

VerificationPage.propTypes = {
  match: PropTypes.shape({
    parmas: PropTypes.shape({
      verificationCode: PropTypes.string,
    }),
  }),
  verifyWithCode: PropTypes.func,
};

VerificationPage.defaultProps = {
  verifyWithCode: verificationCode =>
    new Promise(resolve =>
      setTimeout(() => resolve(verificationCode), 1500),
    ).then(verificationCode =>
      console.log('submit verificationCode: ', verificationCode),
    ),
};

export default VerificationPage;
