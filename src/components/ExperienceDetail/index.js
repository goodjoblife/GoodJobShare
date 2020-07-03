import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import { Element as ScrollElement } from 'react-scroll';
import { compose, setStatic } from 'recompose';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import ReactGA from 'react-ga';
import Loader from 'common/Loader';
import { Wrapper, Section, Heading, P } from 'common/base';
import PrivateMessageButton from 'common/button/PrivateMessageButton';
import Button from 'common/button/Button';
import Modal from 'common/Modal';
import NotFound from 'common/NotFound';
import ReportDetail from 'common/reaction/ReportDetail';
import PopoverToggle from 'common/PopoverToggle';
import { withPermission } from 'common/permission-context';
import GoogleAdsense from 'common/GoogleAdsense';
import { isUiNotFoundError } from 'utils/errors';
import {
  ViewArticleDetailTracker,
  ClickPrivateMessageButtonTracker,
} from 'utils/eventBasedTracking';
import { paramsSelector } from 'common/routing/selectors';
import useIsLogin from 'hooks/useIsLogin';
import useTrace from './hooks/useTrace';
import Article from './Article';
import MessageBoard from './MessageBoard';
import BackToList from './BackToList';
import Seo from './Seo';
import LikeZone from './LikeZone';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ExperienceHeading from './Heading';
import ReportInspectModal from './ReactionZone/ReportInspectModal';
import ReactionZoneOtherOptions from './ReactionZone/ReactionZoneOtherOptions';
import ReactionZoneStyles from './ReactionZone/ReactionZone.module.css';
import { isFetching, isFetched, isError } from '../../constants/status';
import { fetchExperience } from '../../actions/experienceDetail';
import ReportFormContainer from '../../containers/ExperienceDetail/ReportFormContainer';
import { COMMENT_ZONE } from '../../constants/formElements';
import breakpoints from '../../constants/breakpoints';
import { GA_CATEGORY, GA_ACTION } from '../../constants/gaConstants';
import styles from './ExperienceDetail.module.css';

const MODAL_TYPE = {
  REPORT_DETAIL: 'REPORT_TYPE',
  REPORT_API_ERROR: 'REPORT_API_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
  PRIVATE_MESSAGE: 'PRIVATE_MESSAGE',
};

const experienceIdSelector = R.compose(
  params => params.id,
  paramsSelector,
);

const getPathForJobTitle = jobTitle => `/job-titles/${jobTitle}/overview`;

