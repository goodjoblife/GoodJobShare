import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'common/Modal';
import HtmlEditor from 'common/HtmlEditor';

const InfoSalaryModal = ({ isOpen, close }) => (
  <Modal isOpen={isOpen} hasClose close={close}>
    {/*
      <svg role="img">
        <use xlinkhref="#icon-question" />
      </svg>
  */}
    <h5 className="modal-content__heading">
      時薪估計方式
    </h5>
    <HtmlEditor className="alignLeft">
      <ul>
        <li>當薪資種類為「時薪」：無需估算</li>
        <li>當薪資種類為「日薪」：以 <bold>日薪 ÷ 工作日實際工時</bold> 估算</li>
        <li>當薪資種類為「月薪」：以 <bold>(月薪 × 12) ÷ (52 × 每週平均工時 - (12天國假 + 7天特休) × 工作日實際工時)</bold> 估算</li>
        <li>當薪資種類為「年薪」：以 <bold>年薪 ÷ (52 × 每週平均工時 - (12天國假+7天特休) × 工作日實際工時)</bold> 估算</li>
        <button className="modal-content__btn btn-black btn-m js-close-data-modal" onClick={close}>
           OK，我瞭解了
        </button>
      </ul>
    </HtmlEditor>
  </Modal>
);

InfoSalaryModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

export default InfoSalaryModal;
