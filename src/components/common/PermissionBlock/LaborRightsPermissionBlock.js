import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import P from 'common/base/P';
import { Heading } from 'common/base';
import MarkdownParser from '../../LaborRightsSingle/MarkdownParser';
import CallToLoginShareButton from '../../../containers/PermissionBlock/CallToLoginShareButtonContainer';
import getScale from '../../../utils/numberUtils';
import styles from './PermissionBlock.module.css';

class BasicPermissionBlock extends React.Component {
  static propTypes = {
    rootClassName: PropTypes.string,
    experienceCount: PropTypes.number.isRequired,
    timeAndSalaryCount: PropTypes.number.isRequired,
    laborRightsCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    hasFetchedExperienceCount: PropTypes.bool.isRequired,
    hasFetchedTimeAndSalaryCount: PropTypes.bool.isRequired,
    hasFetchedLaborRightsCount: PropTypes.bool.isRequired,
    queryExperienceCount: PropTypes.func.isRequired,
    queryTimeAndSalaryCount: PropTypes.func.isRequired,
    queryLaborRightsCount: PropTypes.func.isRequired,
  }

  static defaultProps = {
    rootClassName: '',
  }

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
    const { rootClassName, experienceCount, timeAndSalaryCount, laborRightsCount, description } = this.props;
    const experienceScale = getScale(experienceCount);
    const timeAndSalaryScale = getScale(timeAndSalaryCount);
    return (
      <div className={cn(styles.permissionBlock, rootClassName)}>
        <div className={styles.container}>
          <div className={styles.headingContainer}>
            <FontAwesomeIcon icon={faLock} className={styles.headingIcon} />
            <Heading size="sl" Tag="h3">你暫時沒有查看完整資訊的權限</Heading>
          </div>
          <P size="l" className={styles.ctaText}>
            只需幾分鐘，<strong>分享你的職場資訊</strong>，不僅幫助其他人不再踩雷，更能
            <strong>查看完整的懶人包資訊</strong>，內容包含：
          </P>
          <div className={styles.descriptionContainer}>
            <MarkdownParser content={description} />
          </div>
          <P size="l" className={styles.ctaText}>
            除此之外，還可以
            <strong>{`查看全站超過 ${timeAndSalaryScale} 筆`}</strong>薪資工時資訊、
            <strong>{`${experienceScale}+ 篇`}</strong>面試及工作經驗分享，以及其他
            <strong>{` ${laborRightsCount - 1} 篇`}</strong>勞動權益懶人包哦！
          </P>
          <br />
          <P size="l"><strong>若你已經分享過資訊，登入即可查看全文！</strong></P>
          <div className={styles.ctaButtonContainer}>
            <CallToLoginShareButton to="/share" notLoginText="立即登入並分享" isLoginText="立即分享" />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicPermissionBlock;
