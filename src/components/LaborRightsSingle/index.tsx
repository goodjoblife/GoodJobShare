import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from 'common/Loader';
import { Section } from 'common/base';
import NotFound from 'common/NotFound';
import CallToActionFolder from 'common/CallToAction/CallToActionFolder';
import FanPageBlock from 'common/FanPageBlock';
import { isFetching, isUnfetched, isFetched } from 'utils/fetchBox';
import {
  queryMenuIfUnfetched,
  queryEntryIfUnfetched,
} from 'actions/laborRights';
import { ServerSideRender } from 'types/serverSideRender';
import useEntry, { useNeighborEntry } from './useEntry';
import Body from './Body';
import Footer from './Footer';
import Helmet from './Helmet';
import styles from './LaborRightsSingle.module.css';

type Params = { id: string };

const LaborRightsSingle: React.FC & ServerSideRender<Params> = () => {
  const params = useParams<Params>();
  const entryId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMenuIfUnfetched());
  }, [dispatch]);

  useEffect(() => {
    dispatch(queryEntryIfUnfetched(entryId));
  }, [dispatch, entryId]);

  const entryBox = useEntry(entryId);
  const { prevEntry, nextEntry } = useNeighborEntry(entryId);

  return (
    <Section>
      {(isFetching(entryBox) || isUnfetched(entryBox)) && <Loader />}
      {isFetched(entryBox) && entryBox.data ? (
        <Fragment>
          <Helmet entry={entryBox.data} />
          <div>
            <Body
              title={entryBox.data.title}
              seoText={entryBox.data.seoText}
              description={entryBox.data.description}
              content={entryBox.data.content}
            />
            <FanPageBlock className={styles.fanPageBlock} />
            {entryBox.data.nPublicPages && entryBox.data.nPublicPages < 0 && (
              <Section marginTop>
                <CallToActionFolder />
              </Section>
            )}
            <Footer id={entryId} prev={prevEntry} next={nextEntry} />
          </div>
        </Fragment>
      ) : (
        <NotFound />
      )}
    </Section>
  );
};

LaborRightsSingle.fetchData = ({
  store: { dispatch },
  match: { params },
}): Promise<unknown> => {
  const entryId = params.id;
  return Promise.all([
    dispatch(queryMenuIfUnfetched()),
    dispatch(queryEntryIfUnfetched(entryId)),
  ]);
};

export default LaborRightsSingle;
