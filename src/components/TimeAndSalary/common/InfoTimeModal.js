import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Modal from 'common/Modal';
import Question from 'common/icons/Question';
import editorStyles from 'common/Editor.module.css';
import Button from 'common/button/Button';

const InfoTimeModal = ({ isOpen, close }) => (
  <Modal isOpen={isOpen} hasClose close={close}>
    <div>
      <Question
        style={{
          fill: '#FCD406',
          height: '82px',
          width: '82px',
          marginBottom: '32px',
        }}
      />
    </div>
    <h2
      style={{
        fontSize: '2rem',
        marginBottom: '47px',
      }}
    >
      參考時間
    </h2>
    <div className={cn(editorStyles.editor, 'alignLeft')}>
      若分享該筆資料的使用者已離職，則參考時間為
      <bold>離職年、月</bold>。<br />
      若尚在職，則為
      <bold>分享資料的年、月</bold>。
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <Button btnStyle="black" circleSize="md" onClick={close}>
          OK，我瞭解了
        </Button>
      </div>
    </div>
  </Modal>
);

InfoTimeModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

export default InfoTimeModal;
