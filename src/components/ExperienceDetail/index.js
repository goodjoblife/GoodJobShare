import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import Loader from 'common/Loader';
import { Wrapper, Section, Heading, P } from 'common/base';
import Modal from 'common/Modal';
import NotFound from 'common/NotFound';

import styles from './ExperienceDetail.module.css';
import Article from './Article';
import ReactionZone from '../../containers/ExperienceDetail/ReactionZone';
import RecommendationZone from './RecommendationZone';
import MessageBoard from '../../containers/ExperienceDetail/MessageBoard';
import BackToList from './BackToList';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';

import status from '../../constants/status';
import {
  fetchExperience,
} from '../../actions/experienceDetail';
import ReportFormContainer from '../../containers/ExperienceDetail/ReportFormContainer';

import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { SITE_NAME } from '../../constants/helmetData';

import authStatus from '../../constants/authStatus';

const MODAL_TYPE = {
  REPORT_DETAIL: 'REPORT_TYPE',
  REPORT_API_ERROR: 'REPORT_API_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
};

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
    location: React.PropTypes.shape({
      query: React.PropTypes.shape({
        backable: React.PropTypes.string,
      }),
      state: React.PropTypes.shape({
        replyId: React.PropTypes.string,
      }),
    }),
    authStatus: React.PropTypes.string,
  }

  static fetchData({ store, params }) {
    return store.dispatch(fetchExperience(params.id));
  }

  static getPosition(obj) {
    let top = 0;
    let parent = obj;
    while (parent) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return top - 54; // deduct header
  }

  constructor() {
    super();
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      isModalOpen: false,
      modalType: '',
    };

    this.goTo = true;
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

    if (nextProps.authStatus !== this.props.authStatus && nextProps.authStatus === authStatus.CONNECTED) {
      this.props.fetchExperience(this.props.params.id);
    }
  }

  componentDidUpdate() {
    if (window && this.goTo && this.props.location.state && this.props.location.state.replyId) {
      const id = `reply-${this.props.location.state.replyId}`;
      if (document.getElementById(id)) {
        window.scrollTo(
          0,
          ExperienceDetail.getPosition(document.getElementById(id))
        );
        this.goTo = false;
      }
    }
  }

  submitComment() {
    const { experienceDetail } = this.props;
    const data = experienceDetail.toJS();
    this.props.submitComment(data.experience._id);
  }

  handleIsModalOpen = (isModalOpen, modalType, modalPayload = {}) =>
    this.setState({
      isModalOpen,
      modalType,
      modalPayload,
    })

  renderModalChildren = modalType => {
    const {
      modalPayload,
    } = this.state;

    switch (modalType) {
      case MODAL_TYPE.REPORT_DETAIL:
        return (
          <ReportFormContainer
            close={() => this.handleIsModalOpen(false)}
            id={this.props.params.id}
            onApiError={
              pload =>
                this.handleIsModalOpen(true, MODAL_TYPE.REPORT_API_ERROR, pload)
            }
            onSuccess={
              () =>
                this.handleIsModalOpen(true, MODAL_TYPE.REPORT_SUCCESS)
            }
          />
        );
      case MODAL_TYPE.REPORT_API_ERROR:
        return (
          <ApiErrorFeedback
            buttonClick={() => this.handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL)}
            message={modalPayload.message}
          />
        );
      case MODAL_TYPE.REPORT_SUCCESS:
        return (
          <ReportSuccessFeedback
            buttonClick={() => this.handleIsModalOpen(false)}
          />
        );
      default:
        return null;
    }
  }

  renderHelmet = () => {
    if (this.props.experienceDetail) {
      const experience = this.props.experienceDetail.toJS().experience;
      if ('_id' in experience) {
        const id = experience._id;
        const title = experience.title;
        const company = experience.company.name;
        const jobTitle = experience.job_title;
        const type = experience.type;
        const subtitle = experience.sections[0].subtitle.replace(/(\r\n|\n|\r)/gm, ' ');
        const content = experience.sections[0].content.replace(/(\r\n|\n|\r)/gm, ' ');
        const mapping = {
          interview: '面試經驗分享',
          work: '工作經驗分享',
        };
        const description = `${company} ${jobTitle} 的${mapping[type]}。 ${subtitle}：${content}`;
        return (
          <Helmet
            title={title}
            meta={[
              { name: 'description', content: description },
              { property: 'og:title', content: formatTitle(title, SITE_NAME) },
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
      experienceDetail, setTos, setComment, likeExperience, likeReply, params: { id },
    } = this.props;

    const {
      isModalOpen,
      modalType,
      modalPayload,
    } = this.state;

    const backable = this.props.location.query.backable || 'false';
    const data = experienceDetail.toJS();
    const experience = data.experience;

    return ((data.experienceError && data.experienceError.error)
      ? ((data.experienceError.error.status === 403 && <NotFound heading="本篇文章已經被原作者隱藏，目前無法查看" />) ||
         (data.experienceError.error.status === 404 && <NotFound />) || null)
      : (<main>
        {this.renderHelmet()}
        <Section bg="white" paddingBottom pageTop>
          <Wrapper size="l">
            <div className={styles.heading}>
              <P Tag="h2" size="l" className={styles.badge}>
                {experience.type === 'work' ? '工作' : '面試'}
              </P>
              <Heading size="l">
                {experience && experience.company && (
                  typeof experience.company.name === 'string'
                  ? experience.company.name
                  : experience.company.name.join(' / ')
                )}
              </Heading>
            </div>

            { /* 文章區塊  */}
            {
              data.experienceStatus === status.FETCHING
              ? <Loader />
              : <Article experience={experience} />
            }

            { /* 按讚，分享，檢舉區塊  */}
            <ReactionZone
              experience={experience}
              likeExperience={likeExperience}
              openReportDetail={() => this.handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL)}
              id={id}
            />

            <BackToList
              backable={JSON.parse(backable)}
            />
          </Wrapper>
        </Section>

        { /* 你可能還想看...  */}
        <RecommendationZone id={id} />

        { /* 留言區塊  */}
        <Section paddingBottom>
          <Wrapper size="s">
            {
              data.replyStatus === status.FETCHING
              ? <Loader size="s" />
              : <MessageBoard
                replies={data.replies}
                likeReply={likeReply}
                tos={data.tos} setTos={setTos}
                comment={data.comment} setComment={setComment}
                submitComment={this.submitComment}
              />
            }
          </Wrapper>
        </Section>
        <Modal
          isOpen={isModalOpen}
          close={() => this.handleIsModalOpen(false)}
          hasClose={false}
        >
          {this.renderModalChildren(modalType, modalPayload)}
        </Modal>
      </main>
    ));
  }
}

export default ExperienceDetail;
