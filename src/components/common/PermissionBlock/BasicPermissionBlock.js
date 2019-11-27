import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { compose, withState, withHandlers } from 'recompose';

import P from 'common/base/P';
import { Heading } from 'common/base';
import CallToLoginShareButton from '../../../containers/PermissionBlock/CallToLoginShareButtonContainer';
import getScale from '../../../utils/numberUtils';
import styles from './PermissionBlock.module.css';
import Modal from 'common/Modal';

class BasicPermissionBlock extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    rootClassName: PropTypes.string,
    simple: PropTypes.bool,
    experienceCount: PropTypes.number.isRequired,
    timeAndSalaryCount: PropTypes.number.isRequired,
    laborRightsCount: PropTypes.number.isRequired,
    hasFetchedExperienceCount: PropTypes.bool.isRequired,
    hasFetchedTimeAndSalaryCount: PropTypes.bool.isRequired,
    hasFetchedLaborRightsCount: PropTypes.bool.isRequired,
    queryExperienceCount: PropTypes.func.isRequired,
    queryTimeAndSalaryCount: PropTypes.func.isRequired,
    queryLaborRightsCount: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    to: '/share/interview/step1',
    rootClassName: '',
    simple: false,
  };

  componentDidMount() {
    if (this.props.hasFetchedExperienceCount === false) {
      this.props.queryExperienceCount();
    }
    if (this.props.hasFetchedTimeAndSalaryCount === false) {
      this.props.queryTimeAndSalaryCount();
    }
    if (this.props.hasFetchedLaborRightsCount === false) {
      this.props.queryLaborRightsCount();
    }
  }

  render() {
    const {
      simple,
      to,
      rootClassName,
      experienceCount,
      timeAndSalaryCount,
      laborRightsCount,
    } = this.props;
    const experienceScale = getScale(experienceCount);
    const timeAndSalaryScale = getScale(timeAndSalaryCount);

    if (simple) {
      const { isModalOpen, toggleModal } = this.props;
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
                <div className={styles.headingContainer}>
                  <Heading size="sl" Tag="h3">
                    你暫時沒有查看完整資訊的權限
                  </Heading>
                </div>
                <P size="l" className={styles.ctaText}>
                  只需幾分鐘，
                  <strong>分享你的職場資訊</strong>
                  ，不僅幫助其他人不再踩雷，更能
                  <strong>{`查看全站超過 ${timeAndSalaryScale} 筆`}</strong>
                  薪資工時資訊、
                  <strong>{`${experienceScale}+ 篇`}</strong>
                  面試及工作經驗分享，以及
                  <strong>{` ${laborRightsCount} 篇`}</strong>
                  勞動權益懶人包哦！
                </P>
                <br />
                <P size="l">
                  <strong>若你已經分享過資訊，登入即可查看全文！</strong>
                </P>
                <div className={styles.ctaButtonContainer}>
                  <CallToLoginShareButton to={to} isLoginText="立即分享" />
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
          <div className={styles.headingContainer}>
            <FontAwesomeIcon icon={faLock} className={styles.headingIcon} />
            <Heading size="sl" Tag="h3">
              你暫時沒有查看完整資訊的權限
            </Heading>
          </div>
          <P size="l" className={styles.ctaText}>
            只需幾分鐘，
            <strong>分享你的職場資訊</strong>
            ，不僅幫助其他人不再踩雷，更能
            <strong>{`查看全站超過 ${timeAndSalaryScale} 筆`}</strong>
            薪資工時資訊、
            <strong>{`${experienceScale}+ 篇`}</strong>
            面試及工作經驗分享，以及
            <strong>{` ${laborRightsCount} 篇`}</strong>
            勞動權益懶人包哦！
          </P>
          <br />
          <P size="l">
            <strong>若你已經分享過資訊，登入即可查看全文！</strong>
          </P>
          <div className={styles.ctaButtonContainer}>
            <CallToLoginShareButton to={to} isLoginText="立即分享" />
          </div>
        </div>
      </div>
    );
  }
}

const enhance = compose(
  withState('isModalOpen', 'setModalOpen', false),
  withHandlers({
    toggleModal: ({ isModalOpen, setModalOpen }) => () => {
      setModalOpen(!isModalOpen);
    },
  }),
);

export default enhance(BasicPermissionBlock);