const ExperienceDetail = ({
  submitComment,
  likeReply,

  fetchExperience,
  fetchReplies,

  // from withPermission
  canView,
  fetchPermission,
  permissionFetched,

  ...props
}) => {
  const params = useParams();
  const experienceId = params.id;
  const { width } = useWindowSize();

  useEffect(() => {
    fetchExperience(experienceId);
    fetchReplies(experienceId);
  }, [experienceId, fetchExperience, fetchReplies]);

  const isLogin = useIsLogin();

  useEffect(() => {
    if (isLogin) {
      fetchReplies(experienceId);
    }
  }, [isLogin, experienceId, fetchExperience, fetchReplies]);

  useEffect(() => {
    fetchPermission();
  }, [experienceId, fetchPermission]);

  const [{ isModalOpen, modalType, modalPayload }, setModal] = useState({
    isModalOpen: false,
    modalType: '',
  });

  const handleIsModalOpen = useCallback(
    (isModalOpen, modalType, modalPayload = {}) => {
      setModal({
        isModalOpen,
        modalType,
        modalPayload,
      });
    },
    [],
  );

  const [reportInspectModalIsOpen, setReportInspectModalIsOpen] = useState(
    false,
  );

  const [closableOnClickOutside, setModalClosableOnClickOutside] = useState(
    true,
  );

  useTrace(experienceId);

  const backable = R.pathOr(false, ['location', 'state', 'backable'], props);
  const data = props.experienceDetail.toJS();
  const { experience, experienceStatus, experienceError } = data;
  const replies = props.replies.toJS();
  const repliesStatus = props.repliesStatus;

  // send event to Amplitude
  const experienceDataId = useMemo(() => (experience ? experience._id : null), [
    experience,
  ]);
  useEffect(() => {
    if (experience && permissionFetched && experienceDataId === experienceId) {
      const contentLength = experience.sections
        ? experience.sections.reduce((accu, curr) => {
            const subTitleLength = curr.subtitle ? curr.subtitle.length : 0;
            const contentLength = curr.content ? curr.content.length : 0;
            return accu + subTitleLength + contentLength;
          }, 0)
        : 0;
      ViewArticleDetailTracker.sendEvent({
        id: experience._id,
        type: experience.type,
        contentLength,
        jobTitle: experience.job_title.name,
        company: experience.company.name,
        hasPermission: canView,
      });
    }
  }, [experienceDataId, permissionFetched, canView]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isError(experienceStatus)) {
    if (isUiNotFoundError(experienceError)) {
      return <NotFound />;
    }
    return null;
  }

  const renderModalChildren = modalType => {
    switch (modalType) {
      case MODAL_TYPE.REPORT_DETAIL:
        return (
          <ReportFormContainer
            close={() => handleIsModalOpen(false)}
            id={experienceId}
            onApiError={pload => {
              setModalClosableOnClickOutside(false);
              handleIsModalOpen(true, MODAL_TYPE.REPORT_API_ERROR, pload);
            }}
            onSuccess={() => {
              setModalClosableOnClickOutside(true);
              handleIsModalOpen(true, MODAL_TYPE.REPORT_SUCCESS);
            }}
          />
        );
      case MODAL_TYPE.REPORT_API_ERROR:
        return (
          <ApiErrorFeedback
            buttonClick={() => {
              setModalClosableOnClickOutside(false);
              handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
            }}
            message={modalPayload.message}
          />
        );
      case MODAL_TYPE.REPORT_SUCCESS:
        return (
          <ReportSuccessFeedback buttonClick={() => handleIsModalOpen(false)} />
        );
      // TOFIX: to test how much users need this function
      case MODAL_TYPE.PRIVATE_MESSAGE:
        return (
          <div>
            <Heading style={{ marginBottom: '25px', textAlign: 'center' }}>
              你想傳什麼訊息給原作者呢？
            </Heading>
            <P style={{ marginBottom: '30px' }}>
              我們正在努力開發這個功能中，不妨偷偷告訴我們你想私訊原作者什麼訊息，讓我們可以打造更好用的功能！
            </P>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a
                href="https://forms.gle/QgBDrws9sjpmgEex9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button btnStyle="submit">好啊，跟你們說</Button>
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderReportZone = () => {
    return (
      <React.Fragment>
        <div className={styles.functionButtons}>
          <PrivateMessageButton
            className={styles.topMsgButton}
            onClick={() => {
              handleIsModalOpen(true, MODAL_TYPE.PRIVATE_MESSAGE);
              ClickPrivateMessageButtonTracker.sendEvent({
                position:
                  ClickPrivateMessageButtonTracker.positions.nextToTopReportBtn,
              });
              ReactGA.event({
                category: GA_CATEGORY.TEST_NEW_FEATURE,
                action: GA_ACTION.CLICK_PRIVATE_MESSAGE_BUTTON,
              });
            }}
          />
          <ReportDetail
            label="檢舉"
            onClick={() => {
              setModalClosableOnClickOutside(false);
              handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
            }}
            className={cn(styles.button, ReactionZoneStyles.button)}
          />
          <PopoverToggle
            className={cn(styles.button, ReactionZoneStyles.moreButton)}
            popoverClassName={ReactionZoneStyles.popover}
            popoverContent={
              <ReactionZoneOtherOptions
                toggleReportInspectModal={() => {
                  setReportInspectModalIsOpen(true);
                }}
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

  return (
    <main>
      <Seo experienceState={data} />
      <Section bg="white" paddingBottom className={styles.section}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <Wrapper className={styles.wrapper} size="m">
              {/* 文章區塊  */}
              {!isFetched(experienceStatus) ? (
                <Loader />
              ) : (
                <Fragment>
                  <div className={styles.headingBlock}>
                    <div>
                      <BackToList
                        backable={backable}
                        className={styles.back}
                        defaultBackToURL={getPathForJobTitle(
                          experience.job_title.name,
                        )}
                      />
                    </div>
                    <ExperienceHeading experience={experience} />
                  </div>
                  {renderReportZone()}
                  <Article
                    experience={experience}
                    hideContent={!canView}
                    // TOFIX: temporal prop, to be improved
                    onClickMsgButton={() => {
                      handleIsModalOpen(true, MODAL_TYPE.PRIVATE_MESSAGE);
                      ClickPrivateMessageButtonTracker.sendEvent({
                        position:
                          ClickPrivateMessageButtonTracker.positions
                            .articleBottom,
                      });
                      ReactGA.event({
                        category: GA_CATEGORY.TEST_NEW_FEATURE,
                        action: GA_ACTION.CLICK_PRIVATE_MESSAGE_BUTTON,
                      });
                    }}
                  />
                </Fragment>
              )}
              <LikeZone experienceId={experienceId} />
            </Wrapper>
            <Wrapper size="s">
              <ScrollElement name={COMMENT_ZONE} />
              {isFetching(repliesStatus) ? (
                <Loader size="s" />
              ) : (
                <MessageBoard
                  replies={replies}
                  likeReply={likeReply}
                  submitComment={comment => {
                    submitComment(experienceId, comment);
                  }}
                />
              )}
            </Wrapper>
          </div>
          {width > breakpoints.md ? (
            <div className={styles.sideAds}>
              <GoogleAdsense
                style={{ display: 'block' }}
                slot="6339096692"
                format="auto"
                responsive="true"
              />
            </div>
          ) : null}
        </div>
      </Section>
      <Modal
        isOpen={isModalOpen}
        close={() => handleIsModalOpen(false)}
        closableOnClickOutside={closableOnClickOutside}
        hasClose
      >
        {renderModalChildren(modalType, modalPayload)}
      </Modal>
      <ReportInspectModal
        experienceId={experienceId}
        isOpen={reportInspectModalIsOpen}
        setIsOpen={setReportInspectModalIsOpen}
      />
    </main>
  );
};

ExperienceDetail.propTypes = {
  experienceDetail: ImmutablePropTypes.map.isRequired,
  replies: ImmutablePropTypes.list.isRequired,
  repliesStatus: PropTypes.string,
  fetchExperience: PropTypes.func.isRequired,
  fetchReplies: PropTypes.func.isRequired,
  fetchPermission: PropTypes.func.isRequired,
  likeReply: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      replyId: PropTypes.string,
      backable: PropTypes.bool,
    }),
  }),
  canView: PropTypes.bool.isRequired,
};

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const experienceId = experienceIdSelector(props);
  return dispatch(fetchExperience(experienceId));
});

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(ExperienceDetail);
