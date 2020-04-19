import React, { Fragment, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import { Element as ScrollElement } from 'react-scroll';
import { compose, setStatic } from 'recompose';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import Loader from 'common/Loader';
import { Wrapper, Section } from 'common/base';
import Modal from 'common/Modal';
import NotFound from 'common/NotFound';
import ReportDetail from 'common/reaction/ReportDetail';
import PopoverToggle from 'common/PopoverToggle';
import { withPermission } from 'common/permission-context';
import GoogleAdsense from 'common/GoogleAdsense';
import { isUiNotFoundError } from 'utils/errors';
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
import styles from './ExperienceDetail.module.css';

const MODAL_TYPE = {
  REPORT_DETAIL: 'REPORT_TYPE',
  REPORT_API_ERROR: 'REPORT_API_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
};

const experienceIdSelector = R.compose(
  params => params.id,
  paramsSelector,
);

const getPathForJobTitle = jobTitle => `/job-titles/${jobTitle}/overview`;

const ExperienceDetail = ({
  submitComment,
  likeReply,
  canView,

  fetchExperience,
  fetchReplies,
  fetchPermission,

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
      default:
        return null;
    }
  };

  const renderReportZone = () => {
    return (
      <React.Fragment>
        <div className={styles.functionButtons}>
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
                  <Article experience={experience} hideContent={!canView} />
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
        hasClose={false}
        closableOnClickOutside={closableOnClickOutside}
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
