import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';

import P from 'common/base/P';
import styles from './PermissionBlock.module.css';

class BasicPermissionBlock extends React.Component {
  static propTypes = {
    rootClassName: PropTypes.string,
    experienceCount: PropTypes.number.isRequired,
    timeAndSalaryCount: PropTypes.number.isRequired,
    laborRightsCount: PropTypes.number.isRequired,
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
    const { rootClassName, experienceCount, timeAndSalaryCount, laborRightsCount } = this.props;
    return (
      <div className={cn(styles.permissionBlock, rootClassName)}>
        <div className={styles.container}>
          <P size="l" className={styles.ctaText}>
            <strong>只要 40 秒</strong>，分享一筆你的 薪資<strong> 或 </strong>工時
            <strong> 或 </strong>面試<strong> 或 </strong> 工作經驗，就能查看
            <strong>{`全站 ${timeAndSalaryCount} 筆`}</strong>薪資工時資訊、
            <strong>{`${experienceCount} 篇`}</strong>面試及工作經驗分享，以及
            <strong>{` ${laborRightsCount} 篇`}</strong>勞動權益懶人包哦！
          </P>
          <br />
          <P size="l"><strong>若你已經分享過資訊，登入即可查看全文！</strong></P>
          <div className={styles.ctaButtonContainer}>
            <Link to={'/share'} className={cn('buttonCircleM', 'buttonBlack2')}>立即登入並分享</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicPermissionBlock;
