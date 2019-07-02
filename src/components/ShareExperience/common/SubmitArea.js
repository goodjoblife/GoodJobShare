import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';

import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';
import Modal from 'common/Modal';

const SubmitArea = ({
  auth,
  agree,
  handleAgree,
  isOpen,
  feedback,
  hasClose,
  closableOnClickOutside,
  isSubmitting,
  onSubmit,
  login,
  handleIsOpen,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      marginTop: '57px',
    }}
  >
    <label
      style={{
        display: 'flex',
        marginBottom: '28px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      htmlFor="submitArea-checkbox"
    >
      <Checkbox
        margin={'0'}
        value={''}
        label={''}
        checked={agree}
        onChange={e => handleAgree(e.target.checked)}
        id="submitArea-checkbox"
      />
      <p
        style={{
          color: '#3B3B3B',
        }}
      >
        我分享的是真實資訊，並且遵守本站
        <Link
          to="/guidelines"
          target="_blank"
          style={{
            color: '#02309E',
          }}
        >
          發文留言規定
        </Link>
        、
        <Link
          to="/user-terms"
          target="_blank"
          style={{
            color: '#02309E',
          }}
        >
          使用者條款
        </Link>
        以及中華民國法律。
      </p>
    </label>
    <div>
      <ButtonSubmit
        text="送出資料"
        onSubmit={onSubmit}
        disabled={isSubmitting || !agree}
        auth={auth}
        login={login}
      />
    </div>
    <Modal
      isOpen={isOpen}
      close={() => handleIsOpen(!isOpen)}
      hasClose={hasClose}
      closableOnClickOutside={closableOnClickOutside}
    >
      {feedback}
    </Modal>
  </div>
);

SubmitArea.propTypes = {
  auth: ImmutablePropTypes.map.isRequired,
  agree: PropTypes.bool.isRequired,
  handleAgree: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  feedback: PropTypes.node,
  hasClose: PropTypes.bool.isRequired,
  closableOnClickOutside: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  handleIsOpen: PropTypes.func.isRequired,
};

export default SubmitArea;
