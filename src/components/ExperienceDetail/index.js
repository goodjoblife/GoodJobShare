import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import Helmet from 'react-helmet';
import ReactPixel from 'react-facebook-pixel';
import { Element as ScrollElement } from 'react-scroll';
import { compose, setStatic, withState, withHandlers } from 'recompose';
import cn from 'classnames';

import Loader from 'common/Loader';
import { Wrapper, Section } from 'common/base';
import Modal from 'common/Modal';
import NotFound from 'common/NotFound';
import ReportDetail from 'common/reaction/ReportDetail';
import PopoverToggle from 'common/PopoverToggle';
import { withPermission } from 'common/permission-context';
import { isUiNotFoundError } from 'utils/errors';

import Article from './Article';
import MessageBoard from '../../containers/ExperienceDetail/MessageBoard';
import BackToList from './BackToList';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ExperienceHeading from './Heading';
import ReportInspectModal from './ReactionZone/ReportInspectModal';
import ReactionZoneOtherOptions from './ReactionZone/ReactionZoneOtherOptions';
import ReactionZoneStyles from './ReactionZone/ReactionZone.module.css';

import { isFetching, isFetched, isError } from '../../constants/status';
import { fetchExperience } from '../../actions/experienceDetail';
import ReportFormContainer from '../../containers/ExperienceDetail/ReportFormContainer';
import ViewLog from '../../containers/ExperienceDetail/ViewLog';

import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { SITE_NAME } from '../../constants/helmetData';
import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';

import authStatus from '../../constants/authStatus';
import { COMMENT_ZONE } from '../../constants/formElements';

import { paramsSelector } from 'common/routing/selectors';
import {
  metaTitleSelector,
  metaDescriptionSelector,
} from './experienceSelector';

import LikeZone from '../../containers/ExperienceDetail/LikeZone';
import styles from './ExperienceDetail.module.css';
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

const experienceIdSelector = R.compose(
  params => params.id,
  paramsSelector,
);

class ExperienceDetail extends Component {
  static propTypes = {
    experienceDetail: ImmutablePropTypes.map.isRequired,
    replies: ImmutablePropTypes.list.isRequired,
    repliesStatus: PropTypes.string,
    fetchExperience: PropTypes.func.isRequired,
    fetchReplies: PropTypes.func.isRequired,
    fetchPermission: PropTypes.func.isRequired,
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
    canViewExperienceDetail: PropTypes.bool.isRequired,
    isInspectReportOpen: PropTypes.bool.isRequired,
    toggleReportInspectModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.goTo = true;
  }

  state = {
    isModalOpen: false,
    modalType: '',
    ModalClosableOnClickOutside: true,
  };

  componentDidMount() {
    const experienceId = experienceIdSelector(this.props);

    this.props.fetchExperience(experienceId);
    this.props.fetchReplies(experienceId);
    this.props.fetchPermission();

    // send Facebook Pixel 'ViewContent' event
    ReactPixel.track('ViewContent', {
      content_ids: [experienceId],
      content_category: PIXEL_CONTENT_CATEGORY.VIEW_EXPERIENCE,
    });
  }

  componentDidUpdate(prevProps) {
    const prevExperienceId = experienceIdSelector(prevProps);
    const experienceId = experienceIdSelector(this.props);
    // if params changes due to route, we should refetch target experience
    if (prevExperienceId !== experienceId) {
      this.props.fetchExperience(experienceId);
      this.props.fetchReplies(experienceId);
      this.props.fetchPermission();
    }

    if (
      prevProps.authStatus !== this.props.authStatus &&
      this.props.authStatus === authStatus.CONNECTED
    ) {
      this.props.fetchExperience(experienceId);
      this.props.fetchReplies(experienceId);
    }

    if (
      window &&
      this.goTo &&
      this.props.location.state &&
      this.props.location.state.replyId
    ) {
      const id = `reply-${this.props.location.state.replyId}`;
      if (document.getElementById(id)) {
        window.scrollTo(0, getPosition(document.getElementById(id)));
        this.goTo = false;
      }
    }

    // send Facebook Pixel 'ViewContent' event if goto reading another experience
    if (prevExperienceId !== experienceId) {
      ReactPixel.track('ViewContent', {
        content_ids: [experienceId],
        content_category: PIXEL_CONTENT_CATEGORY.VIEW_EXPERIENCE,
      });
    }
  }

  submitComment = comment => {
    const experienceId = experienceIdSelector(this.props);
    this.props.submitComment(experienceId, comment);
  };

  handleIsModalOpen = (isModalOpen, modalType, modalPayload = {}) =>
    this.setState({
      isModalOpen,
      modalType,
      modalPayload,
    });

  setModalClosableOnClickOutside = closableOnClickOutside => {
    this.setState({
      closableOnClickOutside,
    });
  };

