import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { compose, withState, withHandlers } from 'recompose';

import P from 'common/base/P';
import Modal from 'common/Modal';
import { Heading } from 'common/base';
import CallToLoginShareButton from '../../../containers/PermissionBlock/CallToLoginShareButtonContainer';
import styles from './PermissionBlock.module.css';

class BasicPermissionBlock extends React.Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    rootClassName: PropTypes.string,
    simple: PropTypes.bool,
    experienceCount: PropTypes.number.isRequired,
    timeAndSalaryCount: PropTypes.number.isRequired,
    hasFetchedExperienceCount: PropTypes.bool.isRequired,
    hasFetchedTimeAndSalaryCount: PropTypes.bool.isRequired,
    queryExperienceCount: PropTypes.func.isRequired,
    queryTimeAndSalaryCount: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
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
  }

  renderModalContent = () => {
    const { experienceCount, timeAndSalaryCount } = this.props;

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
          <strong>
            {timeAndSalaryCount + experienceCount} 筆薪資、面試資料
          </strong>
          。若你已經留過資料，登入即可查看全文！
        </P>
      </React.Fragment>
    );
  };

  render() {
    const { simple, to, rootClassName } = this.props;

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
                {this.renderModalContent()}
                <div className={styles.ctaButtonContainer}>
                  <CallToLoginShareButton
                    to={to}
                    onClick={toggleModal}
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
          {this.renderModalContent()}
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
