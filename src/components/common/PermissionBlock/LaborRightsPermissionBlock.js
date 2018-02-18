import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import P from 'common/base/P';
import MarkdownParser from '../../LaborRightsSingle/MarkdownParser';
import CallToLoginShareButton from '../../../containers/PermissionBlock/CallToLoginShareButtonContainer';
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
    return (
      <div className={cn(styles.permissionBlock, rootClassName)}>
        <div className={styles.container}>
          <P size="l" className={styles.ctaText}>
            <strong>只要 40 秒</strong>，分享一筆你的 薪資<strong> 或 </strong>工時
            <strong> 或 </strong>面試<strong> 或 </strong> 工作經驗，就能
            <strong>查看完整</strong>的懶人包，內容包含：
          </P>
          <div className={styles.descriptionContainer}>
            <MarkdownParser content={description} />
          </div>
          <P size="l" className={styles.ctaText}>
            還可以查看
            <strong>{`全站 ${timeAndSalaryCount} 筆`}</strong>薪資工時資訊、
            <strong>{`${experienceCount} 篇`}</strong>面試及工作經驗分享，以及其他
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
