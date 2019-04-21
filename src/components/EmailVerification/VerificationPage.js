import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import Loading from 'common/Loader';
import GjLogo from 'common/icons/GjLogo';
import Heading from 'common/base/Heading';
import P from 'common/base/P';

import { verifyEmail } from '../../actions/emailVerify';

import VerificationSuccess from './VerificationSuccess';
import VerificationFailure from './VerificationFailure';

import styles from './VerificationPage.module.css';

const VERIFY_STATUS = {
  NOT_VERIFITED: 'NOT_VERIFITED',
  LOADING: 'LOADING',
  VERIFY_SUCCESS: 'VERIFY_SUCCESS',
  VERIFY_FAILURE: 'VERIFY_FAILURE',
};

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

const VerificationPage = ({ location: { search }, verifyEmail }) => {
  const { token: verifyToken } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  const [verifyStatus, setVerifyStatus] = useState(VERIFY_STATUS.NOT_VERIFITED);
  const sendVerificationCode = useCallback(
    () => {
      setVerifyStatus(VERIFY_STATUS.LOADING);
      verifyEmail({ verifyToken })
        .then(() => setVerifyStatus(VERIFY_STATUS.VERIFY_SUCCESS))
        .catch(e => {
          setVerifyStatus(VERIFY_STATUS.VERIFY_FAILURE);
          console.error(e);
        });
    },
    [verifyToken, verifyEmail],
  );

  useEffect(
    () => {
      sendVerificationCode();
    },
    [sendVerificationCode],
  );

  const renderContent = useCallback(
    () => {
      switch (verifyStatus) {
        case VERIFY_STATUS.VERIFY_SUCCESS:
          return <VerificationSuccess />;
        case VERIFY_STATUS.VERIFY_FAILURE:
          return (
            <VerificationFailure sendVerificationCode={sendVerificationCode} />
          );
        case VERIFY_STATUS.LOADING:
          return (
            <div
              style={{
                minHeight: '200px',
              }}
            >
              <Loading size="s" />
            </div>
          );
        case VERIFY_STATUS.NOT_VERIFITED:
        default:
          return null;
      }
    },
    [verifyStatus, sendVerificationCode],
  );

  return (
    <div className={styles.root}>
      <Link className={styles.titleArea} to="/" title="GoodJob 職場透明化運動">
        <GjLogo
          style={{ height: '30px', width: '100px', marginRight: '16px' }}
        />
        <Heading size="sm">職場透明化運動</Heading>
      </Link>
      <div className={styles.content}>{renderContent()}</div>
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
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  verifyEmail: PropTypes.func,
};

const mapDispatchToProps = {
  verifyEmail,
};

export default connect(
  null,
  mapDispatchToProps,
)(VerificationPage);
