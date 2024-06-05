import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import { useParams } from 'react-router-dom';
import Loader from 'common/Loader';
import { Section } from 'common/base';
import { isUiNotFoundError } from 'utils/errors';
import NotFound from 'common/NotFound';
import CallToActionFolder from 'common/CallToAction/CallToActionFolder';
import FanPageBlock from 'common/FanPageBlock';
import { paramsSelector } from 'common/routing/selectors';
import { isFetching, isUnfetched, isError, isFetched } from 'constants/status';
import {
  queryMenu,
  queryEntry,
  queryMenuIfUnfetched,
  queryEntryIfUnfetched,
} from 'actions/laborRights';
import useEntry, { useNeighborEntry } from './useEntry';
import Body from './Body';
import Footer from './Footer';
import Helmet from './Helmet';
import styles from './LaborRightsSingle.module.css';

const entryIdSelector = params => params.id;

const LaborRightsSingle = () => {
  const params = useParams();
  const entryId = entryIdSelector(params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMenuIfUnfetched());
  }, [dispatch]);

  useEffect(() => {
    dispatch(queryEntryIfUnfetched(entryId));
  }, [dispatch, entryId]);

  const [entryStatus, entryError, entry] = useEntry(entryId);
  const [prevEntry, nextEntry] = useNeighborEntry(entryId);

  const { title, description, content, coverUrl, nPublicPages } = entry || {};
  const { seoTitle = title || '', seoDescription, seoText } = entry || {};

  return (
    <Section>
      <Helmet
        entryId={entryId}
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        coverUrl={coverUrl}
      />
      {R.anyPass([isFetching, isUnfetched])(entryStatus) && <Loader />}
      {isError(entryStatus) && isUiNotFoundError(entryError) && <NotFound />}
      {isFetched(entryStatus) && (
        <div>
          <Body
            title={title}
            seoText={seoText}
            description={description}
            content={content}
          />
          <FanPageBlock className={styles.fanPageBlock} />
          {nPublicPages < 0 && (
            <Section marginTop>
              <CallToActionFolder />
            </Section>
          )}
          <Footer id={entryId} prev={prevEntry} next={nextEntry} />
        </div>
      )}
    </Section>
  );
};

LaborRightsSingle.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const entryId = entryIdSelector(params);
  return Promise.all([dispatch(queryMenu()), dispatch(queryEntry(entryId))]);
};

export default LaborRightsSingle;
