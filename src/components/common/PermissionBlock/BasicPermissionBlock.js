import React, { PropTypes } from 'react';

import styles from './PermissionBlock.module.css';

class BasicPermissionBlock extends React.Component {
  static propTypes = {
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
    const { experienceCount, timeAndSalaryCount, laborRightsCount } = this.props;
    return (
      <div className={styles['permission-block']}>
        <span>{`只要 40 秒，分享一筆你的 薪資 或 工時 或 面試 或 工作經驗，就能查看全站超過 ${timeAndSalaryCount} 筆薪資工時資訊、${experienceCount} 篇面試及工作經驗分享，以及 ${laborRightsCount} 篇的勞動權益懶人包哦！`}</span>
        <span>若你已經分享過資訊，登入即可查看全文！</span>
        <button> CTA button </button>
      </div>
    );
  }
}

export default BasicPermissionBlock;
