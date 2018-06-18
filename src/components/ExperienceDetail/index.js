import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import Helmet from 'react-helmet';
import ReactPixel from 'react-facebook-pixel';

import Loader from 'common/Loader';
import { Wrapper, Section } from 'common/base';
import Modal from 'common/Modal';
import NotFound from 'common/NotFound';
import FeedbackBlock from 'common/FeedbackBlock';

import Article from './Article';
import ReactionZone from '../../containers/ExperienceDetail/ReactionZone';
import RecommendationZone from './RecommendationZone';
import MessageBoard from '../../containers/ExperienceDetail/MessageBoard';
import BackToList from './BackToList';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ExperienceHeading from './Heading';

import status from '../../constants/status';
import {
  fetchExperience,
} from '../../actions/experienceDetail';
import ReportFormContainer from '../../containers/ExperienceDetail/ReportFormContainer';

import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { SITE_NAME } from '../../constants/helmetData';
import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';

import authStatus from '../../constants/authStatus';

const MODAL_TYPE = {
  REPORT_DETAIL: 'REPORT_TYPE',
  REPORT_API_ERROR: 'REPORT_API_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
};

function getPosition(obj) {
  let top = 0;
  let parent = obj;
  while (parent) {
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return top - 54; // deduct header
}

const experienceIdSelector = R.path(['params', 'id']);

class ExperienceDetail extends Component {
  static propTypes = {
    experienceDetail: ImmutablePropTypes.map.isRequired,
    replies: ImmutablePropTypes.list.isRequired,
    repliesStatus: PropTypes.string,
    fetchExperience: PropTypes.func.isRequired,
    fetchReplies: PropTypes.func.isRequired,
    fetchMyPermission: PropTypes.func.isRequired,
    likeExperience: PropTypes.func.isRequired,
    likeReply: PropTypes.func.isRequired,
    submitComment: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }),
    location: PropTypes.shape({
      state: PropTypes.shape({
        replyId: PropTypes.string,
        backable: PropTypes.bool,
      }),
    }),
    authStatus: PropTypes.string,
    canViewExperirenceDetail: PropTypes.bool.isRequired,
  }

  static fetchData({ store: { dispatch }, match }) {
    const experienceId = experienceIdSelector(match);
    return dispatch(fetchExperience(experienceId));
  }

  constructor(props) {
    super(props);
    this.goTo = true;
  }

  state = {
    isModalOpen: false,
    modalType: '',
  };

  componentDidMount() {
    const match = this.props.match;
    const experienceId = experienceIdSelector(match);

    if (this.props.experienceDetail.getIn(['experience', '_id']) !== experienceId) {
      this.props.fetchExperience(experienceId);
    }
    this.props.fetchReplies(experienceId);
    this.props.fetchMyPermission();

    // send Facebook Pixel 'ViewContent' event
    ReactPixel.track('ViewContent', {
      content_ids: [experienceId],
      content_category: PIXEL_CONTENT_CATEGORY.VIEW_EXPERIENCE,
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextMatch = nextProps.match;
    const match = this.props.match;

    const nextExperienceId = experienceIdSelector(nextMatch);
    const experienceId = experienceIdSelector(match);
    // if params changes due to route, we should refetch target experience
    if (nextExperienceId !== experienceId) {
      this.props.fetchExperience(nextExperienceId);
      this.props.fetchReplies(nextExperienceId);
      this.props.fetchMyPermission();
    }

    if (nextProps.authStatus !== this.props.authStatus && nextProps.authStatus === authStatus.CONNECTED) {
      this.props.fetchExperience(experienceId);
      this.props.fetchReplies(experienceId);
    }
  }

  componentDidUpdate(prevProps) {
    if (window && this.goTo && this.props.location.state && this.props.location.state.replyId) {
      const id = `reply-${this.props.location.state.replyId}`;
      if (document.getElementById(id)) {
        window.scrollTo(
          0,
          getPosition(document.getElementById(id))
        );
        this.goTo = false;
      }
    }

    // send Facebook Pixel 'ViewContent' event if goto reading another experience
    const prevExperienceId = experienceIdSelector(prevProps.match);
    const experienceId = experienceIdSelector(this.props.match);
    if (prevExperienceId !== experienceId) {
      ReactPixel.track('ViewContent', {
        content_ids: [experienceId],
        content_category: PIXEL_CONTENT_CATEGORY.VIEW_EXPERIENCE,
      });
    }
  }

  submitComment = comment => {
    const experienceId = experienceIdSelector(this.props.match);
    this.props.submitComment(experienceId, comment);
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
            id={experienceIdSelector(this.props.match)}
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
        const subtitle = experience.sections[0].subtitle ? experience.sections[0].subtitle.replace(/(\r\n|\n|\r)/gm, ' ')
          : '';
        const content = experience.sections[0].content.replace(/(\r\n|\n|\r)/gm, ' ');
        const mapping = {
          interview: '面試經驗分享',
          work: '工作經驗分享',
          intern: '實習經驗分享',
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
      likeExperience,
      likeReply,
      match,
      canViewExperirenceDetail,
    } = this.props;
    const id = experienceIdSelector(match);

    const {
      isModalOpen,
      modalType,
      modalPayload,
    } = this.state;

    const backable = R.pathOr(false, ['location', 'state', 'backable'], this.props);
    const data = this.props.experienceDetail.toJS();

    const {
      experience,
      experienceStatus,
      experienceError,
    } = data;
    const replies = this.props.replies.toJS();
    const repliesStatus = this.props.repliesStatus;

    if (experienceError) {
      switch (experienceError.statusCode) {
        case 403:
          return (<NotFound heading="本篇文章已經被原作者隱藏，目前無法查看" status={403} />);
        case 404:
          return (<NotFound />);
        default:
          return null;
      }
    }

    return (
      <main>
        {this.renderHelmet()}
        <Section bg="white" paddingBottom pageTop>
          <Wrapper size="l">

            <ExperienceHeading experience={experience} />

            { /* 文章區塊  */}
            {
              experienceStatus === status.FETCHING
              ? <Loader />
              : <Article experience={experience} hideContent={!canViewExperirenceDetail} />
            }

            { /* 按讚，分享，檢舉區塊  */}
            <ReactionZone
              experience={experience}
              likeExperience={likeExperience}
              openReportDetail={() => this.handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL)}
              id={id}
            />
            <BackToList
              backable={backable}
            />
            <FeedbackBlock category="ExperienceDetailFeedback" />
          </Wrapper>
        </Section>

        { /* 你可能還想看...  */}
        <RecommendationZone id={id} />

        { /* 留言區塊  */}
        <Section paddingBottom>
          <Wrapper size="s">
            {
              repliesStatus === status.FETCHING
              ? <Loader size="s" />
              : <MessageBoard
                replies={replies}
                likeReply={likeReply}
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
    );
  }
}

export default ExperienceDetail;
