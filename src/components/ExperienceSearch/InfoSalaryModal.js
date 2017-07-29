import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'common/Modal';

const InfoSalaryModal = ({ isOpen, close }) => (
  <Modal isOpen={isOpen} hasClose close={close}>
    Content
  </Modal>
);

InfoSalaryModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

export default InfoSalaryModal;
