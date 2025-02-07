import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from 'common/Loader';
import { Section } from 'common/base';
import { isUiNotFoundError } from 'utils/errors';
import NotFound from 'common/NotFound';
import CallToActionFolder from 'common/CallToAction/CallToActionFolder';
import FanPageBlock from 'common/FanPageBlock';
import { paramsSelector } from 'common/routing/selectors';
import { isFetching, isUnfetched, isError, isFetched } from 'utils/fetchBox';
import {
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

  const entryBox = useEntry(entryId);
  const [prevEntry, nextEntry] = useNeighborEntry(entryId);

  return (
    <Section>
      {(isFetching(entryBox) || isUnfetched(entryBox)) && <Loader />}
      {isError(entryBox) && isUiNotFoundError(entryBox.error) && <NotFound />}
      {isFetched(entryBox) && (
        <Fragment>
          <Helmet
            entryId={entryId}
            seoTitle={entryBox.data.seoTitle}
            seoDescription={entryBox.data.seoDescription}
            coverUrl={entryBox.data.coverUrl}
          />
          <div>
            <Body
              title={entryBox.data.title}
              seoText={entryBox.data.seoText}
              description={entryBox.data.description}
              content={entryBox.data.content}
            />
            <FanPageBlock className={styles.fanPageBlock} />
            {entryBox.data.nPublicPages < 0 && (
              <Section marginTop>
                <CallToActionFolder />
              </Section>
            )}
            <Footer id={entryId} prev={prevEntry} next={nextEntry} />
          </div>
        </Fragment>
      )}
    </Section>
  );
};

LaborRightsSingle.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const entryId = entryIdSelector(params);
  return Promise.all([
    dispatch(queryMenuIfUnfetched()),
    dispatch(queryEntryIfUnfetched(entryId)),
  ]);
};

export default LaborRightsSingle;
