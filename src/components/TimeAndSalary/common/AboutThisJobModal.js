import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'common/Modal';

const AboutThisJobModal = ({ isOpen, close, aboutThisJob }) => (
  <Modal isOpen={isOpen} hasClose close={close}>
    {aboutThisJob}
  </Modal>
);

AboutThisJobModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  aboutThisJob: PropTypes.string.isRequired,
};

export default AboutThisJobModal;
