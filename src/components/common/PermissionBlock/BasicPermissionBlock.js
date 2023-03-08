import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import P from 'common/base/P';
import Modal from 'common/Modal';
import { Heading } from 'common/base';
import CallToLoginShareButton from './CallToLoginShareButton';
import styles from './PermissionBlock.module.css';
import { queryExperienceCountIfUnfetched } from 'actions/experiences';
import { queryTimeAndSalaryCountIfUnfetched } from 'actions/timeAndSalary';
import {
  experienceCountSelector,
  timeAndSalaryCountSelector,
} from 'selectors/countSelector';

const ModalContent = () => {
  const experienceCount = useSelector(experienceCountSelector);
  const timeAndSalaryCount = useSelector(timeAndSalaryCountSelector);

  return (
    <React.Fragment>
      <div className={styles.headingContainer}>
        <FontAwesomeIcon icon={faLock} className={styles.headingIcon} />
        <Heading size="sl" Tag="h3">
          留下一筆資料，馬上解鎖全站資料
        </Heading>
      </div>
      <P size="l" className={styles.ctaText}>
        解鎖全站共{' '}
        <strong>{timeAndSalaryCount + experienceCount} 筆薪資、面試資料</strong>
        。若你已經留過資料，登入即可查看全文！
      </P>
    </React.Fragment>
  );
};

const BasicPermissionBlock = ({ simple, to, rootClassName }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = useCallback(() => setModalOpen(!isModalOpen), [
    isModalOpen,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperienceCountIfUnfetched());
    dispatch(queryTimeAndSalaryCountIfUnfetched());
  }, [dispatch]);

  if (simple) {
    return (
      <div
        className={cn(styles.permissionBlock, rootClassName, styles.simple)}
        onClick={toggleModal}
      >
        <div className={styles.container}>
          <div className={styles.headingContainer}>
            <FontAwesomeIcon icon={faLock} className={styles.headingIcon} />
            <Modal
              isOpen={isModalOpen}
              close={toggleModal}
              closableOnClickOutside
            >
              <ModalContent />
              <div className={styles.ctaButtonContainer}>
                <CallToLoginShareButton
                  to={to}
                  onAuthenticatedClick={toggleModal}
                  isLoginText="立即分享"
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.permissionBlock, rootClassName)}>
      <div className={styles.container}>
        <ModalContent />
        <div className={styles.ctaButtonContainer}>
          <CallToLoginShareButton to={to} isLoginText="立即分享" />
        </div>
      </div>
    </div>
  );
};

BasicPermissionBlock.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rootClassName: PropTypes.string,
  simple: PropTypes.bool,
};

BasicPermissionBlock.defaultProps = {
  rootClassName: '',
  simple: false,
};

export default BasicPermissionBlock;
