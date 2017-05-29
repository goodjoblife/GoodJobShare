import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import Loader from 'common/Loader';

import styles from './ExperienceDetail.module.css';
import Article from './Article';
import RecommendationZone from './RecommendationZone';
import MessageBoard from './MessageBoard';
import status from '../../constants/status';

class ExperienceDetail extends Component {
  componentDidMount() {
    this.props.fetchExperience(this.props.params.id);
    this.props.fetchReplies(this.props.params.id);
  }

  render() {
    const {
      experienceDetail,
    } = this.props;
    const data = experienceDetail.toJS();
    const experience = data.experience;
    console.log('data', data);
    return (
      <main className="wrapperL">
        <Helmet
          title="面試‧工作經驗"
        />
        <div className={styles.heading}>
          <h2 className={`${styles.badge} pM`}>面試</h2>
          <h1 className="headingL">日月光半導體製造股份有限公司 {experience._id}</h1>
        </div>

        { /* 文章區塊  */}
        <Article />

        { /* 按讚，分享，檢舉區塊  */}

        { /* 返回列表 */}

        { /* 你可能還想看...  */}
        <RecommendationZone />

        { /* 留言區塊  */}
        {
          data.loadingStatus === status.FETCHING
          ? <Loader />
          : <MessageBoard replies={data.replies} />
        }
      </main>
    );
  }
}

ExperienceDetail.propTypes = {
  experienceDetail: ImmutablePropTypes.map.isRequired,
  fetchExperience: React.PropTypes.func.isRequired,
  fetchReplies: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};

export default ExperienceDetail;
