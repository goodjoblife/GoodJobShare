import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Element as ScrollElement, scroller } from 'react-scroll';
import cn from 'classnames';
import { useParams, useLocation } from 'react-router-dom';
import Loader from 'common/Loader';
import { Wrapper, Section } from 'common/base';
import Modal from 'common/Modal';
import NotFound from 'common/NotFound';
import PopoverToggle from 'common/PopoverToggle';
import BreadCrumb from 'common/BreadCrumb';
import { isUiNotFoundError } from 'utils/errors';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
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
import { isError, isFetched } from 'utils/fetchBox';
import {
  queryExperience,
  queryExperienceIfUnfetched,
  queryRelatedExperiencesOnExperience,
} from 'actions/experience';
import ReportForm from './ReportForm';
import { COMMENT_ZONE } from 'constants/formElements';
import {
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
} from 'constants/companyJobTitle';
import { generateBreadCrumbData } from '../CompanyAndJobTitle/utils';
import styles from './ExperienceDetail.module.css';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import Button from 'common/button/Button';
import useIsMyPublishId from 'hooks/useIsMyPublishId';

const MODAL_TYPE = {
  REPORT_DETAIL: 'REPORT_TYPE',
  REPORT_API_ERROR: 'REPORT_API_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
};

// from params
const experienceIdSelector = R.prop('id');
const useExperienceId = () => {
  const params = useParams();
  return experienceIdSelector(params);
};

const experienceTypeToTabType = {
  work: TAB_TYPE.WORK_EXPERIENCE,
  interview: TAB_TYPE.INTERVIEW_EXPERIENCE,
};

const pageTypeToNameSelector = {
  [PAGE_TYPE.COMPANY]: R.path(['company', 'name']),
  [PAGE_TYPE.JOB_TITLE]: R.path(['job_title', 'name']),
};

const useExperienceBox = experienceId => {
  const selector = useMemo(() => experienceBoxSelectorAtId(experienceId), [
    experienceId,
  ]);
  return useSelector(selector);
};

const useHideContent = ({ experienceId }) => {
  const isMyExperienceId = useIsMyPublishId();

  const isMyPublish = useMemo(() => isMyExperienceId(experienceId), [
    isMyExperienceId,
    experienceId,
  ]);

  const [, fetchPermission, canView] = usePermission();

  useEffect(() => {
    fetchPermission();
  }, [experienceId, fetchPermission]);

  const hideContent = useMemo(() => {
    return !isMyPublish && !canView;
  }, [isMyPublish, canView]);

  return hideContent;
};

const ExperienceDetail = ({ ...props }) => {
  const experienceId = useExperienceId();
  const experienceBox = useExperienceBox(experienceId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperienceIfUnfetched(experienceId));
  }, [dispatch, experienceId]);

  const hideContent = useHideContent({ experienceId });

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

  const location = useLocation();
  const pageType = R.pathOr(PAGE_TYPE.COMPANY, ['state', 'pageType'], location);

  const scrollToCommentZone = useCallback(() => {
    scroller.scrollTo(COMMENT_ZONE, { smooth: true, offset: -75 });
  }, []);

  const renderModalChildren = useCallback(
    modalType => {
      switch (modalType) {
        case MODAL_TYPE.REPORT_DETAIL:
          return (
            <ReportForm
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
          <Button
            circleSize="md"
            btnStyle="black"
            onClick={() => {
              setModalClosableOnClickOutside(false);
              handleIsModalOpen(true, MODAL_TYPE.REPORT_DETAIL);
            }}
            className={cn(
              ReactionZoneStyles.reportButton,
              ReactionZoneStyles.button,
            )}
          >
            檢舉
          </Button>
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

  if (isError(experienceBox)) {
    if (isUiNotFoundError(experienceBox.error)) {
      return <NotFound />;
    }
    return null;
  }

  return (
    <main>
      {isFetched(experienceBox) && <Seo experience={experienceBox.data} />}
      <Section bg="white" paddingBottom className={styles.section}>
        <Wrapper size="m">
          <div>
            {/* 文章區塊  */}
            {!isFetched(experienceBox) ? (
              <Loader />
            ) : (
              <Fragment>
                <div className={styles.breadCrumb}>
                  <BreadCrumb
                    data={generateBreadCrumbData({
                      pageType,
                      pageName: pageTypeToNameSelector[pageType](
                        experienceBox.data,
                      ),
                      tabType: experienceTypeToTabType[experienceBox.data.type],
                      experience: experienceBox.data,
                    })}
                  />
                </div>
                <ExperienceHeading experience={experienceBox.data} />
                {reportZone}
                <Article
                  experience={experienceBox.data}
                  hideContent={hideContent}
                  onClickMsgButton={scrollToCommentZone}
                />
              </Fragment>
            )}
          </div>
        </Wrapper>
        {isFetched(experienceBox) && (
          <React.Fragment>
            <Wrapper size="m">
              <MoreExperiencesBlock experience={experienceBox.data} />
            </Wrapper>
            <Wrapper size="l">
              <ChartsZone experience={experienceBox.data} />
            </Wrapper>
          </React.Fragment>
        )}
        <Wrapper size="s">
          <ScrollElement name={COMMENT_ZONE} />
          <MessageBoard experienceId={experienceId} />
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      pageType: PropTypes.string,
      replyId: PropTypes.string,
    }),
  }),
};

ExperienceDetail.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const experienceId = experienceIdSelector(params);
  return Promise.all([
    dispatch(queryExperience(experienceId)),
    dispatch(queryRelatedExperiencesOnExperience(experienceId)),
  ]);
};

export default ExperienceDetail;
