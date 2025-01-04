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
import { useParams, useLocation } from 'react-router-dom';
import Loader from 'common/Loader';
import { Wrapper, Section } from 'common/base';
import NotFound from 'common/NotFound';
import BreadCrumb from 'common/BreadCrumb';
import { isUiNotFoundError } from 'utils/errors';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import useTrace from './hooks/useTrace';
import Article from './Article';
import MessageBoard from './MessageBoard';
import Seo from './Seo';
import ExperienceHeading from './Heading';
import ReportInspectModal from './ReactionZone/ReportInspectModal';
import MoreExperiencesBlock from './MoreExperiencesBlock';
import ChartsZone from './ChartsZone';
import { isError, isFetched } from 'utils/fetchBox';
import {
  queryExperience,
  queryExperienceIfUnfetched,
  queryRelatedExperiencesOnExperience,
} from 'actions/experience';
import { COMMENT_ZONE } from 'constants/formElements';
import {
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
} from 'constants/companyJobTitle';
import { generateBreadCrumbData } from '../CompanyAndJobTitle/utils';
import styles from './ExperienceDetail.module.css';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import ReportModal from './reportModal';
import { useReportModal } from './useReportModal';

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

const ExperienceDetail = ({ ...props }) => {
  const experienceId = useExperienceId();
  const experienceBox = useExperienceBox(experienceId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperienceIfUnfetched(experienceId));
  }, [dispatch, experienceId]);

  const [, fetchPermission, canViewPublishId] = usePermission({
    publishId: experienceId,
  });

  useEffect(() => {
    fetchPermission();
  }, [experienceId, fetchPermission]);

  const [reportInspectModalIsOpen, setReportInspectModalIsOpen] = useState(
    false,
  );

  useTrace(experienceId);

  const location = useLocation();
  const pageType = R.pathOr(PAGE_TYPE.COMPANY, ['state', 'pageType'], location);

  const scrollToCommentZone = useCallback(() => {
    scroller.scrollTo(COMMENT_ZONE, { smooth: true, offset: -75 });
  }, []);

  const {
    modalState,
    handleIsModalOpen,
    closableOnClickOutside,
    setModalClosableOnClickOutside,
  } = useReportModal();

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
                <Article
                  experience={experienceBox.data}
                  hideContent={!canViewPublishId(experienceBox.data.id)}
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
      <ReportModal
        modalState={modalState}
        handleIsModalOpen={handleIsModalOpen}
        closableOnClickOutside={closableOnClickOutside}
        setModalClosableOnClickOutside={setModalClosableOnClickOutside}
      />
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
