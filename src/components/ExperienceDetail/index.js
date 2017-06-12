import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import Loader from 'common/Loader';

import styles from './ExperienceDetail.module.css';
import Article from './Article';
import ReactionZone from './ReactionZone';
import RecommendationZone from './RecommendationZone';
import MessageBoard from './MessageBoard';
import status from '../../constants/status';
import {
  fetchExperience,
} from '../../actions/experienceDetail';

class ExperienceDetail extends Component {
  static propTypes = {
    experienceDetail: ImmutablePropTypes.map.isRequired,
    fetchExperience: React.PropTypes.func.isRequired,
    fetchReplies: React.PropTypes.func.isRequired,
    setTos: React.PropTypes.func.isRequired,
    likeReply: React.PropTypes.func.isRequired,
    setComment: React.PropTypes.func.isRequired,
    submitComment: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  static fetchData({ store, params }) {
    return store.dispatch(fetchExperience(params.id));
  }

  constructor() {
    super();
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    if (this.props.experienceDetail.getIn(['experience', '_id']) !== this.props.params.id) {
      this.props.fetchExperience(this.props.params.id);
    }
    this.props.fetchReplies(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // if params.id changes due to route, we should refetch target experience
    if (nextProps.params.id !== this.props.params.id) {
      this.props.fetchExperience(nextProps.params.id);
      this.props.fetchReplies(nextProps.params.id);
    }
  }

  submitComment() {
    const { experienceDetail } = this.props;
    const data = experienceDetail.toJS();
    this.props.submitComment(data.experience._id);
  }

  render() {
    const {
      experienceDetail, setTos, setComment, likeReply,
    } = this.props;
    const data = experienceDetail.toJS();
    const experience = data.experience;
    return (
      <main className="wrapperL">
        <Helmet
          title="面試‧工作經驗"
        />
        <div className={styles.heading}>
          <h2 className={`${styles.badge} pM`}>
            {experience.type === 'work' ? '工作' : '面試'}
          </h2>
          <h1 className="headingL">
            {experience && experience.company && (
              typeof experience.company.name === 'string'
              ? experience.company.name
              : experience.company.name.join(' / ')
            )}
          </h1>
        </div>

        { /* 文章區塊  */}
        <Article experience={experience} />

        { /* 按讚，分享，檢舉區塊  */}
        <ReactionZone />

        { /* 返回列表 */}

        { /* 你可能還想看...  */}
        <RecommendationZone />

        { /* 留言區塊  */}
        {
          data.loadingStatus === status.FETCHING
          ? <Loader />
          : <MessageBoard
            replies={data.replies}
            likeReply={likeReply}
            tos={data.tos} setTos={setTos}
            comment={data.comment} setComment={setComment}
            submitComment={this.submitComment}
          />
        }
      </main>
    );
  }
}

export default ExperienceDetail;
