import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import Loader from 'common/Loader';

import styles from './ExperienceDetail.module.css';
import Article from './Article';
import ReactionZone from './ReactionZone';
// import RecommendationZone from './RecommendationZone';
import MessageBoard from './MessageBoard';
import status from '../../constants/status';
import {
  fetchExperience,
} from '../../actions/experienceDetail';
import { formatCanonicalPath } from '../../utils/helmetHelper';

class ExperienceDetail extends Component {
  static propTypes = {
    experienceDetail: ImmutablePropTypes.map.isRequired,
    fetchExperience: React.PropTypes.func.isRequired,
    fetchReplies: React.PropTypes.func.isRequired,
    setTos: React.PropTypes.func.isRequired,
    likeExperience: React.PropTypes.func.isRequired,
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

  renderHelmet = () => {
    if (this.props.experienceDetail) {
      const experience = this.props.experienceDetail.toJS().experience;
      console.log(experience);
      if ('_id' in experience) {
        const id = experience._id;
        const company = experience.company.name;
        const jobTitle = experience.job_title;
        const type = experience.type;
        const sections = experience.sections;
        const mapping = {
          interview: '面試經驗分享',
          work: '工作經驗分享',
        };
        const title = `${company} ${jobTitle} ${mapping[type]}`;
        const description = `${sections[0].subtitle} ${sections[0].content}`;
        return (
          <Helmet
            title={title}
            meta={[
              { name: 'description', content: description },
              { property: 'og:title', content: title },
              { property: 'og:url', content: formatCanonicalPath(`/experiences/${id}`) },
              { property: 'og:description', content: description },
            ]}
            link={[
              { rel: 'canonical', href: formatCanonicalPath(`/experiences/${id}`) },
            ]}
          />
        );
      }
      return null;
    }
    return null;
  }

  render() {
    const {
      experienceDetail, setTos, setComment, likeExperience, likeReply,
    } = this.props;
    const data = experienceDetail.toJS();
    const experience = data.experience;
    return (
      <main className="wrapperL">
        {this.renderHelmet()}
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
        {
          data.experienceStatus === status.FETCHING
          ? <Loader />
          : <Article experience={experience} />
        }

        { /* 按讚，分享，檢舉區塊  */}
        <ReactionZone experience={experience} likeExperience={likeExperience} />

        { /* 返回列表 */}

        { /* 你可能還想看...  */}
        { /* <RecommendationZone /> */ }

        { /* 留言區塊  */}
        {
          data.replyStatus === status.FETCHING
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