  renderModalChildren = modalType => {
    const { modalPayload } = this.state;

    switch (modalType) {
      case MODAL_TYPE.REPORT_DETAIL:
        return (
          <ReportFormContainer
            close={() => this.handleIsModalOpen(false)}
            id={experienceIdSelector(this.props)}
            onApiError={pload => {
              this.setModalClosableOnClickOutside(false);
              this.handleIsModalOpen(true, MODAL_TYPE.REPORT_API_ERROR, pload);
            }}
            onSuccess={() => {
              this.setModalClosableOnClickOutside(true);
              this.handleIsModalOpen(true, MODAL_TYPE.REPORT_SUCCESS);
            }}
          />
        );
      case MODAL_TYPE.REPORT_API_ERROR:
        return (
          <ApiErrorFeedback
            buttonClick={() => {
              this.setModalClosableOnClickOutside(false);
              this.handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
            }}
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
  };

  renderReportZone = () => {
    const { toggleReportInspectModal } = this.props;
    return (
      <React.Fragment>
        <div className={styles.functionButtons}>
          <ReportDetail
            label="檢舉"
            onClick={() => {
              this.setModalClosableOnClickOutside(false);
              this.handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
            }}
            className={cn(styles.button, ReactionZoneStyles.button)}
          />
          <PopoverToggle
            className={cn(styles.button, ReactionZoneStyles.moreButton)}
            popoverClassName={ReactionZoneStyles.popover}
            popoverContent={
              <ReactionZoneOtherOptions
                toggleReportInspectModal={toggleReportInspectModal}
              />
            }
          >
            <div className={ReactionZoneStyles.popoverIcon}>
              <span />
            </div>
          </PopoverToggle>
        </div>
      </React.Fragment>
    );
  };

  renderHelmet = () => {
    const data = this.props.experienceDetail.toJS();
    const { experience, experienceStatus } = data;

    if (isFetched(experienceStatus)) {
      const id = experience._id;
      const title = metaTitleSelector(experience);
      let description = metaDescriptionSelector(experience);
      description = description.slice(0, 160);
      return (
        <Helmet>
          <title itemProp="name" lang="zh-TW">
            {title}
          </title>
          <meta name="description" content={description} />
          <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
          <meta property="og:description" content={description} />
          <meta
            property="og:url"
            content={formatCanonicalPath(`/experiences/${id}`)}
          />
          <link
            rel="canonical"
            href={formatCanonicalPath(`/experiences/${id}`)}
          />
        </Helmet>
      );
    }
    return null;
  };

  renderStructureData = () => {
    const data = this.props.experienceDetail.toJS();
    const { experience, experienceStatus } = data;

    if (isFetched(experienceStatus)) {
      const id = experience._id;
      const title = metaTitleSelector(experience);
      const description = metaDescriptionSelector(experience);
      const data = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': formatCanonicalPath(`/experiences/${id}`),
        },
        headline: `${title}`,
        datePublished: `${experience.created_at}`,
        dateModified: `${experience.created_at}`,
        author: {
          '@type': 'Organization',
          name: 'GoodJob 職場透明化運動',
        },
        publisher: {
          '@type': 'Organization',
          name: 'GoodJob 職場透明化運動',
          logo: {
            '@type': 'ImageObject',
            url:
              'https://image.goodjob.life/logo_for_structure_data_600x60.jpg',
          },
        },
        description,
      };
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      );
    }
  };

  render() {
    const {
      likeExperience,
      likeReply,
      canViewExperienceDetail,
      isInspectReportOpen,
      toggleReportInspectModal,
    } = this.props;
    const id = experienceIdSelector(this.props);

    const {
      isModalOpen,
      modalType,
      modalPayload,
      closableOnClickOutside,
    } = this.state;

    const backable = R.pathOr(
      false,
      ['location', 'state', 'backable'],
      this.props,
    );
    const data = this.props.experienceDetail.toJS();

    const { experience, experienceStatus, experienceError } = data;
    const replies = this.props.replies.toJS();
    const repliesStatus = this.props.repliesStatus;

    if (isError(experienceStatus)) {
      if (isUiNotFoundError(experienceError)) {
        return <NotFound />;
      }
      return null;
    }

    return (
      <main>
        {this.renderHelmet()}
        {this.renderStructureData()}
        <Section bg="white" paddingBottom className={styles.section}>
          <Wrapper size="m">
            {/* 文章區塊  */}
            {!isFetched(experienceStatus) ? (
              <Loader />
            ) : (
              <Fragment>
                <div className={styles.headingBlock}>
                  <div>
                    <BackToList backable={backable} className={styles.back} />
                  </div>
                  <ExperienceHeading experience={experience} />
                </div>
                {this.renderReportZone()}
                <Article
                  experience={experience}
                  hideContent={!canViewExperienceDetail}
                />
              </Fragment>
            )}
            <ReportInspectModal
              id={id}
              isOpen={isInspectReportOpen}
              toggleReportInspectModal={toggleReportInspectModal}
            />
            {isFetched(experienceStatus) && (
              <LikeZone
                experience={experience}
                likeExperience={likeExperience}
              />
            )}
          </Wrapper>
          <Wrapper size="s">
            <ScrollElement name={COMMENT_ZONE} />
            {isFetching(repliesStatus) ? (
              <Loader size="s" />
            ) : (
              <MessageBoard
                replies={replies}
                likeReply={likeReply}
                submitComment={this.submitComment}
              />
            )}
          </Wrapper>
        </Section>
        <Modal
          isOpen={isModalOpen}
          close={() => this.handleIsModalOpen(false)}
          hasClose={false}
          closableOnClickOutside={closableOnClickOutside}
        >
          {this.renderModalChildren(modalType, modalPayload)}
        </Modal>
        {isFetched(experienceStatus) && <ViewLog experienceId={id} />}
      </main>
    );
  }
}

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const experienceId = experienceIdSelector(props);
  return dispatch(fetchExperience(experienceId));
});

const hoc = compose(
  ssr,
  withPermission,
  withState('isInspectReportOpen', 'setIsInspectReportOpen', false),
  withHandlers({
    toggleReportInspectModal: ({
      isInspectReportOpen,
      setIsInspectReportOpen,
    }) => () => {
      setIsInspectReportOpen(!isInspectReportOpen);
    },
  }),
);

export default hoc(ExperienceDetail);
