import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import { Element as ScrollElement, scroller } from 'react-scroll';
import { compose, setStatic } from 'recompose';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import Loader from 'common/Loader';
import { Wrapper, Section } from 'common/base';
import Modal from 'common/Modal';
import NotFound from 'common/NotFound';
import ReportDetail from 'common/reaction/ReportDetail';
import PopoverToggle from 'common/PopoverToggle';
import { withPermission } from 'common/permission-context';
import BreadCrumb from 'common/BreadCrumb';
import { isUiNotFoundError } from 'utils/errors';
import { paramsSelector } from 'common/routing/selectors';
import { useLogin } from 'hooks/login';
import useTrace from './hooks/useTrace';
import Article from './Article';
import MessageBoard from './MessageBoard';
import Seo from './Seo';
import ApiErrorFeedback from './ReportForm/ApiErrorFeedback';
import ReportSuccessFeedback from './ReportForm/ReportSuccessFeedback';
import ExperienceHeading from './Heading';
import ReportInspectModal from './ReactionZone/ReportInspectModal';
import ReactionZoneOtherOptions from './ReactionZone/ReactionZoneOtherOptions';
import ReactionZoneStyles from './ReactionZone/ReactionZone.module.css';
import MoreExperiencesBlock from './MoreExperiencesBlock';
import ChartsZone from './ChartsZone';
import { isFetching } from 'constants/status';
import { isError, isFetched } from 'utils/fetchBox';
import { queryExperience } from 'actions/experience';
import { queryRelatedExperiencesOnExperience } from 'actions/experience';
import ReportFormContainer from '../../containers/ExperienceDetail/ReportFormContainer';
import { COMMENT_ZONE } from '../../constants/formElements';
import {
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
} from '../../constants/companyJobTitle';
import { generateBreadCrumbData } from '../CompanyAndJobTitle/utils';
import styles from './ExperienceDetail.module.css';
import { experienceStateSelector } from 'selectors/experienceSelector';

const MODAL_TYPE = {
  REPORT_DETAIL: 'REPORT_TYPE',
  REPORT_API_ERROR: 'REPORT_API_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
};

const experienceIdSelector = R.compose(
  params => params.id,
  paramsSelector,
);

const experienceTypeToTabType = {
  work: TAB_TYPE.WORK_EXPERIENCE,
  interview: TAB_TYPE.INTERVIEW_EXPERIENCE,
};

const pageTypeToNameSelector = {
  [PAGE_TYPE.COMPANY]: R.path(['company', 'name']),
  [PAGE_TYPE.JOB_TITLE]: R.path(['job_title', 'name']),
};

const ExperienceDetail = ({
  submitComment,
  likeReply,

  fetchReplies,

  // from withPermission
  canView,
  fetchPermission,
  permissionFetched,

  ...props
}) => {
  const params = useParams();
  const experienceId = params.id;

  const experienceState = useSelector(experienceStateSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperience(experienceId));
  }, [dispatch, experienceId]);

  useEffect(() => {
    fetchReplies(experienceId);
  }, [experienceId, fetchReplies]);

  const [isLoggedIn] = useLogin();

  useEffect(() => {
    if (isLoggedIn) {
      fetchReplies(experienceId);
    }
  }, [isLoggedIn, experienceId, fetchReplies]);

  useEffect(() => {
    fetchPermission();
  }, [experienceId, fetchPermission]);

  const [{ isModalOpen, modalType, modalPayload = {} }, setModal] = useState({
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

  const pageType = R.pathOr(
    PAGE_TYPE.COMPANY,
    ['location', 'state', 'pageType'],
    props,
  );

  const replies = props.replies.toJS();
  const repliesStatus = props.repliesStatus;

  const scrollToCommentZone = useCallback(() => {
    scroller.scrollTo(COMMENT_ZONE, { smooth: true, offset: -75 });
  }, []);

  const renderModalChildren = useCallback(
    modalType => {
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
            <ReportSuccessFeedback
              buttonClick={() => handleIsModalOpen(false)}
            />
          );
        default:
          return null;
      }
    },
    [experienceId, handleIsModalOpen, modalPayload.message],
  );

  const reportZone = useMemo(() => {
    return (
      <React.Fragment>
        <div className={styles.functionButtons}>
          <ReportDetail
            label="檢舉"
            onClick={() => {
              setModalClosableOnClickOutside(false);
              handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
            }}
            className={cn(
              ReactionZoneStyles.reportButton,
              ReactionZoneStyles.button,
            )}
          />
          <PopoverToggle
            className={ReactionZoneStyles.moreButton}
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
  }, [handleIsModalOpen]);

  if (isError(experienceState)) {
    if (isUiNotFoundError(experienceState.error)) {
      return <NotFound />;
    }
    return null;
  }

  return (
    <main>
      <Seo
        experienceState={{
          experienceStatus: experienceState.status,
          experience: experienceState.data,
        }}
      />
      <Section bg="white" paddingBottom className={styles.section}>
        <Wrapper size="m">
          <div>
            {/* 文章區塊  */}
            {!isFetched(experienceState) ? (
              <Loader />
            ) : (
              <Fragment>
                <div className={styles.breadCrumb}>
                  <BreadCrumb
                    data={generateBreadCrumbData({
                      pageType,
                      pageName: pageTypeToNameSelector[pageType](
                        experienceState.data,
                      ),
                      tabType:
                        experienceTypeToTabType[experienceState.data.type],
                      experience: experienceState.data,
                    })}
                  />
                </div>
                <ExperienceHeading experience={experienceState.data} />
                {reportZone}
                <Article
                  experience={experienceState.data}
                  hideContent={!canView}
                  onClickMsgButton={scrollToCommentZone}
                />
              </Fragment>
            )}
          </div>
        </Wrapper>
        {isFetched(experienceState) && (
          <React.Fragment>
            <Wrapper size="m">
              <MoreExperiencesBlock experience={experienceState.data} />
            </Wrapper>
            <Wrapper size="l">
              <ChartsZone experience={experienceState.data} />
            </Wrapper>
          </React.Fragment>
        )}
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
  replies: ImmutablePropTypes.list.isRequired,
  repliesStatus: PropTypes.string,
  fetchReplies: PropTypes.func.isRequired,
  fetchPermission: PropTypes.func.isRequired,
  likeReply: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      replyId: PropTypes.string,
      pageType: PropTypes.string,
    }),
  }),
  canView: PropTypes.bool.isRequired,
};

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const experienceId = experienceIdSelector(props);
  return Promise.all([
    dispatch(queryExperience(experienceId)),
    dispatch(queryRelatedExperiencesOnExperience(experienceId)),
  ]);
});

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(ExperienceDetail);
