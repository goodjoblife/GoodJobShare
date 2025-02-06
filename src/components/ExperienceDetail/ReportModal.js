import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import { useParams } from 'react-router-dom';
import Modal from 'common/Modal';
import usePermission from 'hooks/usePermission';
import { queryExperienceIfUnfetched } from 'actions/experience';
import PropTypes from 'prop-types';
import ModalContent from './MocalContent';
import { useReportModal } from './useReportModal';
import { MODAL_TYPE, REPORT_TYPE } from './ReportForm/constants';

// from params
const experienceIdSelector = R.prop('id');
const useExperienceId = () => {
  const params = useParams();
  return experienceIdSelector(params);
};

const ReportModal = ({
  children,
  isModalClosableOnClickOutside = false,
  reportType,
  salaryWorkTimesId,
}) => {
  const {
    modalState,
    handleIsModalOpen,
    closableOnClickOutside,
    setModalClosableOnClickOutside,
  } = useReportModal();
  const { isModalOpen, modalType, modalPayload } = modalState;
  const experienceId = useExperienceId();
  const [, fetchPermission] = usePermission({
    publishId: experienceId,
  });
  const dispatch = useDispatch();

  const handleReportClick = () => {
    setModalClosableOnClickOutside(isModalClosableOnClickOutside);
    handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
  };

  useEffect(() => {
    dispatch(queryExperienceIfUnfetched(experienceId));
  }, [dispatch, experienceId]);

  useEffect(() => {
    fetchPermission();
  }, [experienceId, fetchPermission]);

  return (
    <>
      <div onClick={handleReportClick}>{children}</div>
      <Modal
        isOpen={isModalOpen}
        close={() => handleIsModalOpen(false)}
        closableOnClickOutside={closableOnClickOutside}
        hasClose
      >
        <ModalContent
          modalType={modalType}
          modalPayload={modalPayload}
          // TODO: 下一個 PR 修正會避免以下寫法
          id={experienceId || salaryWorkTimesId}
          handleIsModalOpen={handleIsModalOpen}
          setModalClosableOnClickOutside={setModalClosableOnClickOutside}
          reportType={reportType}
        />
      </Modal>
    </>
  );
};

ReportModal.propTypes = {
  children: PropTypes.node.isRequired,
  isModalClosableOnClickOutside: PropTypes.bool,
  reportType: PropTypes.string,
  salaryWorkTimesId: PropTypes.string,
};

ReportModal.defaultProps = {
  isModalClosableOnClickOutside: false,
  reportType: REPORT_TYPE.EXPERIENCE,
};

export default ReportModal;
