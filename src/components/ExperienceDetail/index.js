import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';

import styles from './ExperienceDetail.module.css';
import Article from './Article';
import RecommendationZone from './RecommendationZone';
import MessageBoard from './MessageBoard';

class ExperienceDetail extends Component {
  componentDidMount() {
    this.props.fetchExperience(this.props.params.id);
  }

  render() {
    const experience = this.props.experienceDetail.get('experience');

    return (
      <main className="wrapperL">
        <Helmet
          title="面試‧工作經驗"
        />
        <div className={styles.heading}>
          <h2 className={`${styles.badge} pM`}>面試</h2>
          <h1 className="headingL">日月光半導體製造股份有限公司 {experience.get('_id')}</h1>
        </div>

        { /* 文章區塊  */}
        <Article />

        { /* 按讚，分享，檢舉區塊  */}

        { /* 返回列表 */}

        { /* 你可能還想看...  */}
        <RecommendationZone />

        { /* 留言區塊  */}
        <MessageBoard />
      </main>
    );
  }
}

ExperienceDetail.propTypes = {
  experienceDetail: ImmutablePropTypes.map.isRequired,
  fetchExperience: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};

export default ExperienceDetail;
