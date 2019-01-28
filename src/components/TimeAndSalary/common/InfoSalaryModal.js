import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Modal from 'common/Modal';
import Question from 'common/icons/Question';
import editorStyles from 'common/Editor.module.css';
import Button from 'common/button/Button';

const InfoSalaryModal = ({ isOpen, close }) => (
  <Modal isOpen={isOpen} hasClose close={close} closableOnClickOutside>
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
      時薪估計方式
    </h2>
    <div className={cn(editorStyles.editor, 'alignLeft')}>
      <ul>
        <li>當薪資種類為「時薪」：無需估算</li>
        <li>
          當薪資種類為「日薪」：以 <bold>日薪 ÷ 工作日實際工時</bold> 估算
        </li>
        <li>
          當薪資種類為「月薪」：以{' '}
          <bold>
            (月薪 × 12) ÷ (52 × 每週平均工時 - (12天國假 + 7天特休) ×
            工作日實際工時)
          </bold>{' '}
          估算
        </li>
        <li>
          當薪資種類為「年薪」：以{' '}
          <bold>
            年薪 ÷ (52 × 每週平均工時 - (12天國假+7天特休) × 工作日實際工時)
          </bold>{' '}
          估算
        </li>
      </ul>
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

InfoSalaryModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

export default InfoSalaryModal;
