import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'common/Modal';

const AboutThisJobModal = ({ isOpen, close, title, aboutThisJob }) => (
  <Modal isOpen={isOpen} hasClose close={close}>
    <h1>{title}</h1>
    {aboutThisJob && aboutThisJob.split('\n').map((line, i) => <p key={i}>{line}</p>)}
  </Modal>
);

AboutThisJobModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  title: PropTypes.string.isRequired,
  aboutThisJob: PropTypes.string.isRequired,
};

export default AboutThisJobModal;
