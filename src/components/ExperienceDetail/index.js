import PropTypes from 'prop-types';
import R from 'ramda';
import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Element as ScrollElement, scroller } from 'react-scroll';

import {
  queryExperience,
  queryExperienceIfUnfetched,
  queryRelatedExperiencesOnExperience,
} from 'actions/experience';
import { Section, Wrapper } from 'common/base';
import BreadCrumb from 'common/BreadCrumb';
import Loader from 'common/Loader';
import NotFound from 'common/NotFound';
import { paramsSelector } from 'common/routing/selectors';
import { PageType, TabType } from 'constants/companyJobTitle';
import { COMMENT_ZONE } from 'constants/formElements';
import usePermission from 'hooks/usePermission';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import { isUiNotFoundError } from 'utils/errors';
import { isError, isFetched } from 'utils/fetchBox';

import Article from './Article';
import VISIBILITY from './Article/visibility';
import ChartsZone from './ChartsZone';
import styles from './ExperienceDetail.module.css';
import ExperienceHeading from './Heading';
import useTrace from './hooks/useTrace';
import MessageBoard from './MessageBoard';
import MoreExperiencesBlock from './MoreExperiencesBlock';
import Seo from './Seo';
import { generateBreadCrumbData } from '../CompanyAndJobTitle/utils';

// from params
const experienceIdSelector = R.prop('id');
const useExperienceId = () => {
  const params = useParams();
  return experienceIdSelector(params);
};

const experienceTypeToTabType = {
  work: TabType.WORK_EXPERIENCE,
  interview: TabType.INTERVIEW_EXPERIENCE,
};

const pageTypeToNameSelector = {
  [PageType.COMPANY]: R.path(['company', 'name']),
  [PageType.JOB_TITLE]: R.path(['job_title', 'name']),
};

const useExperienceBox = experienceId => {
  const selector = useMemo(() => experienceBoxSelectorAtId(experienceId), [
    experienceId,
  ]);
  return useSelector(selector);
};

const ExperienceDetail = () => {
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

  useTrace(experienceId);

  const location = useLocation();
  const pageType = R.pathOr(PageType.COMPANY, ['state', 'pageType'], location);

  const scrollToCommentZone = useCallback(() => {
    scroller.scrollTo(COMMENT_ZONE, { smooth: true, offset: -75 });
  }, []);

  if (isError(experienceBox)) {
    if (isUiNotFoundError(experienceBox.error)) {
      return <NotFound />;
    }
    return null;
  }

  return (
    <main>
      {isFetched(experienceBox) && <Seo experience={experienceBox.data} />}
      <Section paddingBottom className={styles.section}>
        <div>
          {/* 文章區塊  */}
          {!isFetched(experienceBox) ? (
            <Loader />
          ) : (
            <Fragment>
              <Wrapper size="l">
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
              </Wrapper>
              <Wrapper size="m">
                <ExperienceHeading experience={experienceBox.data} />
                <Article
                  experience={experienceBox.data}
                  visibility={
                    canViewPublishId(experienceBox.data.id)
                      ? VISIBILITY.VISIBLE
                      : VISIBILITY.LOCKED
                  }
                  onClickMsgButton={scrollToCommentZone}
                />
              </Wrapper>
            </Fragment>
          )}
        </div>
        {isFetched(experienceBox) && (
          <React.Fragment>
            <Wrapper size="m">
              <MoreExperiencesBlock experience={experienceBox.data} />
            </Wrapper>
            <Wrapper size="l">
              <ChartsZone
                companyName={experienceBox.data.company.name}
                jobTitle={experienceBox.data.job_title.name}
              />
            </Wrapper>
          </React.Fragment>
        )}
        <Wrapper size="s">
          <ScrollElement name={COMMENT_ZONE} />
          <MessageBoard experienceId={experienceId} />
        </Wrapper>
      </Section>
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
